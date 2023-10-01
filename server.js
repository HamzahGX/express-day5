const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const products = [
  {
    id: 1,
    name: 'Stainless Steel Crookpot',
    price: 100.99,
    description: 'The best crookpot for your daily cooking.',
    image1: 'product1.jpg',
  },
  {
    id: 2,
    name: 'Food mixer Bullet style',
    price: 190.99,
    description: 'Cutting edge technology food mixer.',
    image2: 'product2.jpg',
  },
];

// Serve static assets with caching headers
app.use('/public', express.static(path.join(__dirname, 'public'), {
  maxAge: 31536000, // Cache for one year (adjust as needed)
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Pass the products array to the home template
  res.render('home', { products });
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    res.status(404).send('Product not found');
    return;
  }

  // Construct the path to the images using the "image1" and "image2" fields in the product data
  const imagePath1 = `/public/${product.image1}`;
  const imagePath2 = `/public/${product.image2}`;

  res.render('productDetails', { product, imagePath1, imagePath2 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
