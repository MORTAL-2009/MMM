const fs = require('fs');

const html = fs.readFileSync('stitch_export/6d0a1938e566403fae6ead26005ca1a2.html', 'utf8');

const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)[1];
console.log('--- HEAD CONTENT ---');
console.log(head);

const style = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] || '';
console.log('--- STYLE CONTENT ---');
console.log(style);
