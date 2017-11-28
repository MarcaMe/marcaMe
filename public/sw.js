var cacheName = 'marca-me';

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache =>
        cache.addAll([
          '/bundle.js',
          '/bookmark.png',
          '/favicon.ico',
          'index.html',
          'manifest.json',
          '/',
          '/home',
          '/content/:id'
        ])
      )
  );
});

//fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;

      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(function(fetchResponse) {
        if (!fetchResponse || fetchResponse.status !== 0) return fetchResponse;

        var responseToCache = fetchResponse.clone();

        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return fetchResponse;
      });
    })
  );
});
