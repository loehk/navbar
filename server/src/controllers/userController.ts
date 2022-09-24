import userModel from '../models/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const updatedUser = await userModel.updateOne({ email }, { password: hashedPassword });
      if (updatedUser) {
        res.status(200).json({ message: 'Password updated successfully' });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.log(err);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const deletedUser = await userModel.deleteOne({ email });
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.log(err);
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { email, username, profilePictureBase64 } = req.body;
  try {
    const user = await userModel.findOne({ email });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    if (user) {
      const updatedUser = await userModel.updateOne({ email }, { username, profilePictureBase64 });
      if (updatedUser) {
        res.status(200).json({ username: user.username, email: user.email, profilePictureBase64: user.profilePictureBase64, isAdmin: user.isAdmin, token });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.log(err);
  }
}

export const setAdmin = async (req: Request, res: Response) => {
  const { email, isAdmin } = req.params;
  try {
    const user = await userModel.findOne({ email });
    console.log(req.params);
    if (user) {
      const updatedUser = await userModel.updateOne({ email }, { isAdmin });
      if (updatedUser) {
        res.status(200).json({ message: 'Admin status updated successfully' });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.log(err);
  }
}