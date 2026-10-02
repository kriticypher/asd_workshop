let cache = {}

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url
    const cachedItem = cache[key]

    if (cachedItem) {
        return res.json(cachedItem.data)
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
