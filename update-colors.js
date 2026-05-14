const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Skills.tsx',
  'src/components/Timeline.tsx',
  'src/components/Footer.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/00D1FF/g, 'FF7A18');
  content = content.replace(/7EE7FF/g, 'FFD6A5');
  content = content.replace(/121212/g, '0F0B08');
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
