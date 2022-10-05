const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { getProductHandler, getReviewsHandler, getQuestionsHandler } = require('./controller/helper.js');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

//get routes
app.get('/products/:product_id', getProductHandler);

app.get('/reviews/:product_id/:count/:page/:sort', getReviewsHandler);

app.get('/reviews/meta/:product_id', getReviewsHandler);

app.get('/qa/questions/:product_id', getQuestionsHandler);


//post routes
app.post('/products', (req, res) => {

});

app.post('/reviews', (req, res) => {

});



//put routes
app.put('/products', (req, res) => {

});

app.put('/reviews', (req, res) => {

});

app.put('/qa/questions', (req, res) => {

});


app.listen(port, () => {
  console.log(`Listening on  http://localhost:${port}`);
});