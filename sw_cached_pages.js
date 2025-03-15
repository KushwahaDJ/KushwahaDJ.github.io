// Not using  any more
const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    '/css/style.css',
    '/js/main.js',
    '/assets/adobe_wordmark_red.svg',
    '/assets/eye.png',
    '/assets/h1-header-logo.webp',
    '/assets/parnets.png',
    '/assets/SLFB_logo-v3.png',
    '/assets/UI_8Yr_FE_dev_dhananjay_react_0425.pdf',
 ]


// Call Install Event

self.addEventListener('install', e => {
    console.log('Service Worker: Intalled');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// call Activate Event

self.addEventListener('activated', e => {
    console.log('Service Worker: Activated')

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})


// call fetch event

self.addEventListener('fetch', e => {
    console.log('Service worker fetching');

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )

})