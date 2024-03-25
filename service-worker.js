const CACHE_NAME = 'ecommerce-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'icons/bag.svg',
    'script.js',
    'images/button.png',
    'images/hero4.png',
    'images/logo.png',
    'images/about/a1.png',
    'images/about/a2.jpg',
    'images/about/a3.png',
    'images/about/a4.png',
    'images/about/a5.jpg',
    'images/about/a6.jpg',
    'images/about/banner.png',
    'images/banner/b1.jpg',
    'images/banner/b2.jpg',
    'images/banner/b4.jpg',
    'images/banner/b7.jpg',
    'images/banner/b10.jpg',
    'images/banner/b14.png',
    'images/banner/b16.jpg',
    'images/banner/b17.jpg',
    'images/banner/b18.jpg',
    'images/banner/b19.jpg',
    'images/banner/b20.jpg',
    'images/blog/b1.jpg',
    'images/blog/b2.jpg',
    'images/blog/b3.jpg',
    'images/blog/b4.jpg',
    'images/blog/b5.jpg',
    'images/blog/b6.jpg',
    'images/blog/b7.jpg',
    'images/features/f1.png',
    'images/features/f2.png',
    'images/features/f3.png',
    'images/features/f4.png',
    'images/features/f5.png',
    'images/features/f6.png',
    'images/pay/app.jpg',
    'images/pay/pay.png',
    'images/pay/play.jpg',
    'images/people/1.png',
    'images/people/2.png',
    'images/people/3.png',
    'images/products/f1.jpg',
    'images/products/f2.jpg',
    'images/products/f3.jpg',
    'images/products/f4.jpg',
    'images/products/f5.jpg',
    'images/products/f6.jpg',
    'images/products/f7.jpg',
    'images/products/f8.jpg',
    'images/products/n1.jpg',
    'images/products/n2.jpg',
    'images/products/n3.jpg',
    'images/products/n4.jpg',
    'images/products/n5.jpg',
    'images/products/n6.jpg',
    'images/products/n7.jpg',
    'images/products/n8.jpg',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});

self.addEventListener('push', event => {
    const title = 'E-commerce';
    const options = {
        body: event.data.text()
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-products') {
        event.waitUntil(syncProducts());
	console.log('Syncing products...');
    }
});

function syncProducts() {
    console.log('Syncing products...');
}