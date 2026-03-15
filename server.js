import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';
import { readFile } from 'fs';

const TYPES = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  mp3: 'audio/mpeg',
};

const ROOT = dirname(fileURLToPath(import.meta.url));

const server = createServer((req, res) => {
  const filePath = join(ROOT, req.url === '/' ? 'index.html' : req.url);

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found');
    }
    const ext = filePath.split('.').pop();
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Dev server running: http://localhost:3000');
});
