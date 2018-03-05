//Update the name of the controller below and rename the file.
const cards = require("../controllers/cards.js")
module.exports = function(app){

  app.get('/', cards.index);

  app.post('/cards', cards.cards);

  app.get('/list/:id', cards.list);

  app.get('/remove/:id', cards.remove);

}
