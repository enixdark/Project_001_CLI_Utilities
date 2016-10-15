#!/usr/bin/env node

require('./helper')
let fs = require('fs').promise

async function echo() {
    // Use 'await' in here
    // Your implementation here
    // console.log(await fs.readFile(__filename, console.log))
    let argv = await process.argv
    if(argv.length > 2){
      process.stdout.write(argv.slice(2).join(' ') + "\n")
    }
}

echo()
