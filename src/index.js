const express = require('express');
const morgan = require("morgan");
const cookieParser = require("cookie-parser")

//------ Config
const app = express()
require("dotenv").config()
app.use(cookieParser())
const PORT = process.env.PORT || 4000

//------ View Engine
app.set('views', __dirname + '/views');
app.set("view engine", "ejs")

//------ Middlewares
app.use(morgan('dev'));
app.use(express.static( __dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//------ Routes
app.use("/api" , require('./routes/api.routes'));
app.use("/" , require('./routes/index.routes'));

//------ Listen
app.listen(PORT,()=>{
    console.log("Servidor abierto en el puerto " + PORT) 
})