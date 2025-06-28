const fs = require('fs').promises;
const matter = require('gray-matter');
const fetch = require('node-fetch');

const translateText = async (text) => {
  const res = await fetch('https://api.gemma.com/translate', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.GEMMA_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, target: 'fr' }),
  });
  return (await res.json()).translatedText;
};

(async () => {
  const file = process.argv[2];
  if (!file.endsWith('.en.mdx')) return console.error('Use .en.mdx files only');

  const content = await fs.readFile(file, 'utf-8');
  const { data, content: body } = matter(content);

  const newData = {
    ...data,
    title: await translateText(data.title),
    description: await translateText(data.description),
  };

  const newBody = await translateText(body);
  await fs.writeFile(file.replace('.en.mdx', '.fr.mdx'), matter.stringify(newBody, newData));

  console.log('Translation completed.');
})();
