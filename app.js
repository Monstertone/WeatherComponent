const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.get('/', async (req, res)=> {

    await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=33.30&lon=-111.84&units=imperial&appid=ff97ea3bdc0abd998fa94699ae7187cc')
    .then( (report) => {

        // for (let i=0; i<5; i++){
        // let unixTime = report.data.daily[i].dt
        // let currentDate = new Date(unixTime * 1000);
        // let dayOfWeek = currentDate.toLocaleDateString('en-US', {weekday: 'long'});
        // let newDate = currentDate.toDateString().slice(0,10);
        // console.log(dayOfWeek)
        
    
        // console.log(newDate)
        // }

        // let weather = report.data.daily;
        let weather = report.data;

        res.render('index.ejs', { weather });

        // console.log(report.data.daily[0].temp.day);
        // console.log(report.data.daily)
        console.log(report.data.current.weather[0].main)
    });
    

    
});





app.listen(3000, () =>{
    console.log('Listening on Port 3000');
})


