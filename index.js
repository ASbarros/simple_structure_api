const { program } = require('commander')
const shell = require('shelljs');
program.version('1.0.0')

program
    .command('simple-structure create')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
        console.log('creating...');
        shell.cp('-R', 'lib/structure', 'app');
        console.log('instalando dependencias...')
        shell.exec('npm install express')
        shell.exec('npm install consign')
        shell.exec('npm install cors')
        shell.exec('npm install knex')
        shell.exec('npm install body-parse')
        shell.exec('npm install passport')
        shell.exec('npm install passport-jwt')
        shell.exec('npm install jwt-simple')
        shell.exec('npm install bcrypt-nodejs')
    });

program.parse(process.argv);
