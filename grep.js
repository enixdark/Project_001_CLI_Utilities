#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs')
let argv = require('yargs')
        .demand(2)
        .argv
var readline = require('readline');

async function grep() {
    if(argv._.length > 0){
      readline.createInterface({
        input: await fs.createReadStream(argv._[1], {encoding: 'utf8'}),
        terminal: false
        }).on('line', line => {
          debugger
          if(line.match(argv._[0])){
            process.stdout.write(line+"\n")
          }
        });    
    }
}

grep()
