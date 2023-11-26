const weatherApp = "weather-api-site-v1"
const assets = [
    "/index.html",
    "/style.css",
    "/app.js",
    "/images/clouds.png",
    "/images/clear.png",
    "/images/br-clouds.png",

]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(weatherApp).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

