const { readdir, stat } = require('fs/promises');
const path = require('path');
const sFolder = 'secret-folder'
const secretFolder = path.join(__dirname, sFolder);

(async function () {
  const curFolder = await readdir(secretFolder, { withFileTypes: true })
  for (let el of curFolder) {
    if (el.isFile()) {
      const Stats = await stat(path.join(secretFolder, el.name))
      console.log(el.name.split('.').join(' - ') + ` - ${Stats.size}bytes`)
    }
  }
})()
