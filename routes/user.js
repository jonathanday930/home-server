

const {User,validate}  = require("../models/user")

const mongoose = require("mongoose")


const express = require('express')

router = express.Router()

const config= require('config')
const bcrypt = require('bcrypt')


async function encryptPassword(password){
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const hashed = await bcrypt.hash(password,salt)
    return hashed

}


router.get('/', (req,res)=> {

    res.redirect('user/create')

}
)

router.get('/create', (req,res)=> {

    res.render('userRegistration')

}
)

router.get("/login",async (req,res)=>{
    res.render("userlogin")
})







router.post('/create',async(req,res) => {
    
    console.log(req.body)

    if (req.body.password!= req.body.passwordConfirm) return res.status(400).send("Passwords do not match")

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({username:req.body.username})
    if (user) return res.status(400).send("User already registered")

    

    user = new User({
        username:req.body.username,
        // password:req.body.password,
        password: await encryptPassword(req.body.password),
        // email:req.body.email

    })

    await user.save();

    res.send(user)


})



module.exports = router
