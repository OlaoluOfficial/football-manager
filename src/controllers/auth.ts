import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, age, country } = req.body;
    let { password } = req.body;
    if (!name || !email || !age || !country || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide all fields' });
    }
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, age, country, password });
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log(error)
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: 'User Logged out' });
};
