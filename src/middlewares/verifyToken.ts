import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ msg: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { _id, name, email } = decoded as { _id: string; name: string; email: string };
    req.user = { _id, name, email };
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Not authorized to access this route' });
  }
};

export default verifyToken;
