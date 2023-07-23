import { Router, Request, Response } from 'express';
import { register, login, logout } from '../controllers/auth';
import verifyToken from '../middlewares/verifyToken';
import { getPlayers, getPlayer } from '../controllers/players';

/* GET home page. */
const routes = (route: Router) => {
  route.get('/api/v1', (_req: Request, res: Response) => {
    res.json({ msg: 'Connected!' });
  });
  route.post('/api/v1/users/register', register);
  route.post('/api/v1/users/login', login);
  route.get('/api/v1/users/logout', verifyToken, logout);
  route.get('/api/v1/players', verifyToken, getPlayers);
  route.get('/api/v1/players/:id', verifyToken, getPlayer);
};

export default routes;
