import express from 'express';
import cors from 'cors';
import userRouter from './routes/users.routes.js';
import {errorHandling, notFoundHandler}  from './middleware/errorHandler.js';

export function createApp(){
    const app = express();

    app.set('view engine', 'ejs');

    app.get('/', (req, res) => {
        res.json({
            message: 'API de usuarios - Ejercicio 2',
            version: '2.0',
            architecture: 'Routes → Repository + Model',
            })
    })

    app.use(express.json())

    app.use(cors())

    app.use('/users', userRouter)

    app.use(errorHandling)

    app.use(notFoundHandler)

    return app
}

export default createApp