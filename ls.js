require('./helper')
const fs = require('fs').promise
const R = require('ramda')
const path = require('path')
const {dir} = require('yargs')
              .default('dir', __dirname)
              .argv


async function ls() {
  // Use 'await' inside 'async function's
  console.log('Executing ls function...')

  // Your implementation here
  let fileNames = await fs.readdir(dir)
  // debugger
  R.forEach( file => {
    let filePath = path.join(__dirname, file)
    process.stdout.write(filePath + "\n")

  }, fileNames)

}

ls()