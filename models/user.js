Mongoose = require ("mongoose")
Joi = require ("joi" )
const User = Mongoose.model('User',  new Mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    // email:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    admin:{
        type:Boolean
    }
} )
)

function validateUser (user){
    const schema = {
        username: Joi.string().required(),
        password:Joi.string().required(),
        email:Joi.string(),
        // email:Joi.string().required().email(),
        passwordConfirm:Joi.string()

    }
    return Joi.validate(user,schema)

}

exports.validate=validateUser
exports.User = User 