
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/offline/offline.html',
    '/source/dailylog.html',
    '/source/homepage.html',
    '/source/todolist.html',
    '/source/assets/scripts/dailylog.js',
    '/source/assets/scripts/homepagescript.js',
    '/source/assets/scripts/todolist.js',
    '/source/assets/scripts/ProjectCard.js',
    '/source/assets/styles/dailylog.css',
    '/source/assets/styles/updated_omepage_CSS.css',
    '/source/assets/styles/todolist.css',
];

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
        })
    );
       
});

// Activates the service worker 
self.addEventListener('activate', (event) => { 
    event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them 
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          return cachedResponse || fetch(event.request).then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());
            return fetchedResponse;
          });
        });
    }));
});

