// psql -h localhost -d test_db -U tungbui
const express = require('express');
const dbquery = require('./queries.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    console.log('/');
    res.send('Hello Tung');
});

app.get('/car', dbquery.getCars);
app.get('/car/:id', dbquery.getCarById);
app.post('/car', dbquery.createCar);
app.put('/car/:id', dbquery.updateCar);
app.delete('/car/:id', dbquery.deleteCar);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
