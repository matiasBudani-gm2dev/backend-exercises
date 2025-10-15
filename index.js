import express from 'express';
import userRouter from './routes/users.js';
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index", {name: "Mundo"})
})


app.use('/users', userRouter)

app.listen(3000)