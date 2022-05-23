const fs = require('fs');
const path = require('path');
const fName = 'files-copy'
const fCopy = path.join(__dirname, fName);

fs.mkdir(fCopy, { recursive: true }, (err) => {
  if (err) throw err;
  fs.readdir(fCopy, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.unlink(path.join(fCopy, file), (err) => {
        if (err) throw err;
      });
    });
  });
  getFNames();
});


function getFNames() {
  const f = 'files'
  const file = path.join(__dirname, f);
  
  fs.readdir(file, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, f, file),
        path.join(__dirname, fName, file),
        (err) => {
          if (err) throw err;
        }
      );
    });
  });
}
