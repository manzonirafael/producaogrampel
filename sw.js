// Service worker do app Grampel
// Ao publicar uma nova versão, mude o número abaixo (v2, v3...) para os aparelhos atualizarem.
const VERSAO = 'grampel-v9';
const ARQUIVOS = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './icons/logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Arquivos do próprio app: busca na internet primeiro (sempre a versão mais nova)
// e usa a cópia guardada só se estiver sem conexão. Dados do Supabase não são guardados.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(resp => {
        if (resp && resp.ok) {
          const copia = resp.clone();
          caches.open(VERSAO).then(c => c.put(req, copia));
        }
        return resp;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
