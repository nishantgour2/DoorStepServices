const User = require("../models/user");
const jwt = require('jsonwebtoken'); //to generate signed token
const expressJwt = require('express-jwt'); //for autorization check
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
    // res.send("Heloo")
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            console.log(errorHandler(err));
            return res
                        .status(400)
                        .json(err)
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        });
    });
};

// sign in

exports.signin = (req,res) =>
{
// find user based on email
const {email,password} = req.body
User.findOne({email},(err,user) => {
    if(err || !user){
        return res.status(400).json({
            error:'User With This Email Does Not exist | Signup To Continue '
        })
    }
    // if user is found match email & password
    // create authenticate method in user model
    if(!user.authenticate(password)){
        return res.status(401).json({
            error:'Email is not matched with correspond password'
        })
    }

    // generate a signed token with user id and secret  
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    // persist the token as 't' in cookie with expiry date

    res.cookie('t',token,{expire : new Date() + 9999})
    // return response with user and token to frontend client

    const {_id,name,email,pincode,phone,address,role} = user;
    return res.json({token,user:{_id,email,name,pincode,phone,address,role}})

});  

};


exports.signout = (req,res) => {
    res.clearCookie('t ');
    res.json({message:"Signout Success!"});
};


// sirf wahi signed in user hi data access karpaay
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
}) 


exports.isAuth = (req,res,next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if(!user){
            return res.status(403).json({
                error:"Access denied (auth.js)"
            });
        }
        next();
};


exports.isAdmin = (req,res,next) => {
    if(req.profile.role===0){
        return res.status(403).json({
            error: 'Admin resource! Access denied'
        })
    }
    next();
};