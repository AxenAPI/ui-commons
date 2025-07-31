// Файл для экспорта иконок
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { createFileHeader, logger, transformToCamelCaseNotation } from './helpers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Корневая директория
const rootDir = path.resolve(__dirname, '..');
// Папки, которые нужно обработать
const foldersToProcess: string[] = ['tabler'];

// Размеры иконок
enum EIconSize {
  Small = 12,
  Medium = 16,
  Large = 24,
}

const iconSizes: EIconSize[] = Object.values(EIconSize) as EIconSize[];

// Объект для хранения всех названий иконок по папкам
const allIconNamesByFolder: { [folder: string]: string[] } = {};

function getAvailableIconSizes(directory: string, iconFolder: string): EIconSize[] {
  return iconSizes.filter(size => fs.existsSync(path.join(directory, iconFolder, `${size}.tsx`))) as EIconSize[];
}

function updateIndexFiles(directory: string): void {
  const fileHeader = createFileHeader();
  // Получаем список всех поддиректорий в директории
  const subdirectories = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  subdirectories.forEach(folderName => {
    const indexPath = path.join(directory, folderName, 'index.ts');
    const iconBaseName = `Icon${transformToCamelCaseNotation(folderName)}`;
    // Получаем доступные размеры иконок в текущей подпапке
    const availableSizes = getAvailableIconSizes(directory, folderName);
    // Создаём содержимое файла index.ts, добавляя только доступные размеры иконок
    const newContent =
      fileHeader +
      availableSizes.map(size => `export { default as ${iconBaseName}${size} } from './${size}';`).join('\n') +
      '\n';

    // Перезаписываем файл index.ts с новым содержимым
    fs.writeFileSync(indexPath, newContent, 'utf8');
    logger(`Обновлен index.ts в папке ${folderName}`);
  });
}

const processFolders = (): void => {
  const fileHeader = createFileHeader();

  foldersToProcess.forEach(folder => {
    const sourceDirectory = path.join(rootDir, `icon/${folder}`);
    updateIndexFiles(sourceDirectory);

    allIconNamesByFolder[folder] = [];

    if (fs.existsSync(sourceDirectory)) {
      const iconFolders = fs
        .readdirSync(sourceDirectory)
        .filter(item => fs.statSync(path.join(sourceDirectory, item)).isDirectory());

      let folderExports = '';
      iconFolders.forEach(iconFolder => {
        const availableSizes = getAvailableIconSizes(sourceDirectory, iconFolder);

        const exportsForFolder = availableSizes
          .map(size => {
            const iconName = `Icon${transformToCamelCaseNotation(iconFolder)}${size}`;
            allIconNamesByFolder[folder].push(iconName);
            return iconName;
          })
          .join(', ');

        folderExports += `export { ${exportsForFolder} } from './${iconFolder}';\n`;
      });

      // Перезаписываем файла index.ts с новым содержимым
      fs.writeFileSync(path.join(sourceDirectory, 'index.ts'), fileHeader + folderExports, 'utf8');
      logger(`Сгенерированы экспорты в index.ts для папки ${folder}`);
    } else {
      logger(`Директория ${sourceDirectory} не найдена для ${folder}`);
    }
  });

  const importsExportsContent = foldersToProcess
    .map(
      folder =>
        `import { ${allIconNamesByFolder[folder].join(', ')} } from './${folder}';\nexport { ${allIconNamesByFolder[
          folder
        ].join(', ')} };`
    )
    .join('\n');

  const iconsObjectParts = iconSizes
    .map(size => {
      const sizeIconsEntries = foldersToProcess
        .flatMap(folder => allIconNamesByFolder[folder].filter(name => name.endsWith(`${size}`)))
        .map(iconName => `  ${iconName},`)
        .join('\n');

      return sizeIconsEntries ? `  ${size}: {\n${sizeIconsEntries}\n  }` : '';
    })
    .filter(part => part)
    .join(',\n');

  const iconsFilePath = path.join(rootDir, 'icon/index.ts');
  const exportContent =
    fileHeader +
    importsExportsContent +
    `\n\nimport { TIconsObject } from '../types';\n\nconst icons: TIconsObject = {\n${iconsObjectParts}\n} as const;\n\nexport default icons;`;

  // Сбор всех имен иконок в один массив
  const allIconNames = Object.values(allIconNamesByFolder).flat();

  // Генерация строки с объявлением типа
  const typeDefinition = `export type TIconName = '${allIconNames.join("' | '")}';\n`;

  // Путь к файлу unionType.ts
  const unionTypeFilePath = path.join(rootDir, 'icon/unionType.ts');

  // Запись в файл
  fs.writeFileSync(unionTypeFilePath, typeDefinition, 'utf8');
  logger(`Файл unionType.ts был успешно обновлен.`);

  fs.writeFileSync(iconsFilePath, exportContent);

  logger(`Объект icons сохранен в ${iconsFilePath}`);
};

processFolders();
