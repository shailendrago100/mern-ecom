const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
// const { createAccessToken } = require('../service/authService/createToken')

const User = require('../models/User');
const { sendToken } = require('../middlewares/verifyToken');

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password , passwordConfirm} = req.body;
    const isAdmin = req.body.isAdmin || false;

    if(password != passwordConfirm){
      return res
      .status(500)
      .json({ success: false, message: "Password Doesn't match" });
      
    }

    let payload = {
      username: username,
      email: email,
      password: password,
      isAdmin: isAdmin
    };

    let ExistingUsername = await User.findOne({ username });
    let ExistingUser = await User.findOne({ email });

    if (ExistingUser || ExistingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be atleast 8 digits" });
    }

    let user1 = await User.create(payload)

    // console.log(user1, "registered user");

    // const tokenObject = {
    //   id: user1._id,
    //   email: email,
    // }

    // console.log(tokenObject, "token");
    // let token = await createAccessToken(tokenObject, 1440);
    sendToken(user1 , 201 , res)

    // const options = {
    //     httpOnly: true,
    //     expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    // }
    // res.status(201).cookie("token", token, options).json({
    //   success: true,
    //   user1,
    //   token,
    // })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }


  // const errors = validationResult(req);
  // !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const isAdmin = req.body.isAdmin || false;
  // bcrypt.hash(password, 12)
  //   .then(hashedPassword => {
  //     const user = User.create({
  //       username,
  //       email,
  //       password: hashedPassword,
  //       isAdmin
  //     });
  //     return user.save();
  //   })
  //   .then(user => {
  //     res.status(201).json({
  //       message: 'User is registered successfully.',
  //       user
  //     });
  //   })
  //   .catch(error => {
  //     res.status(500).json(error);
  //   });
};

module.exports.login = async (req, res, next) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter email and password", 404))
  }
  // agr password le aage + nhi lgaya to frontend me state me sirf if aur password jaega,,, + lga dia to sara data
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
        .status(400)
        .json({ success: false, message: "Email doesn't exist" });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
  }
  sendToken(user , 200 ,res);

  // const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
  //     expiresIn:process.env.JWT_EXPIRE
  // })
  // const tokenObject = {
  //   id: user._id,
  //   email: email,
  // }

  // let token = await createAccessToken(tokenObject);
  // const token = user.getJWTToken();
  // const options = {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
  // }
  // res.status(200).cookie("token", token, options).json({
  //   success: true,
  //   user,
  //   token,
  //   isAdmin: user.isAdmin
  // })
  //   .catch(error => {
  //     res.status(500).json(error);
  //   });


  // const username = req.body.username;
  // const password = req.body.password;
  // let user;
  // User.findOne({ username })
  //   .then(foundUser => {
  //     !foundUser && res.status(400).json({
  //       message: 'Username is not valid!'
  //     });
  //     user = foundUser;
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then(isEqual => {
  //     !isEqual && res.status(400).json({
  //       message: 'Password is not correct!'
  //     });
  //     // Generate the JWT
  //     const token = jwt.sign(
  //       {
  //         id: user._id.toString(),
  //         isAdmin: user.isAdmin
  //       },
  //       process.env.JWT_SECRET_KEY,
  //       {
  //         expiresIn: '1d'
  //       }
  //     );
  //     res.status(200).json({
  //       message: 'User is logined successfully.',
  //       token,
  //       userId: user._id.toString(),
  //       isAdmin: user.isAdmin
  //     });
  //   })
  //   .catch(error => {
  //     res.status(500).json(error);
  //   });
};


module.exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "logout"
    })
  } catch (error) {
    res.status(500).json(error);
  }
  
}