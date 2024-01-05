const express = require("express");
const router = express.Router();

const { 
    signup,
    signin, 
    signout,
    requireSignin } = require("../controllers/auth");
const user = require("../models/user");
const {userSignupValidator} = require("../validator/index");

router.post("/signup",userSignupValidator ,signup);
router.post("/signin",signin);
router.get("/signout",signout);
 
router.get('/hell',requireSignin,(req,res)=>{
    res.send("hello theere");
})

module.exports = router;
