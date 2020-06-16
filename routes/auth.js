
const bcrypt = require("bcrypt")

const mongoose = require("mongoose")

const jwt = require('jsonwebtoken')

const express = require('express')
router = express.Router()

const config= require('config')

const {User,validate}  = require("../models/user")


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function checkPassword(user,password) {

    return await bcrypt.compare(password,user.password) ;
}

router.post("/",async (req,res)=>{

    console.log(req.body)
    
    let user = await User.findOne({username:req.body.username})
    if ( !user || ! await checkPassword(user,req.body.password) ){
        return res.status(400).send("Invalid username or password")
    } else{
        const token = jwt.sign( {_id:user._id, username:req.body.username},config.get("jwtPrivateKey") )
        res.cookie('jwt_token',token , { maxAge: 3600000, httpOnly: true });
        renderParams = {user:{username:req.body.username} }
        res.status(200).render('user/loginSuccess',renderParams)

    }
}
)

module.exports = router
