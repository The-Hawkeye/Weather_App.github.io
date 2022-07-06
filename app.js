const weatherApi = {
    key: "b1bac58531f9171a352beae496bc5155",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keyPress

searchInputBox.addEventListener('keypress', (event) => {

    if(event.keyCode == 13 ) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display="block";
    }
});

// Get weather report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}


// Show weather Report

function showWeatherReport(weather) {
     console.log(weather); 

     let city=document.getElementById('city');
     city.innerText= `${weather.name}, ${weather.sys.country}`;

     let temperature= document.getElementById('temp');
     temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

     let minMaxTemp = document.getElementById('min-max');
     minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

     let weatherType = document.getElementById('weather');
     weatherType.innerText = `${weather.weather[0].main}`;

     let date = document.getElementById('date'); 
     let todayDate = new Date();
     date.innerText= dateManage(todayDate);


     if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage="url(images/sunny.jpeg)";
     }

     else if(weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage="url(images/haze.jpeg)";
     }

     else if(weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage="url(images/cloudy.jpeg)";
     }
     else if(weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage="url(images/rainy.jpeg)";
     }
     else if(weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage="url(images/snow.jpeg)";
     }

     else if(weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage="url(images/thunderstorm.jpeg)";
     }
}


// Date Mange
// function to display only required data
function dateManage(dateArg) {
 

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} ${day} ${year}`;
}


// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
 