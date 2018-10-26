// UserRouter.js

const express = require('express');
const app = express();
const UserRouter = express.Router();

const User = require('./user');

UserRouter.route('/create').post(function (req, res) {
  const user = new User(req.body);
  console.log(user);
  user.save()
    .then(user => {
      res.status(200).json('User added successfully');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

UserRouter.route('/add').get(function (req, res) {
    res.render('pages/addItem');
});

UserRouter.route('/add/post').post(function (req, res) {
    var user = new User(req.body);
    console.log(user);
    user.save()
      .then(user => {
        res.redirect('/user');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});

UserRouter.route('/').get(function (req, res) {
    User.find(function (err, itms){
      if(err){
        console.log(err);
      }
      else {
        res.render('pages/item', {itms: itms});
      }
    });
});

UserRouter.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    User.findById(id, function (err, user){
        res.render('pages/editItem', {user: user});
    });
});

UserRouter.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
      if (!user)
        return next(new Error('Could not load Document'));
      else {
        // do your updates here
        user.name = req.body.name;
        user.email = req.body.email;
  
        user.save().then(user => {
            res.redirect('/user');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
});

UserRouter.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id},
         function(err, user){
          if (err) 
            res.json(err);
          else
            res.redirect('/user');
      });
});

module.exports = UserRouter;