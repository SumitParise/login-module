// Controller is concern for sepration of logics

const User = require("../schema/user");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    const u1 = await User.find();

    res.json(u1);
  } catch (err) {
    console.log("error occured " + err);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      res.json({ msg: "Email exist" });
    }

    const userCreate = await User.create({ username, email, phone, password });

    res.json({ userCreate, token: await userCreate.generateToken() });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email }); // check if user exist or not

    if (!userExist) {
      return res.json({ msg: "User not found" });
    }

    const user = bcrypt.compare(password,userExist.password);

    if(user){
      res.status(200).json({msg:"log in successful", userExist, token: await userExist.generateToken() });
    }else{
      res.status(500).json({ msg: "Invalid password" }); 
    }

  } catch (err) {
    next(err);
  }
};

module.exports = { home, register, login };
