#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let R = require('ramda')
let path = require('path')
let argv = require('yargs').argv

async function mkdir() {
    if(argv._.length > 0){
      R.forEach( async file => {
          let path_folders = file.split('/')
          R.reduce(async (root, folder) => {
            let new_path = path.join(await root,folder)
            try{
              await fs.mkdir(new_path)
            }
            catch(e){
              process.stdout.write(`mkdir: cannot create directory ${new_path}: File exists \n`)
              return await new_path
            }
            return new_path
          },__dirname,path_folders)
        }
      , argv._)
    }
}

mkdir()

