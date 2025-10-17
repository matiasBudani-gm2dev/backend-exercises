import express from 'express';
import userRouter from './routes/users.routes.js';
import errorHandling  from './middleware/errorHandling.js';

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

    app.use('/users', userRouter)

    app.use(errorHandling)

    return app
}

export default createApp