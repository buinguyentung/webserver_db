const express = require('express')
const app = express()
const port = 3000

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let products = [];

app.post('/products', function (req, res) {
  const newProduct = {...req.body, id: products.length + 1}
  //products = [...products, newProduct];
  products.push(newProduct);
  res.json(newProduct);
});

app.put('/products', function (req, res) {
  let updatedProduct;
  updatedProduct = req.body;
  for (let p of products) {
    if (p.id === updatedProduct.id) {
      p.name = updatedProduct.name;
    }
  }
  res.json(products);
});

app.delete('/products/:id', function (req, res) {
  const deleteId = +req.params.id;
  console.log("deleteId = " + deleteId);
  console.log(products)
  for (let p of products) {
    console.log(p.id === deleteId);
  }
  const deletedProduct = products.find(p => p.id === deleteId);
  products = products.filter(p => p.id !== deleteId);
  res.json(deletedProduct);
});

app.get('/products', (req, res) => {
  res.json(products);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  
