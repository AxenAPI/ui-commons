import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const targetDir = path.join(rootDir, '/icon/tabler');
const svgSourceDir = path.join(rootDir, '/icon/optimized');

// Названия svg-файлов (в kebab-case)
const originalFolderNames = [''];

const iconSizes = [12, 16, 24];

// Преобразует kebab-case в camelCase
function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

// Преобразует для названия компонента, добавляет "_" после цифры в конце
function getComponentName(baseName: string, size: number): string {
  const camel = kebabToCamelCase(baseName);
  const modified = camel.replace(/(\d+)$/, '$1_'); // добавляем "_" если цифра в конце
  return `Icon${capitalize(modified)}${size}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getSvgContent(size: number, fileName: string) {
  const svgFilePath = path.join(svgSourceDir, size.toString(), `${fileName}.svg`);
  if (fs.existsSync(svgFilePath)) {
    return fs.readFileSync(svgFilePath, 'utf-8');
  }
  console.warn(`SVG файл не найден: ${svgFilePath}`);
  return `<svg></svg>`;
}

function createComponentFile(folderPath: string, originalName: string, size: number) {
  const componentName = getComponentName(originalName, size);
  const filePath = path.join(folderPath, `${size}.tsx`);
  const svgContent = getSvgContent(size, originalName);
  const fileContent = `const ${componentName} = () => {
  return ${svgContent};
};

export default ${componentName};
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Создан файл: ${filePath}`);
}

function generateComponents() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  originalFolderNames.forEach(originalName => {
    const camelName = kebabToCamelCase(originalName);
    const folderPath = path.join(targetDir, camelName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    iconSizes.forEach(size => {
      createComponentFile(folderPath, originalName, size);
    });
  });
}

generateComponents();
