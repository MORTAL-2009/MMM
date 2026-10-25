const fs = require('fs');

const html = fs.readFileSync('stitch_export/6d0a1938e566403fae6ead26005ca1a2.html', 'utf8');

// print head fonts, css links
const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
if (headMatch) {
  console.log('--- HEAD ---');
  const links = [...headMatch[1].matchAll(/<link[^>]*>/gi)].map(m => m[0]);
  console.log('Links:', links);
  const styles = [...headMatch[1].matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
  console.log('Inline Styles length:', styles.join('\n').length);
  fs.writeFileSync('stitch_export/styles.css', styles.join('\n\n'));
}

// print body sections
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  const body = bodyMatch[1];
  console.log('--- SECTIONS & HEADINGS ---');
  const items = [...body.matchAll(/<(header|section|footer|nav|h1|h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi)];
  for (const item of items) {
    const tag = item[1];
    const text = item[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
    console.log(`[${tag.toUpperCase()}] ${text}`);
  }
}
