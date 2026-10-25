const fs = require('fs');
const path = require('path');

function sanitizeHtmlToJsx(html) {
  let jsx = html;
  
  // Replace class= with className=
  jsx = jsx.replace(/\bclass="/g, 'className="');
  
  // Replace for= with htmlFor=
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  
  // Replace svg / html kebab-case attributes
  jsx = jsx.replace(/\bstroke-width="/g, 'strokeWidth="');
  jsx = jsx.replace(/\bstroke-linecap="/g, 'strokeLinecap="');
  jsx = jsx.replace(/\bstroke-linejoin="/g, 'strokeLinejoin="');
  jsx = jsx.replace(/\bfill-rule="/g, 'fillRule="');
  jsx = jsx.replace(/\bclip-rule="/g, 'clipRule="');
  jsx = jsx.replace(/\btabindex="/g, 'tabIndex="');
  
  // Replace style strings with style objects
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    const props = styleStr.split(';').map(s => s.trim()).filter(Boolean);
    const obj = {};
    for (const p of props) {
      const idx = p.indexOf(':');
      if (idx > -1) {
        const key = p.slice(0, idx).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const val = p.slice(idx + 1).trim();
        obj[key] = val;
      }
    }
    return `style={${JSON.stringify(obj)}}`;
  });
  
  // Fix self-closing tags
  jsx = jsx.replace(/<(img|input|hr|br)([^>]*[^\/])>/g, '<$1$2 />');
  
  // Replace Google usercontent URLs with local assets
  jsx = jsx.replace(/https:\/\/lh3\.googleusercontent\.com\/aida\/AEtjO1XBBAqJwHssKQec0nYq_Nxf2fffg8lk1AeeSE5sbmArgEAurRCvMGIGQqKu0rI4rew-as2trq6qm1-GimEAX9KVNLqndlxU2-XM9tccaO8oHDxxnRvglLpo8UZxEY1opH4hRbHeW0kpmN-vrJZMFiWva4BPVaeQd6j1CLjDqenvJpGLaQMGXO2IU0pWIJ9a1Y28ULdt7v0837wSUfiMOsrB7T8ToZmEXAiIiC7E0xbE1JNceJkSiw6RBmM/g, '/wedding-rings.svg');
  jsx = jsx.replace(/https:\/\/lh3\.googleusercontent\.com\/aida\/AEtjO1UvwN0W5zOtrmOJ-vo6wnt-OSk6Hj6RFagb-UVcpWbtl676cKyX4nfk6JwuAMAPCfkFDcipTiL8V5OaIiZf6IJNwmnWO088zWYLRPiYNnpTSUvo3N7aGQ4NneDj60nIbICF373C7JcqVGYREDk1bPI2G2v_qYEIat-DyTBW5GMKKzmanUXAs9TDtB1sTL6KrSkXro4B6Hv2dvE18qvXSzDBMIid7ySTJzEyNDdoYu1GXDZVhp4f9AwsHxw/g, '/stitch-hero-couple.png');
  
  return jsx;
}

const headerHtml = fs.readFileSync('stitch_export/sections/01_header.html', 'utf8');
const s1Html = fs.readFileSync('stitch_export/sections/02_section_1.html', 'utf8');
const s2Html = fs.readFileSync('stitch_export/sections/02_section_2.html', 'utf8');
const s3Html = fs.readFileSync('stitch_export/sections/02_section_3.html', 'utf8');
const s4Html = fs.readFileSync('stitch_export/sections/02_section_4.html', 'utf8');
const s5Html = fs.readFileSync('stitch_export/sections/02_section_5.html', 'utf8');
const s6Html = fs.readFileSync('stitch_export/sections/02_section_6.html', 'utf8');
const s7Html = fs.readFileSync('stitch_export/sections/02_section_7.html', 'utf8');
const s8Html = fs.readFileSync('stitch_export/sections/02_section_8.html', 'utf8');
const footerHtml = fs.readFileSync('stitch_export/sections/03_footer.html', 'utf8');

console.log('Sanitizing sections to JSX...');
fs.writeFileSync('stitch_export/jsx_header.txt', sanitizeHtmlToJsx(headerHtml));
fs.writeFileSync('stitch_export/jsx_s1.txt', sanitizeHtmlToJsx(s1Html));
fs.writeFileSync('stitch_export/jsx_s2.txt', sanitizeHtmlToJsx(s2Html));
fs.writeFileSync('stitch_export/jsx_s3.txt', sanitizeHtmlToJsx(s3Html));
fs.writeFileSync('stitch_export/jsx_s4.txt', sanitizeHtmlToJsx(s4Html));
fs.writeFileSync('stitch_export/jsx_s5.txt', sanitizeHtmlToJsx(s5Html));
fs.writeFileSync('stitch_export/jsx_s6.txt', sanitizeHtmlToJsx(s6Html));
fs.writeFileSync('stitch_export/jsx_s7.txt', sanitizeHtmlToJsx(s7Html));
fs.writeFileSync('stitch_export/jsx_s8.txt', sanitizeHtmlToJsx(s8Html));
fs.writeFileSync('stitch_export/jsx_footer.txt', sanitizeHtmlToJsx(footerHtml));
console.log('Done generating JSX chunks!');
