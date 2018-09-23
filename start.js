const exec = require('child_process').exec
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

webpack(
    webpackConfig
, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(err)
    } else {
        console.log('packing complete')
        exec('npx electron .', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
    }
})