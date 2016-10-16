#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let R = require('ramda')
let path = require('path')
let argv = require('yargs').argv

async function touch() {

    if(argv._.length > 0){
      R.forEach( async file => {
        try{
          await fs.open(path.join(__dirname,file), 'wx')
        }
        catch(e){
          return
        }
      }, argv._)
    }
}

touch()
