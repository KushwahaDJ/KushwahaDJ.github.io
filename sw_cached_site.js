const cacheName = 'v2';


// Call Install Event

self.addEventListener('install', e => {
    console.log('Service Worker: Intalled')
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
        fetch(e.request)
        .then(res => {
            // make copy/clone of response
            const resClone = res.clone()
            // Open cache

            caches
            .open(cacheName)
            .then(cache => {
                // add response to the cache
                cache.put(e.request, resClone)
            })
            return res;
        }).catch(err => caches.match(e.request).then( res => res))
    )

})