let cache = {}
const TTL = 60 * 1000

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url
    const cachedItem = cache[key]
    const currentTime = Date.now()

    if (cachedItem) {
        const age = currentTime - cachedItem.createdAt

        if (age < TTL) {
            return res.json(cachedItem.data)
        } else {
            delete cache[key]
        }
    }

    const originalJson = res.json.bind(res)
    res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                data: data,
                createdAt: Date.now()
            }
        }
        return originalJson(data)
    }

    next()
}

function invalidateCache() {
    cache = {}
}

module.exports = {
    cacheMiddleware,
    invalidateCache
}
