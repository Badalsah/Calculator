const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended : true}))


app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', function(req, res){
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email

})

app.listen(3000, function(){
    console.log('Executed')
})
