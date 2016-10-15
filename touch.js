#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let R = require('ramda')
let path = require('path')

async function touch() {
    // Use 'await' in here
    // Your implementation here
    // console.log(await fs.readFile(__filename, console.log))
    let argv = await process.argv
    if(argv.length > 2){
      R.forEach( async file => {
        try{
          await fs.open(path.join(__dirname,file), 'wx')
        }
        catch(e){
          return
        }
      }, argv.slice(2))
    }
}

touch()
