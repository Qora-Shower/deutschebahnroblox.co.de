const CACHE_NAME = 'Deutsche-Bahn-Roblox-v3';
const BASE = '/deutschebahnroblox.co.de/';  // Basis-Pfad für GitHub Pages

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll([
      BASE,
      BASE + 'index.html',
      BASE + 'styles/index/index.css',
      BASE + 'pages/login.html',
      BASE + 'styles/login/login.css',
      BASE + 'pages/calender.html',
      BASE + 'styles/kalender/calender.css',
      BASE + 'install.js',
      BASE + 'manifest.json',
      BASE + 'icon2-512.png',
      BASE + 'icon512.png',
      BASE + 'images/icon512.png'
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
