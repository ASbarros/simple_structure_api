const { program } = require('commander')
const shell = require('shelljs');


program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

program
    .command('simple-structure create')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
        console.log('clone command called');
        shell.mkdir('./../app');
        //shell.exec('teste > newfile.txt ./ola.js/ola.js')
    });
program
    .name("simple-structure")
    .usage("[global options] command")


