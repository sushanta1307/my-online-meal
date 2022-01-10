const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const async = require('hbs/lib/async');
require("./db/conn");
const RegisterUser = require("../models/registerUser");
const RegisterChef = require("../models/registerChef");
const FeedbackUser = require('../models/feedbacks');
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

app.get("/", (req,res)=>{
    res.render("index")
});
app.get("/services", (req,res)=>{
    res.render("services")
});
app.get("/login", (req,res)=>{
    res.render("login")
});
app.get("/registeruser", (req,res)=>{
    res.render("registeruser")
});
app.get("/registerchef", (req,res)=>{
    res.render("registerchef")
});
app.get("/contact", (req,res)=>{
    res.render("contact")
});
app.post("/contact",async (req,res)=>{
    // res.render("contact")
    const user = new FeedbackUser({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message
    })
    const userDetails = await user.save();
    // res.send(userDetails)
    res.send("Thanks for your feedback")
});
app.post("/registeruser", async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const reg = new RegisterUser({
                firstname: req.body.fname,
                lastname: req.body.lname,
                gender: req.body.gender,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                phone: req.body.phone,
                email: req.body.mail
            })
            const saved  = await reg.save();
            res.status(200).render("index");
        }
        else{
            res.send("Passwords not matching");
        }
    }
    catch(error) {
        res.status(404).send(error);
    }
});
app.post("/registerchef", async (req,res)=>{
    try{
        const reg = new RegisterChef({
          firstname: req.body.fname,
          lastname: req.body.lname,
          gender: req.body.gender,
          age: req.body.age,
          phone: req.body.phone,
          email: req.body.mail,
        });
        const saved = await reg.save();
        res.status(200).render("index");
    }
    catch(error) {
        res.status(404).send(error);
    }
});

app.post("/login", async(req,res)=>{
    try {
        const mail = req.body.mail;
        const password = req.body.password;
        const usermail = await Register.findOne({email:mail});
        if(usermail.password === password){
            res.render('index');
        }
        else{
            res.send("Invalid login credentials");
        }
    } catch (error) {
        res.status(404).send("Invalid login credentials");
    }
});

app.listen(port,()=>{
    console.log(`Server is running at port no ${port}`)
})