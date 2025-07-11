const CACHE_NAME = 'temperature-converter-v1';
const BASE = '/DB-Website-PWA/';  // Basis-Pfad für GitHub Pages

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll([
      BASE,
      BASE + 'index.html',
      BASE + 'converter.css',
      BASE + 'converter.js',
      BASE + 'install.js',
      BASE + 'manifest.json',
      BASE + 'icon512.png'
    ]);
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.open(CACHE_NAME).then(cache =>
    cache.match(event.request).then(resp => {
      return resp || fetch(event.request).then(fresp => {
        cache.put(event.request, fresp.clone());
        return fresp;
      });
    })
  ));
});
