if(self instanceof Window){
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(registration => {
        console.log('Service Worker Registered');
      })
      .catch(error => {
        console.log('Service Worker Registration Failed:', error);
      });
  });
}else if(self instanceof ServiceWorkerGlobalScope){
    
  const cacheVersion = 'v1';
  
  self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    // Remove old caches
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheVersion) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });
  
  // Event listener for fetch requests
  self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching');
    event.respondWith(
      // Try to fetch the resource
      fetch(event.request)
        .then(response => {
          // Clone the response
          const responseClone = response.clone();
          // Open cache and add the fetched resource
          caches.open(cacheVersion).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        // If fetch fails, try to get from cache
        .catch(() => caches.match(event.request).then(response => response))
    );
  });
}
