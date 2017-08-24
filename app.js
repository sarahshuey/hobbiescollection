const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
const Sport = require('./models/hobbies.js')
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
  Sport.find()
    .then(function(sports) {
      console.log(sports);
      res.render('sports', {
        sport: sports
      })
    })
    .catch(function (error) {
    console.log('error ' + JSON.stringify(error));
  })
});

app.post('/hobbies',function(req,res) {
let hobbieName = req.body.hobbieName
const hobby = new Sport({
  hobbieName: hobbieName,
});

hobby.save().then(function(results) {
  console.log("saved " + results);
  return Sport.find()
})
.then(function(hobbie) {
console.log(hobbie);
res.render('sports',{
  sport:hobbie
})
// .catch(function(error,hobbie) {
// console.log('error ' + JSON.stringify(error));
// res.redirect('/')
// })
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
