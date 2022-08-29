import {Request, Response} from 'express';
import { StatusCodes  } from 'http-status-codes';

export const register = async (req: Request, res: Response) => {
  const data = req.body;
  res.status(StatusCodes.CREATED).json({msg: 'User created'})
}
export const login = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({msg: 'User Logged in'})
}
export const logout = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({msg: 'User Logged out'})
}