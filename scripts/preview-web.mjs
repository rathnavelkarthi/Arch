// Local-only preview of Expo's static export, including extensionless routes.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import process from 'node:process';

const root = resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const target = resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    for (const candidate of [target, `${target}.html`, resolve(target, 'index.html')]) {
      try {
        if (!(await stat(candidate)).isFile()) continue;
        response.writeHead(200, { 'Content-Type': mime[extname(candidate)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        response.end(await readFile(candidate));
        return;
      } catch { /* Try the next static route form. */ }
    }
    response.writeHead(404).end('Not found');
  } catch { response.writeHead(400).end('Invalid request'); }
}).listen(8081, '127.0.0.1', () => process.stdout.write('Illamora preview: http://127.0.0.1:8081\n'));
