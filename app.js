const express = require('express')
const app = express()
const api = require ('./api')
const morgan = require('morgan')  // logger
const bodyParser = require('body-parser')
const cors = require('cors')
const path=require('path');


app.set('port', (process.env.PORT || 8081))
/*if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }*/
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(cors())
 
app.use('/api', api)
app.use(express.static('static'))
 
app.use(morgan('dev'))
 
app.use(function (req, res){
    const err = new Error('Not Found')
    err.status = 404
    res.json(err)
})
 
// Mongo DB Connection
const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://cdb35:cdb35@cluster0.ytb4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true})
 
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Connected to MongoDB')
 
    app.listen(app.get('port'), function () {
        console.log('API Server Listening on port ' + app.get('port') + '!')
    })
})
