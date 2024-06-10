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
  "assets/HTML_Homepage_pics/checked_in.png",
  "assets/HTML_Homepage_pics/daily_log_fire.png",
  "assets/HTML_Homepage_pics/daily_log_nav.png",
  "assets/HTML_Homepage_pics/databaes_logo.png",
  "assets/HTML_Homepage_pics/external_link_brown.png",
  "assets/HTML_Homepage_pics/external_link_darkblue.png",
  "assets/HTML_Homepage_pics/external_link_white.png",
  "assets/HTML_Homepage_pics/homepage_nav.png",
  "assets/HTML_Homepage_pics/projects_folder.png",
  "assets/HTML_Homepage_pics/to-do_list_nav.png",
  "assets/HTML_Homepage_pics/unchecked.png",
  "assets/icons/homepage/completed_project/brown.svg",
  "assets/icons/homepage/completed_project/cream.svg",
  "assets/icons/homepage/completed_project/green.svg",
  "assets/icons/homepage/current_project/brown.svg",
  "assets/icons/homepage/current_project/cream.svg",
  "assets/icons/homepage/current_project/green.svg",
  "assets/icons/homepage/daily_log/daily_log_brown.png",
  "assets/icons/homepage/daily_log/daily_log_cream.png",
  "assets/icons/homepage/daily_log/daily_log_green.png",
  "assets/icons/homepage/daily_log/daily_log_white.png",
  "assets/icons/homepage/edit/edit_icon_brown.svg",
  "assets/icons/homepage/edit/edit_icon_cream.svg",
  "assets/icons/homepage/edit/edit_icon_green.svg",
  "assets/icons/homepage/github/github_icon_brown.svg",
  "assets/icons/homepage/github/github_icon_cream.svg",
  "assets/icons/homepage/github/github_icon_green.svg",
  "assets/icons/homepage/project_card_delete/delete_icon.png",
  "assets/icons/homepage/projectpage/celebration.png",
  "assets/icons/homepage/projectpage/daily-log.png",
  "assets/icons/homepage/projectpage/fish.png",
  "assets/icons/homepage/projectpage/home-icon.png",
  "assets/icons/homepage/projectpage/otter.png",
  "assets/icons/homepage/projectpage/projects-icon.png",
  "assets/icons/homepage/projectpage/todo-icon.png",
];

// Install event - cache all necessary assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheUrls))
      .catch(error => console.error("Service Worker installation failed:", error))
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
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
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        console.log("Serving from cache (service worker activated):", event.request.url);
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(error => {
        console.error("Fetch failed:", error);
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('homepage.html'); // Fallback to homepage for navigation requests
        }
        return new Response('Network request failed and no cache available.', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
