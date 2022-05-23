const fs = require('fs');
const path = require('path');
const assets = 'assets'
const style = 'styles'
const source = path.join(__dirname, assets);
const dest = path.join(__dirname, 'project-dist');

async function copy(source, dest) {
  await fs.mkdir(dest, { recursive: true }, () => { });
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    files.forEach((f) => {
      let sourcePath = path.join(source, f.name);
      let destPath = path.join(dest, f.name);
      if (f.isDirectory()) {
        copy(sourcePath, destPath);
      } else {
        fs.copyFile(sourcePath, destPath, () => { });
      }
    });
  });
}


async function copyDir(source, dest) {
  await fs.mkdir(dest, { recursive: true }, () => { });
  const newPath = path.join(dest, assets);
  await copy(source, newPath);
}

copyDir(source, dest);

async function createCss() {
  const files = await fs.promises.readdir(path.join(__dirname, style), { withFileTypes: true });
  const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  await Promise.all(files.map(file => new Promise(async (change) => {
    if (file.isFile() && path.extname(path.join(__dirname, style, file.name)) === '.css') {
      const part = await fs.promises.readFile(path.join(__dirname, style, file.name), { encoding: 'utf-8' });
      writeStream.write(part);
      writeStream.write('\n');
      change();
    }
  })));
}



createCss();

async function createHtml() {
  await fs.promises.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'));
  const files = await fs.promises.readdir(path.join(__dirname, 'components'));
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });
  await Promise.all(files.map(file => new Promise(async (change) => {
    const part = await fs.promises.readFile(path.join(__dirname, 'components', file), { encoding: 'utf-8' });
    template = template.replace(`{{${file.split('.')[0]}}}`, part);
    change();
  })));
  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
}


createHtml();
