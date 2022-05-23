const fs = require('fs');
const path = require('path');

const fName = 'text.txt';
const fPath = path.resolve(__dirname, fName);

const inputStream = fs.createReadStream(fPath);
const { stdout } = process;
inputStream.pipe(stdout).on('error', (fault) => console.log(fault));
