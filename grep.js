#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs')
const argv = require('yargs')
        .demand(2)
        .argv
const readline = require('readline');
// const ls = require('./ls')
const path = require('path')
const R = require('ramda')
async function grep() {
    
    // console.log(await fs.readFile(__filename, console.log))
    // let _argv = await process.argv
    if(argv._.length > 0){
        R.forEach( async file => {
          // process.stdout.write(file+":\n")
          readline.createInterface({
          input: await fs.createReadStream(argv._[1], {encoding: 'utf8'}),
          terminal: false
          }).on('line', line => {
            if(line.match(argv._[0])){
              process.stdout.write(line+"\n")
            }
          });
        }, argv._.slice(1))
    }
}

grep()
