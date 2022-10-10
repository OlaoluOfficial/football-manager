import { Request, Response } from "express"

const getPlayers = async (req: Request, res: Response) => {
  res.status(200).json({msg: 'Players', user: req.user })
}

const getPlayer = async (req: Request, res: Response) => {
  res.status(200).json({msg: 'Player'})
}

export { getPlayers, getPlayer }
