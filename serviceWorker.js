const appName = 'App v1';
const assets = [
    '/',
    'index.html',
    '/src/css/style.css',
    '/src/js/app.js',
    './src/assets/favicon_io/android-chrome-192x192.png'
];

const install_cache = async (resources) => {//cache on install event
    console.log('installed');
    const cache = await caches.open(appName);
    await cache.addAll(resources);
  };
const activate_cache = async () =>{
    const cachedItems = await caches.keys();
    cachedItems.forEach(cached=>cached == appName ? cached : caches.delete(cached));
};
const putNewCache = async (req, res) => { //cache on fetch event
    const cache = await caches.open(appName);
    await cache.put(req, res);
  };

const fetch_cache = async(req) => {
    console.log('fetching');
    const resp  = await caches.match(req); 
    if(resp) return resp;
    const res = await fetch(req); 
    if(res){
            putNewCache(req, res.clone());
            return res;
        }
    // you can add a new response object for the if not found
    //you can also configure the preload response
};


self.addEventListener("install",e=>e.waitUntil(install_cache(assets)));
self.addEventListener("install",e=>e.waitUntil(activate_cache()));
self.addEventListener("fetch",e=>e.respondWith(fetch_cache(e.request)));