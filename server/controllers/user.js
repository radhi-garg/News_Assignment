const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validateEmail = require('../utils/validateEmail');
const { VALID_EMAIL, SOMETHING_WENT_WRONG, USER_ALREADY_EXISTS, USER_CREATED, USER_NOT_EXIST, INVALID_CREDENTIALS,
  LOGGED_IN, REQUEST_VALIDATION, REQUEST_VALIDATION_LOGIN } = require('../constants/constants');

const signUp = async (req, res) => {
  let { email, password, name } = req.body;

  if(!email || !password || !name) return res.status(400).json({ message: REQUEST_VALIDATION });

  try {
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) return res.status(400).json({ message: VALID_EMAIL });

    email = email.toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: USER_ALREADY_EXISTS });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: name,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRATION_TIME }
    );

    res.status(200).json({ message: USER_CREATED, token });
  } catch (e) {
    res.status(500).json({ message: e.toString() || SOMETHING_WENT_WRONG });
  }
};

const logIn = async (req, res) => {
  let { email, password } = req.body;

  if(!email || !password) return res.status(400).json({ message: REQUEST_VALIDATION_LOGIN });

  try {
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) return res.status(400).json({ message: VALID_EMAIL });

    email = email.toLowerCase();

    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: USER_NOT_EXIST });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: INVALID_CREDENTIALS });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRATION_TIME }
    );

    res.status(200).json({ message: LOGGED_IN, token });
  } catch (e) {
    res.status(500).json({ message: e.toString() || SOMETHING_WENT_WRONG });
  }
};

module.exports = { signUp, logIn };
