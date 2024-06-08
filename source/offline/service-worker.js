
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

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
       
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

