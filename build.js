#!/usr/bin/env node
const fs = require("fs");
const marked = require("marked");

const src = './README.md';

fs.readFile(src, {encoding: "utf8"}, (err, file) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
    return;
  }

  const html = marked(file);
  const dst = './index.html';
  fs.writeFile(dst, html, (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
      return;
    }

    console.log(`output: ${dst}`);
  });
});