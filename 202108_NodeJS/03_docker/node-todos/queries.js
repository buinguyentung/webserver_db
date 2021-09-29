// Config
// const config = require('./config');
// console.log(config.getDBConnectionString());
const config = require('./config/config.json');
console.log(config["username"] + " " + config["password"]);
console.log(config["host"] + " " + config["port"] + " " + config["database"]);

const Pool = require('pg').Pool;
const pool = new Pool({
    user: config["username"],
    password: config["password"],
    host: config["host"],
    port: config["port"],
    database: config["database"]
});

const getTodos = (req, res) => {
    console.log("getTodos");
    pool.query('SELECT * FROM todosTbl ORDER BY id ASC', (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Done getTodos");
        res.json(result.rows);
    });
}

const getTodoById = (req, res) => {
    const id = parseInt(req.params.id);
    console.log("getTodoById " + id);

    pool.query('SELECT * FROM todosTbl WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Done getTodoById");
        res.json(result.rows);
    });
}

const createTodo = (req, res) => {
    const {text, isDone} = req.body;
    pool.query('INSERT INTO todosTbl (text, isDone) VALUES ($1, $2)', [text, isDone], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(201).send(`Todo added id = ${result.insertId}`);
    })
}

const updateTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const {text, isDone} = req.body;
    pool.query('UPDATE todosTbl SET text = $1, isDone = $2 WHERE id = $3', [text, isDone, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Updated todo id = ${id}`);
    })
}

const deleteTodo = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM todosTbl WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Deleted todo id = ${id}`);
    })
}

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
}