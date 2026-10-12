/* Service worker: siempre intenta la red primero, así los cambios de lessons.json y del código llegan solos.
   Sin internet usa la última copia guardada. */
var CACHE = 'noah-app-cache';
var CORE = ['./', 'index.html', 'app.js', 'drawings.js', 'lessons.json', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return Promise.all(CORE.map(function (u) { return c.add(new Request(u, { cache: 'reload' })).catch(function () {}); })); }));
});
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    fetch(req, { cache: 'no-store' }).then(function (res) {
      if (res && (res.ok || res.type === 'opaque')) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (m) { return m || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()); });
    })
  );
});
