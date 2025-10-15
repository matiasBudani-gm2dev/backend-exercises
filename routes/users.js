import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    console.log("Usuarios")
    res.send("Hay usuarios")
})

userRouter.get('/new', (req, res) => {
    console.log("Usuario nuevo")
    res.send("Usuario nuevo")
})

userRouter.post('/', (req, res) => {
    res.send("hola")
})

userRouter.get('/:id', (req, res) => {
    if(req.params.id !== Number(req.params.id).toString()){
        res.send(req.params.id, "no es un numero")
    } 
    else if(Number(req.params.id <= 0)){
        res.send("EL id debe ser mayor a 0")
    }
    else if(Number(req.params.id) % 1 !== 0){
        res.send("EL id debe ser positivo")
    }
    else {
        res.send(req.params.id)
    }
})

export default userRouter;
