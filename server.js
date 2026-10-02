const express = require('express')
const productRoutes = require('./routes/product.routes')

const app = express()
const port = 3000

app.use(express.json())

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`)
    next()
})

app.get('/', (req, res) => {
    res.json({
        message: 'Product Catalog API with Caching Middleware',
        endpoints: {
            getAllProducts: 'GET /products',
            getProductById: 'GET /products/:id',
            createProduct: 'POST /products',
            updateProduct: 'PUT /products/:id',
            deleteProduct: 'DELETE /products/:id'
        }
    })
})

app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
