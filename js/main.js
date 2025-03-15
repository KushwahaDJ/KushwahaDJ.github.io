// make sure service worker is suported in the browsor

if('serviceWorker' in navigator){
    // console.log('service worker supported')
    window.addEventListener('load', ()=> {
        navigator.serviceWorker
        .register("../sw_cached_site.js")
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service worker: Error: ${err}`))
    })
}
