import express from 'express';
import cors from 'cors';
import userRouter from './routes/UsersRoutes.js';
import roleRouter from './routes/RoleRoutes.js';
import userRolesRouter from './routes/UsersRolesRoutes.js';
import {errorHandling, notFoundHandler}  from './middleware/ErrorHandler.js';

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

    app.use("/roles", roleRouter)

    app.use("/users-roles", userRolesRouter)

    app.use(notFoundHandler)
    
    app.use(errorHandling)

    return app
}

export default createApp