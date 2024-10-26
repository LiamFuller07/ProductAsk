require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to fetch product details
app.get('/product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const response = await axios.get(`https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${productId}.json`, {
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_CLIENT_SECRET
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Error fetching product');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
