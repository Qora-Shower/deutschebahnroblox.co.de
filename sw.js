const CACHE_NAME = 'Deutsche-Bahn-Roblox-v2'; // ändere Version bei Updates!
const BASE = '/DB-Website-PWA/';

const FILES_TO_CACHE = [
  BASE,
  BASE + 'index.html',
  BASE + 'index.css',
  BASE + 'install.js',
  BASE + 'manifest.json',
  BASE + 'icon512.png'
];

// Install - Cache Dateien
self.addEventListener('install', event => {
  self.skipWaiting(); // Sofort aktiv
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Aktivieren - Alte Caches löschen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Alte Version löschen
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Netzwerk bevorzugt, Cache als Fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Erfolgreich? -> Cache aktualisieren
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // Wenn offline -> Cache verwenden
        return caches.match(event.request);
      })
  );
});
