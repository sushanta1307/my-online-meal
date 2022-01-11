const express = require('express');
const router = new express.Router();
const RegisterUser = require("../models/registerUser");
const RegisterChef = require("../models/registerChef");
const FeedbackUser = require('../models/feedbacks');

router.get("/", (req,res)=>{
    res.render("index")
});
router.get("/services", (req,res)=>{
    res.render("services")
});
router.get("/login", (req,res)=>{
    res.render("login")
});
router.get("/registeruser", (req,res)=>{
    res.render("registeruser")
});
router.get("/registerchef", (req,res)=>{
    res.render("registerchef")
});
router.get("/contact", (req,res)=>{
    res.render("contact")
});
router.post("/contact",async (req,res)=>{
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
router.post("/registeruser", async (req,res)=>{
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
router.post("/registerchef", async (req,res)=>{
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

router.post("/login", async(req,res)=>{
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

module.exports = router;