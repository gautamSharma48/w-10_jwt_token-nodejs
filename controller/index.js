const {
  userValidationSchema,
  loginValidationSchema,
} = require("../model/validateUser");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate user
    const { error } = userValidationSchema.validate(req.body);
    if (error) return res.status(401).json({ error: error.details[0].message });

    //check user already exist
    const emailExist = await User.findOne({ email: email });
    if (emailExist)
      return res.status(400).json({ msg: "user already exist" });

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create a new user

    const user = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    throw err;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginValidationSchema.validate(req.body);
    if (error) return res.status(401).json({ error: error.details[0].message });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({ msg: "please register with your email" });

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
      return res.status(401).json({ error: "password is not validate" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.header("auth-token", token).status(200).json({
      user: user._id,
      token: token,
    });
  } catch (err) {
    throw err;
  }
};

const validateUser = (req, res) => {
  res.send(req.user);
};

module.exports = {
  createUser,
  login,
  validateUser,
};
