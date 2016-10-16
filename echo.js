#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let argv = require('yargs').argv


async function echo() {
    
    // console.log(await fs.readFile(__filename, console.log))
    // let _argv = await process.argv
    if(argv._.length > 0){
      process.stdout.write(argv._.join(' ') + "\n")
    }
}

echo()
