import which from 'which';

function runCmd(cmd, args, fn) {
  args = args || [];
  var runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: "inherit"
  });
  runner.on('close', function (code) {
    if (fn) {
      fn(code);
    }
  });
}

function findNpm() {
  var npms = process.platform === 'win32' ? ['cnpm.cmd', 'tnpm.cmd', 'npm.cmd'] : ['cnpm', 'tnpm', 'npm'];
  for (var i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i]);
      console.log('use npm: ' + npms[i]);
      return npms[i];
    } catch (e) {
    }
  }
  throw new Error('please install npm');
}

export default function (done) {
  const npm = findNpm();
  runCmd(which.sync(npm), ['install'], function () {
    // runCmd(which.sync(npm), ['install', 'dva', '--save'], function () {
      console.log(npm + ' install end');
      done();
    // });
  });
};
