// global variables 
var inputEl = document.querySelector("#city-input");
var searchBtnEl = document.querySelector("#search-button");
var clearBtnEl = document.querySelector("#clear-history");
var cityNameEl = document.querySelector("#city-name");
var imgEl = document.querySelector("#current-pic");
var tempEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind-speed");
var uvEl = document.querySelector("#UV-index");
var historyEl = document.querySelector("#history");
var apiKey = "&appid=5ca80fae0ad046146aafb9af3b710993"

// variable to get the local storage info for saved cites
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];


var getWeather = function (cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=Austin${apiKey}`;
    fetch(queryURL).then(function (response) {
        return response.json()
    })
        .then(function (response) {
            console.log(response);
            var currentDate = new Date(response.dt * 1000);
            console.log(currentDate);
            var day = currentDate.getDate();
            console.log(day);
            var month = currentDate.getMonth();
            console.log(month);
            var monthLong = { month: 'long' };
            var realMonth = (new Intl.DateTimeFormat('en-US', monthLong).format(currentDate));
            console.log(realMonth);
            var year = currentDate.getFullYear();
            console.log(year);
            cityNameEl.innerHTML = response.name + ` ${realMonth} ${day} ${year}`;
            weatherPic = response.weather[0].icon;
            imgEl.setAttribute("src", `https://openweathermap.org/img/wn/${weatherPic}@2x.png`);
            imgEl.setAttribute("alt", response.weather[0].description);
            // tempEl.innerHTML = `Temperature: ${k2f(response.data.main.temp)}&#176F`;
            humidityEl.innerHTML = `Humidity: ${response.main.humidity}%`;
            windEl.innerHTML = `Wind Speed: ${response.wind.speed}MPH`;
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            var uvQueryURL = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${latitude}&lon=${longitude}${apiKey}&cnt=1`;
            fetch(uvQueryURL).then(function (response) {
                return response.json()
            })
                .then(function (response) {
                    console.log(response[0].value);
                    var uvIndex = document.createElement("span");
                    uvIndex.innerHTML = response[0].value;
                    uvEl.innerHTML = "UV Index: ";
                    uvEl.append(uvIndex);
                    if (response[0].value >= 6) {
                        uvIndex.setAttribute("class", "badge bg-danger text-light")
                    } else if (response[0].value < 6.00 && response[0].value >= 3.00) {
                        uvIndex.setAttribute("class", "badge bg-warning")
                    } else {
                        uvIndex.setAttribute("class", "badge bg-success text-light");
                    };
                })
            var cityId = response.id;
            console.log(cityId);
        })
};


getWeather();

