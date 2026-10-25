const fs = require('fs');

const html = fs.readFileSync('stitch_export/6d0a1938e566403fae6ead26005ca1a2.html', 'utf8');

const imgs = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)].map(m => m[0]);
console.log('Total img tags in Stitch HTML:', imgs.length);
for (const img of imgs) {
  console.log(img);
}

const bgs = [...html.matchAll(/url\(([^)]+)\)/gi)].map(m => m[1]);
console.log('Total CSS url() backgrounds:', bgs.length);
for (const bg of bgs) {
  console.log(bg);
}
