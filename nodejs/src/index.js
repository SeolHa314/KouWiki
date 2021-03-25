const Gitdown = require('gitdown');
const yargs = require('yargs');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const argv = yargs
    .demand(1, 1, 'non-option argument needed')
    .option('output', {
        alias: 'o',
        description: 'path to output processed md',
        type: 'string',
        demandOption: true,
    })
    .help()
    .alias('help', 'h')
    .argv;


if(fs.statSync(path.resolve(...argv._)).isDirectory() && fs.statSync(path.resolve(argv.output)).isDirectory()) {
    glob(path.resolve(...argv._) + '/**.md', (err, mdFiles) => {
        mdFiles.forEach(mdFile => {
            console.log(mdFile);
            const gitdown = Gitdown.readFile(mdFile);
            gitdown.setConfig({
                headingNesting: {
                    enabled: false
                }
            });
            gitdown.writeFile(path.resolve(argv.output) + '/' + path.basename(mdFile));
        });
    });
}