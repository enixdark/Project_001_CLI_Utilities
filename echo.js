#!/usr/bin/env node

require('./helper')
let fs = require('fs').promise

async function echo() {
    // Use 'await' in here
    // Your implementation here
    console.log(await fs.readFile(__filename, console.log))

    let promise = fs.readdir(__dirname)
    let fileNames = await promise
}

echo()
