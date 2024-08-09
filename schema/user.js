const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});


// it's like middleware run before every save mtd
userSchema.pre('save', async function(next){
const user = this;

if(!user.isModified('password')){
    next();
}

try {
    const hash_pass =  await bcrypt.hash(user.password,10);  // bcrypt.js is used to hashed password
    user.password = hash_pass;
    
} catch (err) {
    console.log(err);
}
});

userSchema.methods.generateToken = async function() {  // jwt is used to generate token

    try {
        return jwt.sign({    // payload
            userId:this._id.toString(), // convert to string to store coz;json standardized with strings
            email:this.email,
        },
    process.env.SECRET_KEY,
        { expiresIn: '1h' }  // 1 hour);
    );   
    } catch (err) {
        console.log(err);
    }
    
}


const userModel = mongoose.model('User',userSchema);


module.exports = userModel;