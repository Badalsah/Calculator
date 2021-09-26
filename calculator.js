const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//body-parse works with express
app.use(bodyParser.urlencoded({extended : true}));


app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html")
})
app.post('/', function(req, res){
    console.log(req.body.num1)
    var num1 = Number(req.body.num1)
    var num2 = Number(req.body.num2)
    var num3 = num1 + num2

    res.send('The result of the calculation is : ' + num3)
})

app.get('/bmicalculator', function(req, res){
    res.sendFile(__dirname + "/bmi.html")
})
app.post('/bmicalculator', function(req, res){
    console.log(req.body.wt)
    var wt = parseFloat(req.body.wt)
    var ht = parseFloat(req.body.ht)
    var bmi = (wt + ht)/2

    res.send("The BMI of the following person is : " + bmi)
})


app.listen(3000, function(){
    console.log('this server listens at localhost:3000')
})