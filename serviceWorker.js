const weatherApp = "weather-api-site-v1"
const assets = [
    "/index.html",
    "/style.css",
    "/app.js",
    "/images/clouds.png",
    "/images/clear.png",
    "/images/br-clouds.png",
    "/images/drizzle.png",
    "/images/few-clouds.png",
    "/images/haze.png",
    "/images/humidity.png",
    "/images/rain.png",
    "/images/smoke.png",
    "/images/snow.png",
    "/images/storm.png",
    "/images/wind.png",

]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(weatherApp).then(cache => {
            cache.addAll(assets)
        })
    )
})



