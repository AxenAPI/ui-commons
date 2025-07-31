'use strict';

const fs = require('fs');
const path = require('path');

function transform (obj, path) {
  return obj
    .map(config => config.split('.').shift())
    .map(config => `'${config}': require('./${path}/${config}')`)
    .join(',\n');
}

const indexFilePath = path.resolve(__dirname, '../lib/index.js');
const configs = fs.readdirSync(path.resolve(__dirname, '../lib/configs'));
const content = `'use strict';

/**
 * Этот файл сгенерирован автоматически.
 * Пожалуйста, не изменяйте его, вместо этого запустите \`yarn build\`.
 */

module.exports = {
  configs: {
    ${transform(configs, 'configs')}
  }
};
`;

fs.writeFileSync(indexFilePath, content);
