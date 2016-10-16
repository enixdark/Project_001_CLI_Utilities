#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise
const RL = require('ramda')
const path = require('path')
let {R, dir} = require('yargs')
              .default('dir', __dirname)
              .describe('R', 'Specify a process to recursion with path')
              .array("R")
              .alias('R', 'recursion')
              .nargs('R', 0)
              .help()
              .argv


async function ls(rootPath) {
  try{
    let check = await fs.stat(rootPath)
    if(check.isFile() && R){
      return [rootPath.replace(`${dir}/`,'')]
    }
    else if(check.isFile() || (check.isDirectory() && rootPath != dir) && !R){
      return [rootPath.replace(`${dir}/`,'')]
    }
  }
  catch(e){
    return []
  }
  let lsPromises = []
  let filenames = await fs.readdir(rootPath)
  console.log(filenames)
  RL.forEach( file => {
      let promise = ls(path.join(rootPath,file))
      // console.log(file)
      lsPromises.push(promise)

  }, filenames)
  return await Promise.all(lsPromises)
}

async function main(_dir = undefined) {
    // Call ls() and pass dir, remember to await
    // console.log('Executing ls function...')
    // console.log(path.join(__dirname, dir))
    let dir_path = _dir ? _dir : dir
    dir = dir_path
    let filePaths = await ls(dir_path)
    // console.log(await RL.flatten(filePaths))
    return RL.flatten(filePaths)
}

main()

module.exports = main