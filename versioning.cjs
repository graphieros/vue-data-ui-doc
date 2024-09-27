const fs = require('fs');
const { execSync } = require('child_process');

function execCommand(command) {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
}

let commits = []

fetch('https://api.github.com/repos/graphieros/vue-data-ui/commits').then(response => {
    if(!response.ok) {
        throw new Error('This is humiliating.')
    }
    return response.json()
}).then(data => {
    commits = data;
    console.log(data)
})