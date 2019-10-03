let STATIC_CACHE = 'static-v3';
let DYNAMIC_CACHE = 'dynamic-v3';
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing service worker....', event);
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([
                    '/index.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/promise.js',
                    '/src/js/fetch.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/main-image.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ]);
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating service worker....', event);
    event.waitUntil(
        caches.keys()
            .then((keysList) => {
                return Promise.all(keysList.map((key) => {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        console.log('[Service Worker] Removing old cache...', key);
                        return caches.delete(key);
                    }
                }))
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response)
                    return response;
                else 
                    return fetch(event.request)
                        .then((res) => {
                            return caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                });
                        });
            }).catch((err) => {
                console.log(err);
            })
    );
});