const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.get('/', async (req, res)=> {

    await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=33.30&lon=-111.84&units=imperial&appid=ff97ea3bdc0abd998fa94699ae7187cc')
    .then( (report) => {

    
        let weather = report.data;
        let sunrise = report.data.current.sunrise;
        let sunset = report.data.current.sunset;
        let todaySun =  new Date(sunrise * 1000);
        let todaySet =  new Date(sunset * 1000);
        let riseHours = todaySun.getHours();
        let riseMinutes = todaySun.getMinutes();
        let setHours = todaySet.getHours()-12;
        let setMinutes = todaySet.getMinutes();
        console.log(`today's sunrise is at: ${riseHours}:${riseMinutes}am`)
        
        let currentTime = Math.floor(new Date().getTime() / 1000);

       
        console.log(report.data.current.sunrise)
        console.log(report.data.current.sunset)

       

        let dayMode = (currentTime < sunset ) && (currentTime > sunrise);

        let currentId = weather.current.weather[0].id;

        let changeBgWeather = function(DayOrNight, weatherId) {
            console.log("It's working!", DayOrNight, weatherId)
            bgImage = DayOrNight ? "/img/clear.png" : "/img/clear-night.png" ;
            return bgImage;
        };

        

        changeBgWeather(dayMode, currentId);
        
       
      console.log(bgImage)
       
        
        res.render('index.ejs', { weather, bgImage, dayMode, riseHours, riseMinutes, setHours, setMinutes });

    
        console.log(report.data.current.sunrise)
    });
    

    
});





app.listen(3000, () =>{
    console.log('Listening on Port 3000');
})


