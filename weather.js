const express = require('express')
const { read } = require('fs')
const https = require('https')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended : true}));


app.get('/', function(req, res){

    // make a variable to just to store url
    var apiurl = "https://samples.openweathermap.org/data/2.5/weather?q=London&appid=d0434c226c04fa6e216dd22a29a6b525"
    https.get(apiurl, function(response){
        console.log(response.statusCode)// this means we just want to know the statusCode 

        // we call a method '.on' 
        response.on('data', function(data){
            // console.log(data) // we get some hexadecimal as ouput (running this command)
            // we need to get the data in human readable format.(i.e. conveting it to a javascript object)
            // For that we use JSON Parse
            const weatherdata = JSON.parse(data)//it will turn data into an actual js object
            console.log(weatherdata)

            // we can also go other way around(ie convert JSON object to sting)
            // For example
            const object = {
                name : "Prajwal",
                age : 43,
                occupation : "Student"
            }
            // to convert it into string we use function JSON.stringify()
            console.log(JSON.stringify(object)) // it will convert the oject to string
            // Now we want specific data from the api data
            const icon = weatherdata.weather[0].icon
            // now get the image url from the website
            const imageUrl = "http://openweathermap.org/img/wn/" + icon+ "@2x.png"

            const city = weatherdata.name
            const temp =weatherdata.main.temp
            const wind = weatherdata.wind.speed
            res.write("<h1>The City, temp, and wind is " + " |" + city + " <br>|" + temp + " |" + wind + "</h1>")
            // we r getting error because we can only use one "res" method to render data to website
            // BUT what if we want to send two file
            // we can only use res.send() one time
            // But we can send res.write() multiple time
            res.write("<h1>The City, temp, and wind is " + " |" + city + " <br>|" + temp + " |" + wind + "</h1>")
            res.write("<img src=" +imageUrl +"> ")
            res.send()
        })
    })   
    //res.send('The Weather of this particular citry is : ' )
})

// -------------------------------------------------------------
app.get('/we', function(req, res){
    res.sendFile(__dirname + '/weather.html')
})
app.post('/we', function(req,res){
    const city = req.body.city
    var apiurl = "https://samples.openweathermap.org/data/2.5/weather?q=" + city +"&appid=d0434c226c04fa6e216dd22a29a6b525"
    https.get(apiurl, function(response){
        response.on('data',function(data){
            const weatherdata1 = JSON.parse(data)
            const temp1 = weatherdata1.main.temp
            res.send('The temperature of ' + city + "is" +temp1 )
        })
    })
})
//------------------------------------------------
app.get('/mail', function(req, res){
    res.sendFile(__dirname + '/mail.html')
})
app.post('/mail', function(req, res){
    const name = req.body.name
    const lastname = req.body.lastname
    const email = req.body.email

    
})








app.listen(3000, function(){
    console.log('Program Executed')
})