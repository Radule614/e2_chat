const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
//Routers
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const homeRouter = require('./routes/homeRouter');
// Constants
const PORT = process.env.PORT;

//Database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true,})
.then((connected) => {
    console.log('Database connected')
})
.catch((err) => {
    console.log(err);
});
//Request settings

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);



//Starting server
http.listen(PORT, () => {
    console.log("Listening at " + PORT);
});


module.exports = io;

