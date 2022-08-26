import {Router, Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';

/* GET home page. */
const routes = (route: Router) => {
  route.get('/api/v1',(req: Request, res: Response) => {
    res.json({msg: 'Connected!'})
  })
}

export default routes;
