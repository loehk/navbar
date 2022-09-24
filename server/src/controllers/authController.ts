import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, profilePictureBase64 } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await userModel.create({
        username,
        email,
        profilePictureBase64,
        password: hashedPassword,
      });
      if (newUser) {
        res.status(201).json({ message: 'User created successfully' });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        if (process.env.JWT_SECRET) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);   
          return res         
          .cookie('session_token', token, {
            secure: false
          })
          .status(200).json({ username: user.username, email: user.email, profilePictureBase64: user.profilePictureBase64, isAdmin: user.isAdmin, token });
        } else {
          res.status(500).json({ message: 'Server error' });
        }
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('session_token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.log(err);
  }
};
