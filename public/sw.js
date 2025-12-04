// Service Worker "Killer"
// This script replaces the old Service Worker and immediately unregisters itself.

self.addEventListener('install', (e) => {
    // Force this SW to become the active one immediately
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    // Unregister itself
    self.registration.unregister()
        .then(() => {
            // Take control of all clients
            return self.clients.matchAll();
        })
        .then((clients) => {
            // Force all open tabs to reload to see the new content
            clients.forEach(client => client.navigate(client.url));
        });
});
