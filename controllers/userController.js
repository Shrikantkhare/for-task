// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Instructor = require('../models/Instructor');
const { generateToken } = require('../utils/auth');

const register =async (req, res) => {
    const { name, password,role,email } = req.body;
    try {
      const user = await Instructor.findOne({ email });
      if (user) return res.status(400).json({ error: 'User already exist' });
      const convertpass = await bcrypt.hash(password, 10)
      const createUser = await Instructor.create({name, password:convertpass,role,email}) 
     if(createUser){
        return res.status(201).json({ message: 'User create successfully' });
     }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const login =async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Instructor.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
console.log(user,"hfhfh",password)
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    const token = generateToken(user._id, user.role);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    register,
    login
  };
