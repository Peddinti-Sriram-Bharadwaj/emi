self.addEventListener('install',event =>{
    console.log('Install event!');

    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    )
});

self.addEventListener('activate',() => {
    console.log('Activate event');
});

self.addEventListener('fetch',event =>{
    event.respondWith(caches.match(event.request)
    .then(cachedResponse => {

        return cachedResponse || fetch(event.request);
    })
    );
});

const cacheName = 'cache-v1';

const resourcesToPrecache = [
    '/',
    'style.css',
    'index.js',
    'emi_logo.png'
];

let deferredPrompt;

if (typeof window !='undefined')
{
    window.addEventListener('beforeinstallprompt',(e) => {
    e.preventDefault();
    deferredPrompt=e;

    btnAdd.style.display ='block';
    btn.addEventListener('click',(e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if(choiceResult.outcome =='accepted'){
                console.log('User accepted the prompt');
            }
    
            deferredPrompt = null;
        })
    });
});

window.addEventListener('appInstalled',(evt) => {
    AudioParamMap.logEvent('a2hs','installed');
})
}



