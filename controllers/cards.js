const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    if(!req.session.list){
      req.session.list = [];
    };
    knex('cards').then((results) => {
      res.render('index', {cards:results, list:req.session.list});
    })
  },

  cards: function(req, res) {
    knex('cards').insert({
      mana: req.body.mana,
      attack: req.body.attack,
      health: req.body.health,
      description: req.body.description
    }).then(() => {
      res.redirect('/');
    })
  },

  list: function(req, res) {

    knex('cards')
      .where('id', req.params.id)
      .then((result) => {
        req.session.list.push(result[0]);

        req.session.save(() => {
          res.redirect('/');
        })

      })
  },

  remove: function(req, res) {
    
    for (let i = 0; i < req.session.list.length; i++) {
      if (req.session.list[i].id == req.params.id) {
        req.session.list.splice(i, 1);
        break;
      }
    }

    req.session.save(() => {
      res.redirect('/')
    })

  },
}
