const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
const sport = require('./models/hobbies.js')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let url = 'mongodb://localhost:27017/hobbies';
mongoose.connect(url);
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/', function(req, res) {
  console.log('root path hit');
  sport.find()
    .then(function(sports) {
      console.log(sports);
      res.render('sports', {
        sport: sports
      })
    })
    .catch(function(error) {
      res.send(error)
    })
});
app.listen(3000, function() {
  console.log('Successfully started express appslication!');
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
