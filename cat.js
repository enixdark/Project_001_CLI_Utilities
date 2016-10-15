#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let R = require('ramda')

async function cat() {
    // Use 'await' in here
    // Your implementation here
    // console.log(await fs.readFile(__filename, console.log))
    let argv = await process.argv
    if(argv.length > 2){
      R.forEach( async file => {
        try{
          let data = await fs.readFile(file, 'utf8')
          process.stdout.write(data)
        }
        catch(e){
          process.stdout.write(`cat: ${file}: No such file or directory\n\n`)
        }
      }, argv.slice(2))
    }
}

cat()
