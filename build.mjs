import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { wedding } from './wedding-config.js';
await mkdir('dist',{recursive:true});
const files=['index.html','styles.css','app.js','wedding-config.js','floral-top.webp','floral-bottom.webp',...Object.values(wedding.photos).map(p=>p.src)];
for(const file of files)await copyFile(file,`dist/${file}`);
console.log(`Built ${files.length} static files to dist/`);

// Write absolute metadata into the HTML for crawlers that do not run JavaScript.
const siteUrl = process.env.SITE_URL || wedding.canonicalUrl;
if (siteUrl) {
  const url = new URL(siteUrl);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('SITE_URL must be an HTTP(S) URL');
  url.hash = '';
  url.search = '';
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  let html = await readFile('dist/index.html', 'utf8');
  const image = escape(new URL(wedding.photos.hero.src, url).href);
  html = html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(">)/g, (_, before, after) => before + image + after);
  html = html.replace('</head>', `<link rel="canonical" href="${escape(url.href)}"><meta property="og:url" content="${escape(url.href)}"></head>`);
  await writeFile('dist/index.html', html);
} else {
  console.warn('Set wedding.canonicalUrl or build-time SITE_URL to enable absolute social preview image URLs.');
}
