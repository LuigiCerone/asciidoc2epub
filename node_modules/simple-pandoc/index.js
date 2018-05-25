'use strict';

const spawn = require('child_process').spawn;

const command = 'pandoc';

const pandoc = (from, to) => {
  const option = ['-f', from, '-t', to];

  const converter = src => new Promise((resolve, reject) => {
    const proc = spawn(command, option);
    proc.on('error', reject);
    let data = '';
    proc.stdout.on('data', chunk => {
      data += chunk.toString();
    });
    proc.stdout.on('end', () => resolve(data));
    proc.stdout.on('error', reject);
    proc.stdin.write(src);
    proc.stdin.end();
  });

  converter.stream = srcStream => {
    const proc = spawn(command, option);
    srcStream.pipe(proc.stdin);
    return proc.stdout;
  };

  return converter;
};

module.exports = pandoc;
