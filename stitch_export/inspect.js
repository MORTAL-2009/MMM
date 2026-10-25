const fs = require('fs');

const f1 = fs.readFileSync('stitch_export/6d0a1938e566403fae6ead26005ca1a2.html', 'utf8');
const f2 = fs.readFileSync('stitch_export/46f4d1b538a14ff99fcfb5a06c14760d.html', 'utf8');

function summarize(html, title) {
  console.log('=== ' + title + ' ===');
  const headings = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  console.log('Headings (' + headings.length + '):', headings.slice(0, 20));
  const sections = [...html.matchAll(/<section[^>]*id="([^"]+)"/gi)].map(m => m[1]);
  console.log('Section IDs:', sections);
  const classes = [...html.matchAll(/class="([^"]+)"/gi)].map(m => m[1]);
  console.log('Total class occurrences:', classes.length);
}

summarize(f1, 'Screen 6d0a1938');
summarize(f2, 'Screen 46f4d1b5');
