const fs = require('fs');

module.exports = function(deployer) {
  // File destination.txt will be created or overwritten by default.
  console.log(
    'Copying file VolcanoToken.json to client/src/contracts/VolcanoToken.json'
  );
  fs.copyFile(
    process.cwd() + '/build/contracts/VolcanoToken.json',
    process.cwd() + '/client/src/contracts/VolcanoToken.json',
//	process.cwd() + '/nextjs/pages/contracts/VolcanoToken.json',
    err => {
      if (err) throw err;
    }
  );
};
