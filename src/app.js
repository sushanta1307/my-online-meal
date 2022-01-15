const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const async = require('hbs/lib/async');
require("./db/conn");
const myRouter = require('../routers/router');
const port = process.env.PORT || 2000;

const static_path = path.join(__dirname, "../public/");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(myRouter);

app.listen(port,()=>{
    console.log(`Server is running at port no ${port}`)
})