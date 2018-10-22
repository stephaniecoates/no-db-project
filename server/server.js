const express = require('express');
const axios = require('axios');
const bodyParser = require ('body-parser');
const port = 3100;

const controller = require('./controller');

const app = express();
app.use(bodyParser.json());

//app.use(express.static( __dirname + '/../public/build'));

app.get(`/api/food`, controller.getFoodArray)

app.get(`/api/food/:id`, controller.addToPlate)

app.post(`/api/food`, controller.addCustomFood)

app.put(`/api/food/:id`, controller.editPlateFoodCals)

app.delete(`/api/food/:id`, controller.deletePlateFood)

app.delete(`/api/food`, controller.clearPlate)

app.get(`https://aws.random.cat/meow`, controller.getCatPicture)


app.listen(port, () => {
    console.log(`YEEHAW! Port ${port} is open for business.`)
})