const { execSync } = require('child_process');
const fs = require('fs');

function execCommand(command) {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
}

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const versionParts = packageJson.dependencies['vue-data-ui'].split('.');

versionParts[2] = Number(versionParts[2]) + 1;

if (versionParts[2] == 100) {
    versionParts[1] = Number(versionParts[1]) + 1;
    versionParts[2] = "0"
}

if (versionParts[1] == 10) {
    versionParts[0] = Number(versionParts[0]) + 1;
    versionParts[1] = "0"
}

packageJson.dependencies['vue-data-ui'] = versionParts.join('.');
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log(`vue-data-ui v${packageJson.dependencies['vue-data-ui']} upgrading...`)

execCommand('npm i');
execCommand('npm run dev')