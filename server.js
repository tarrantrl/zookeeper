const express = require('express');
const fs = require('fs');
const path = require('path');

// these requires will read the index.js files in each folder
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const { animals } = require('./data/animals.json');

const PORT = process.env.PORT || 3001;

// instantiate server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming json data
app.use(express.json());
// make the files in public static resources
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// set up server to listen on 3001
app.listen(PORT, () => {
    console.log('API server now on port 3001!');
})