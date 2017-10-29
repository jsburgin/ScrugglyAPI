const fs = require('fs');
const { exec } = require('child_process');

const migrateCommands = {
  up: '0',
  down: '1',
};

if (process.argv[2] === undefined || !migrateCommands[process.argv[2]]) {
  throw new Error(`Proper migration command not found. Available commands: ${Object.keys(migrateCommands)}`);
}

const files = fs.readdirSync('./src/db/schema');
const fileToExecute = files.slice(-2)[migrateCommands[process.argv[2]]];

exec(`psql -f src/db/schema/${fileToExecute}`, (error, stdout, stderr) => {
  if (error) {
    console.error('\x1b[31m', `exec error: ${error}`);
    return;
  }
  console.log('\x1b[32m', `${stdout}`);
  console.log('\x1b[33m', `${stderr}`);
});

