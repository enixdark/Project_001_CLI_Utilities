#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise
const R = require('ramda')
const path = require('path')
const {dir} = require('yargs')
              .default('dir', __dirname)
              .argv

async function ls(rootPath) {
  try{
    let check = await fs.stat(rootPath)
    if(check.isFile() || (check.isDirectory() && rootPath != dir)){
      // process.stdout.write(rootPath + "\n")
      return [rootPath]
    }
  }
  catch(e){
    return []
  }
  let lsPromises = []
  R.forEach( file => {
      let promise = ls(file)
      // console.log(promise)
      lsPromises.push(promise)

  }, await fs.readdir(rootPath))
  return await Promise.all(lsPromises)
}

async function main() {
    // Call ls() and pass dir, remember to await
    console.log('Executing ls function...')
    let filePaths = await ls(dir)
    console.log(R.flatten(filePaths).join('\n'))
}

main()