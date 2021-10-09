
//https://viblo.asia/p/unit-test-cho-nodejs-restful-api-voi-mocha-va-chai-bWrZnLAv5xw
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8080;

let pet = require('./routes/pet');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.text());
app.use(express.json({
  type: 'application/json'
}));

app.get("/", (req, res) => {
  res.json({message: "Welcome to our Petstore!"})
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.route("/pets")
  .get(pet.getPets)
  .post(pet.postPet);
app.route("/pets/:id")
  .get(pet.getPet)
  .delete(pet.deletePet)
  .put(pet.updatePet);

module.exports = app; // for testing