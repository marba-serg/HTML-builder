const fs = require('fs');

const path = require('path');
const projectDist = 'project-dist'
const style = 'styles'
const projectFile = path.join(__dirname, projectDist, 'bundle.css');
const currentFolder = path.join(__dirname, style);

fs.readdir(currentFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      if (projectFile !== undefined) {
        fs.truncate(projectFile, 0, function () { });
      }
      fs.readFile(
        path.join(__dirname, style, file),
        'utf-8',
        (err, data) => {
          if (err) throw err;

          fs.appendFile(projectFile, data + '\n', (err) => {
            if (err) throw err;
          });
        }
      );
    } else {
      return;
    }
  });
});
