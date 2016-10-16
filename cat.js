#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let R = require('ramda')
let path = require('path')
let argv = require('yargs').argv

async function cat() {
    // console.log(await fs.readFile(__filename, console.log))
    if(argv._.length > 0){
      R.forEach( async file => {
        try{
          let data = await fs.readFile(path.join(__dirname,file), 'utf8')
          process.stdout.write(data)
        }
        catch(e){
          process.stdout.write(`cat: ${file}: No such file or directory\n\n`)
        }
      }, argv._)
    }
}

cat()

