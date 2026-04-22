const fs = require('fs');
const key = fs.readFileSync('.env', 'utf8').match(/VITE_GEMINI_API_KEY=?\/?([^\s]*)/)[1].replace(/\"/g, '');
fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key)
  .then(r => r.json())
  .then(d => {
    if (d.error) {
      console.log('Error:', d.error);
    } else {
      console.log('Flash models:', d.models.map(m => m.name).filter(n => n.includes('flash')));
    }
  });
