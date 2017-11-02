const fs = require('fs');
const { exec } = require('child_process');

const migrateCommands = {
  do: 0,
  undo: 1,
};

if (process.argv[2] === undefined || migrateCommands[process.argv[2]] === undefined) {
  throw new Error(`Migration command '${process.argv[2]}' not found. Available commands: ${Object.keys(migrateCommands)}`);
}

let files = fs.readdirSync('./src/db/schema');

// Undo in reverse.
if (migrateCommands[process.argv[2]] === 1) {
  files = files.reverse();
}

files.reverse().map((file, i) => {
  if (i % 2 === migrateCommands[process.argv[2]]) {
    exec(`psql -f src/db/schema/${file}`, (error, stdout, stderr) => {
      if (error) {
        console.error('\x1b[31m', `exec error: ${error}`);
        return;
      }
      console.log('\x1b[32m', `${stdout}`);
      console.log('\x1b[33m', `${stderr}`);
    });
  }
  return true;
});

