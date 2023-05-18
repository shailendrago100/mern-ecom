const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    salt: {
      type: String,
    },
  }, {
  timestamps: true
}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      next();
  }
  else {
      console.log(this.password, "password hash")
      this.password = await bcrypt.hash(this.password, 10)
  }
})


// userSchema.pre("save", function (next) {
//   if (this.password && this.password.length > 0) {
//     this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64");
//     this.password = this.hashPassword(this.password);
//   }
//   next();
// });


// userSchema.methods.hashPassword = function (password) {
//   if (this.salt && password) {
//     return crypto
//       .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
//       .toString("base64");
//   } else {
//     console.log("hashPassword",password)
//   }
// }


// ye ni chl rha

userSchema.methods.getJWTToken = function(){
  //Creating a JWT token
  //if a person get this process.env.JWT_SECRET then he can login into the account and also can genrate token
  return jwt.sign({id: this._id} , process.env.JWT_SECRET_KEY,{
      expiresIn:process.env.JWT_EXPIRE, //by expiresIn we can set a expire date of token after that the guy will logout itself
  
  })
}


userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword , this.password);
};




module.exports = mongoose.model('User', userSchema);