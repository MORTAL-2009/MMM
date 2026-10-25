const fs = require('fs');

const html = fs.readFileSync('stitch_export/6d0a1938e566403fae6ead26005ca1a2.html', 'utf8');

// Print out the HTML structure broken down by sections
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];

// Let's write the clean extracted sections to files in stitch_export/sections/ so we can inspect them
const dir = 'stitch_export/sections';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// find header
const headerMatch = body.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) fs.writeFileSync(`${dir}/01_header.html`, headerMatch[0]);

// find main sections
const mainMatch = body.match(/<main[\s\S]*?<\/main>/i);
if (mainMatch) {
  const mainContent = mainMatch[0];
  const sections = [...mainContent.matchAll(/<section[\s\S]*?<\/section>/gi)].map(m => m[0]);
  sections.forEach((sec, idx) => {
    fs.writeFileSync(`${dir}/02_section_${idx + 1}.html`, sec);
    console.log(`Saved section ${idx + 1}: length ${sec.length}`);
  });
}

// find footer
const footerMatch = body.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) fs.writeFileSync(`${dir}/03_footer.html`, footerMatch[0]);

console.log('Finished splitting sections.');
