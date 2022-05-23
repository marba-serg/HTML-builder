const { createWriteStream } = require('fs');
const { resolve } = require('path');
const { createInterface: createRli } = require('readline');

const endReading = (r) => () => r.close();
const lHandler = ({ fnStop, fnWrite }) => (line) => line === 'exit' ? fnStop() : fnWrite(line);
const fName = 'text.txt'
const outStream = createWriteStream(resolve(__dirname, fName));

const r = createRli({
  input: process.stdin,
  output: process.stdout,
  historySize: 0,
});

r.write('Hello! Friend!\n');

r.on('close', () => console.log('Finish process'));
r.on('SIGINT', endReading(r));
r.on('line', lHandler({
  fnStop: endReading(r),
  fnWrite: outStream.write.bind(outStream)
}));
