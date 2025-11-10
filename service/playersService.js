import {createError} from "../utils/createError.js"

import { findAllPlayers, findPlayerById, findPlayerByNick } from "../repository/PlayersRepository.js"

export async function getAllPlayersInfo(){
    const playersResult = await findAllPlayers()
    const players = []
    playersResult.forEach(player=>{
        players.push(player.dataValues)
    })
    return players
}

export async function getPlayerById(id){
    if(Number.isNaN(id)){
        throw createError(400, "Bad request", "The id has to be a number")
    }

    const playerResult = await findPlayerById(id)
    if(!playerResult){
        console.log("entre aca")
        throw createError(404, "Not found", "Player not found")
    }

    const player = playerResult.dataValues

    return player
}

export async function getPlayerByNick(nick){

    const nickFilter = {"nick": nick}

    const playerResult = await findPlayerByNick(nickFilter)
    console.log(playerResult)

    if(!playerResult){
        throw createError(404, "Not found", "Player not found")
    }
    const player = playerResult.dataValues

    return player
}
