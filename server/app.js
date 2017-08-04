"use strict";

let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + '/../client'));

app.get('/sports', (request, response) => {
  let sports = mongoUtil.sports();
  sports.find().toArray((err, docs) => {
    const sports = docs.map((sport) => sport.name);
    response.json(sports);
  });
});

app.get('/sports/:name', (request, response) => {
  let sportName = request.params.name;
  let sports = mongoUtil.sports();
  sports.findOne({'name': sportName}, (err, doc) => {
    const sport = doc;
    if (!sport) {
      response.status(404).json(`There is no sport stored with the name ${sportName}`);
    } else {
      response.json(sport);
    }
  });
});

app.listen(8181, () =>  console.log('Listening on 8181...'));