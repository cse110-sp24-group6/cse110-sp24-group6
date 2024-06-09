const cacheName = "offline-cache-v1";
const cacheUrls = [
  "homepage.html",
  "dailylog.html",
  "todolist.html",
  "assets/styles/dailylog.css",
  "assets/styles/updated_homepage_CSS.css",
  "assets/styles/todolist.css",
  "assets/scripts/dailylog.js",
  "assets/scripts/homepagescript.js",
  "assets/scripts/todolist.js",
  "assets/scripts/ProjectCard.js",
  // Add other assets like images, icons, etc.
];

// Install event - cache all necessary assets
self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheUrls))
      .catch(error => console.error("Service Worker installation failed:", error))
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - respond with cached resources or fetch from network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        console.log("Serving from cache:", event.request.url);
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(error => {
        console.error("Fetch failed:", error);
        return caches.match('homepage.html'); // Fallback page
      });
    })
  );
});
