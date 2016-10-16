#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let argv = require('yargs')
        .demand(2)
        .argv


async function symlink() {
    
    // console.log(await fs.readFile(__filename, console.log))
    // let _argv = await process.argv
    if(argv._.length > 0){
      await fs.symlink(argv._[0], argv._[1])
    }
}

symlink()
