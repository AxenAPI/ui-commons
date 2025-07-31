export const transformToCamelCaseNotation = (str: string): string => {
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

export function createFileHeader(): string {
  return `/**
  * Этот файл сгенерирован автоматически.
  */
\n`;
}

export function logger(message: string): void {
  console.log(message);
}
