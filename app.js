const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express();
const Sport = require('./models/hobbies')

app.engine('mustache',mustacheExpress());
app.set('views','./views')
app.set('view engine', 'mustache')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/hobbies');

const hobbie = new Sport({hobbieName: "Football"});
hobbie.save()
  .then(function (results) {
    console.log('saved ' + results);
    return Sport.findOne({hobbieName: "Football"});
  })

console.log(hobbie);

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
  });
  // .then(function(results) {
  //   console.log('\nfindOne returned\n' + results);
  //   return Sport.find({hobbieName:"Soccer"})
  // }).then(function (results) {
  //   console.log('\n\nfind returned ' + results.length + ' results');
  // }).catch(function (error) {
  //   console.log('error ' + JSON.stringify(error));
  // })
