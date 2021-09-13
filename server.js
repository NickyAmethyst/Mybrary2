if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


//import moduals/dependancies
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
//const ejs = require('ejs')
const indexRouter = require('./routs/index') // gets from module.exports = router comand

const app = express(); // creates an express aplication

app.set('view engine', 'ejs') // the ejs view engin converts JS to html
app.set('views', __dirname + '/views') // folder with server rendered views
app.set('layout', "layouts/layout")
app.use(expressLayouts)
app.use(express.static('public')) // folder with public views and js ... 

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Mongoose"))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)