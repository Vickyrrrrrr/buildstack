/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Brighten up the page
// Change text-slate-700 italic => text-slate-400 italic or text-slate-300
content = content.replace(/text-slate-700 italic/g, 'text-slate-300 italic');
content = content.replace(/opacity-70/g, 'text-slate-200'); // the description text-academic-body text-slate-200
content = content.replace(/text-slate-700 group-hover:text-white/g, 'text-slate-400 group-hover:text-white');
content = content.replace(/text-slate-500 font-light/g, 'text-slate-300 font-light'); 
content = content.replace(/opacity-\[0\.03\]/g, 'opacity-[0.06]'); // slightly brighter background text
content = content.replace(/opacity-40/g, 'opacity-60'); // marquee text
content = content.replace(/text-slate-500 uppercase/g, 'text-slate-300 uppercase');
content = content.replace(/bg-slate-500/g, 'bg-emerald-400'); // pulse indicator
content = content.replace(/text-slate-500 tracking-\[0\.3em\]/g, 'text-slate-400 tracking-[0.3em]');

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Main page brightened successfully');
