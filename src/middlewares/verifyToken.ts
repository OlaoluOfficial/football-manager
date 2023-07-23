import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
    }
    const decode = jwt.decode(token, { complete: true });
    console.log(decode);
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string, (err, verified) => {
      if (err) {
        console.log(err)
      }
    });
    console.log(decoded);
    if (!decoded) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Something went wrong while logging in' });
    }
    const { _id, name, email } = decoded as { _id: string; name: string; email: string };
    req.user = { _id, name, email };
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not authorized to access this route' });
  }
};

export default verifyToken;
