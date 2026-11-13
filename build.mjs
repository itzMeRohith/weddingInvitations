import { mkdir, copyFile } from 'node:fs/promises';
import { wedding } from './wedding-config.js';
await mkdir('dist',{recursive:true});
const files=['index.html','styles.css','app.js','wedding-config.js','floral-top.webp','floral-bottom.webp',...Object.values(wedding.photos).map(p=>p.src)];
for(const file of files)await copyFile(file,`dist/${file}`);
console.log(`Built ${files.length} static files to dist/`);
