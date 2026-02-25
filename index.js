import express from 'express';
const app = express();
app.listen(8080);
app.set('view engine', 'ejs');
const products = [
    {id: 1, name: 'Product 1', price: 10},
    {id: 2, name: 'Product 2', price: 20},
    {id: 3, name: 'Product 3', price: 30},
];
app.get('/', (req, res) => {
//    res.json({message: 'Hello World'});
    res.render('index');
});
app.get('/products', (req, res) => {
    res.render('products', { products });
});
