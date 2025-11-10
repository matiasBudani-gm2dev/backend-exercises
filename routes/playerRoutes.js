import express from 'express';

const playersRouter = express.Router();

import { schemaReqValidation } from '../middleware/validation.js';
import { getAllPlayersInfo, getPlayerById, getPlayerByNick } from '../service/playersService.js';

playersRouter.get("/",async(req, res, next)=>{
    try{
        console.log("hola amigo entre aca jaja xd")
        const players = await getAllPlayersInfo()
        res.status(200).send(players)
    }catch(err){
        next(err)
    }
})

playersRouter.get("/id/:id", async(req, res, next)=>{
    try {
        const id = (Number(req.params.id))

        const playerResult = await getPlayerById(id);
        res.status(200).send(playerResult);
    } catch (err) {
        next(err);
    }
    
})


playersRouter.get("/nick/:nick", async(req, res, next)=>{
    try {
        const nick = req.params.nick
        const player = await getPlayerByNick(nick);
        res.status(200).send(player);
    } catch (err) {
        next(err);
    }
    
})


export default playersRouter
