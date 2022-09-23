import userModel from '../models/userModel';
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};
