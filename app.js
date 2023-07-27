const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const authRouter = require('./app/api/auth/router');
const postingRouter = require('./app/api/posting/router');
const uploadRouter = require('./app/api/uploads/router');
const userRouter = require('./app/api/user/router');
const URL =  `/api/v1`

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${URL}`, authRouter);
app.use(`${URL}`, postingRouter);
app.use(`${URL}`, uploadRouter);
app.use(`${URL}`, userRouter);
app.get('/', (req, res)=>{
    res.json({message:  'Welcome to express backend'});
});



module.exports = app;
