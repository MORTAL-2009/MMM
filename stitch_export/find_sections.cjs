const fs = require('fs');

const html = fs.readFileSync('stitch_export/6d0a1938e566403fae6ead26005ca1a2.html', 'utf8');

const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];

// Find all top-level direct tags inside body (header, main, footer, etc.)
// or main children
console.log('Top level elements:');
let pos = 0;
const re = /<(header|nav|section|footer|div|main)[^>]*>/gi;
let m;
while ((m = re.exec(body)) !== null) {
  // only if not deeply nested (we can check depth or tag name)
  if (['header', 'section', 'footer', 'main'].includes(m[1].toLowerCase())) {
    console.log(`[${m[1]}] Index: ${m.index} Snippet: ${m[0].slice(0, 120)}`);
  }
}
