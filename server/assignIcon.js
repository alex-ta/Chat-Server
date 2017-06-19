const testFolder = './server/avatar';
const fs = require('fs');
const icons = [];

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
	  icons.push("/" + file);
  });
});

module.exports = { icons:icons };