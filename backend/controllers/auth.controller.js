const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register =  async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: 'User already exists' });

    const newUser =  await User.create({ email, password, name });
   

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).send({ token });
  } catch (error) {
    return res.status(500).send({ message: 'Server error',error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ message: 'Server error',error });
  }
};

module.exports = {register,login}