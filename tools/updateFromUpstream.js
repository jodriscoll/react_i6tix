var exec = require('child_process').exec;

exec('git remote add upstream git@git.mindgrub.net:dalb/Graf.git || true', (err) => {
  if (err) throw err;

  exec('git fetch upstream && git pull upstream master', (err, output) => {
    if (err) throw err;

    /* eslint-disable no-console */
    console.log(output);
  })
});