const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

let js = '';

const result = fs
    .readdirSync('./src/components/', {
        withFileTypes: true
    })
    .filter(dir => /^[A-Z]+[a-zA-Z]*$/.test(typeof dir === 'string' ? dir : dir.name));

result.forEach(dir => {
    if (typeof dir !== 'string') dir = dir.name;
    js += `
import * as ${dir}All from './components/${dir}/';
const ${dir} = Object.assign(${dir}All.default, ${dir}All);
export { ${dir} };
`;
});

fs.writeFileSync(path.join(__dirname, 'lib/__index.js'), js);

child_process.execSync('npx babel lib/__index.js --out-file lib/index.js');
