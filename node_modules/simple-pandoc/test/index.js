'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava').test;
const pandoc = require('../index');

const mdPath = path.join(__dirname, 'asset.md');
const htmlPath = path.join(__dirname, 'asset.html');

test('create pandoc instance', t => {
  const mdToHtml = pandoc('markdown', 'html');
  t.truthy(mdToHtml);
});

test('convert', async t => {
  const mdToHtml = pandoc('markdown', 'html');
  const md = fs.readFileSync(mdPath);
  const html = fs.readFileSync(htmlPath);
  t.is((await mdToHtml(md)).toString(), html.toString());
});

test('convert via stream', async t => {
  const mdToHtml = pandoc('markdown', 'html');
  const mdStream = fs.createReadStream(mdPath);
  const outputStream = mdToHtml.stream(mdStream);
  const html = fs.readFileSync(htmlPath);

  const outputHtml = await new Promise((resolve, reject) => {
    let data = '';
    outputStream.on('data', chunk => {
      data += chunk.toString();
    });
    outputStream.on('end', () => resolve(data));
    outputStream.on('error', reject);
  });

  t.is(outputHtml.toString(), html.toString());
});
