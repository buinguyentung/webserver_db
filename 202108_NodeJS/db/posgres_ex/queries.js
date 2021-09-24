const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'tungbui',
    password: 'admin',
    host: 'localhost',
    database: 'test_db',
    port: 5432
});

const getCars = (req, res) => {
    console.log("getCars");
    pool.query('SELECT * FROM car ORDER BY id ASC', (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Done getCars");
        res.json(result.rows);
    });
}

const getCarById = (req, res) => {
    const id = parseInt(req.params.id);
    console.log("getCarById " + id);

    pool.query('SELECT * FROM car WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Done getCarById");
        res.json(result.rows);
    });
}

const createCar = (req, res) => {
    const {make, model, price} = req.body;
    pool.query('INSERT INTO car (make, model, price) VALUES ($1, $2, $3)', [make, model, price], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`Car added id = ${result.insertId}`);
    })
}

const updateCar = (req, res) => {
    const id = parseInt(req.params.id);
    const {make, model, price} = req.body;
    pool.query('UPDATE car SET make = $1, model = $2, price = $3 WHERE id = $4', [make, model, price, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Updated car id = ${id}`);
    })
}

const deleteCar = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM car WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Deleted car id = ${id}`);
    })
}

module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}