// psql -h localhost -d test_db -U tungbui
const express = require('express');
const path = require('path');
const dbquery = require('./queries.js');
const app = express();
const port = process.env.PORT || 3000;

// Public files
app.use('/assets', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    console.log('/');
    res.render("index");
});

app.get('/todos', dbquery.getTodos);
app.get('/todos/:id', dbquery.getTodoById);
app.post('/todos', dbquery.createTodo);
app.put('/todos/:id', dbquery.updateTodo);
app.delete('/todos/:id', dbquery.deleteTodo);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});