"use strict";

let express = require('express');
let app = express();

app.use( express.static(__dirname + '/../client'));

app.get('/sports', (request, response) => {
    response.json(['Weightlifting', 'Ciclying']);
});

app.listen(8181, () =>  console.log('Listening on 8181...'));