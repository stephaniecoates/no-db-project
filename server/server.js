const express = require('express');
const axios = require('axios');
const bodyParser = require ('body-parser');
const newport = 3100;

const controller = require('./controller');

const app = express();
app.use(bodyParser.json());

//app.use(express.static( __dirname + '/../public/build'));

app.get("/api/food", controller.getFoodArray)

app.get(`/api/food/:id`, controller.getOneFood)

app.post(`/api/food`, controller.addCustomFood)

app.put(`/api/food/:id`, controller.editPlateFoodCals)

app.delete(`api/food/:id`, controller.deletePlateFood)


app.listen(newport, () => {
    console.log(`YEEHAW! Port ${newport} is open for business.`)
})