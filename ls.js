require('./helper')
const fs = require('fs').promise
const R = require('ramda')
const path = require('path')
const {dir} = require('yargs')
              .default('dir', __dirname)
              .argv

async function ls(rootPath) {
  // console.log(rootPath)
  await fs.stat(rootPath, async (err, check) => {
    if(err) return
    if(check.isFile()){
      process.stdout.write(rootPath + "\n")
      return rootPath
    }
    let fileNames = await fs.readdir(rootPath)
    R.forEach( file => {
      let filePath = path.join(__dirname, file)
      ls(filePath)
    }, fileNames)
  })
}

async function main() {
    // Call ls() and pass dir, remember to await
    console.log('Executing ls function...')
    await ls(dir)
}

main()