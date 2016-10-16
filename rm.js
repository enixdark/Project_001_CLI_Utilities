#!/usr/bin/env babel-node

require('./helper')
let fs = require('fs').promise
let R = require('ramda')
let path = require('path')
let argv = require('yargs').argv

async function rm(rootPath) {
  let check = await fs.stat(rootPath)
  if(check.isFile()){
    await fs.unlink(rootPath)
    return []
  }
  let promises = []
  if(check.isDirectory()){
    let empty = await fs.readdir(rootPath)
    if(empty.length > 0){
      // console.log(rootPath)
      promises.push(rootPath)
      let filenames = await fs.readdir(rootPath)
      R.forEach( file => {
        // console.log(path.join(rootPath,file))
        promises.push(rm(path.join(rootPath,file)))
      }, filenames)
    }
    else{
      return [rootPath]
    }
  }
  return await Promise.all(promises)
}

async function main(){
  if(argv._.length > 0){
    R.forEach( async file => {
      try{
        // R.compose(
        //   R.flatten, 
        //   R.forEach( x => console.log(x))
        // )(await rm(file))
        R.forEach( 
          d => fs.rmdir(d), 
          R.flatten(await rm(file)).reverse()
        )
      }catch(e){
        process.stdout.write(`rm: cannot remove ${file}: No such file or directory \n`)
      }
    }, argv._)
  }
}

main()

