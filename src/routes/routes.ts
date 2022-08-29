import {Router, Request, Response} from 'express';
import { register, login, logout } from '../controllers/auth'

/* GET home page. */
const routes = (route: Router) => {
  route.get('/api/v1',(req: Request, res: Response) => {
    res.json({msg: 'Connected!'})
  })
  route.post('/api/v1/users/register', register)
  route.post('/api/v1/users/login', login)
  route.get('/api/v1/users/logout', logout)
}

export default routes;
