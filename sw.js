var CACHE_NAME = "static-v1";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async function (cache) {
      return await cache.addAll([
        "/",
        "./index.html",
        "./styles.css",
        "./main.js",
        "./manifest.js",
      ]);
    })
  );
});

self.addEventListener("activate", async function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return await Promise.all(
        keys
          .filter(function (key) {
            return key.indexOf(CACHE_NAME) !== 0;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});
