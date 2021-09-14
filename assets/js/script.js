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
var forecastEl = document.querySelectorAll(".forecast");
var apiKey = "&appid=5ca80fae0ad046146aafb9af3b710993"

// variable to get the local storage info for saved cites
var cityHistory = JSON.parse(localStorage.getItem("search")) || [];

var loadPage = function () {
    // main function to display the weather info
    var getWeather = function (cityName) {
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial${apiKey}`;
        fetch(queryURL).then(function (response) {
            return response.json()
        })
            .then(function (response) {
                // convert date from UTC miliseconds to seconds 
                var currentDate = new Date(response.dt * 1000);
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                cityNameEl.innerHTML = response.name + ` ${month}/${day}/${year}`;
                // pull the weather pic from the API
                weatherPic = response.weather[0].icon;
                imgEl.setAttribute("src", `https://openweathermap.org/img/wn/${weatherPic}@2x.png`);
                imgEl.setAttribute("alt", response.weather[0].description);
                // need to convert the temperature to a kelvin number with a function later
                tempEl.innerHTML = `Temperature: ${Math.round(response.main.temp)}&#176F`;
                windEl.innerHTML = `Wind Speed: ${response.wind.speed} MPH`;
                humidityEl.innerHTML = `Humidity: ${response.main.humidity}%`;
                // need the latitude and longitude for the city in order to get the UV index per the Docs
                var latitude = response.coord.lat;
                var longitude = response.coord.lon;
                var uvQueryURL = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${latitude}&lon=${longitude}${apiKey}&cnt=1`;
                fetch(uvQueryURL).then(function (response) {
                    return response.json()
                })
                    .then(function (response) {
                        var uvIndex = document.createElement("span");
                        uvIndex.innerHTML = response[0].value;
                        uvEl.innerHTML = "UV Index: ";
                        uvEl.append(uvIndex);
                        // change the background color depending on the UV index number
                        if (response[0].value >= 6) {
                            uvIndex.setAttribute("class", "badge bg-danger text-light")
                        } else if (response[0].value < 6.00 && response[0].value >= 3.00) {
                            uvIndex.setAttribute("class", "badge bg-warning")
                        } else {
                            uvIndex.setAttribute("class", "badge bg-success text-light");
                        };
                    })
                var cityId = response.id;
                var fiveDayQuery = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=imperial${apiKey}`;
                fetch(fiveDayQuery).then(function (response) {
                    return response.json()
                })
                    .then(function (response) {
                        for (i = 0; i < forecastEl.length; i++) {
                            forecastEl[i].innerHTML = "";
                            // the five day forecast is given for every 3 hours. Need to have an equation to pick the right days
                            var fiveDayIndex = i * 8 + 5;
                            // this should check each day at the same specific time for each day's forecast 
                            var forecastDate = new Date(response.list[fiveDayIndex].dt * 1000);
                            var forecastDay = forecastDate.getDate();
                            // add 1 to the getMonth() function since it starts at 0 
                            var forecastMonth = forecastDate.getMonth() + 1;
                            var forecastYear = forecastDate.getFullYear();
                            var fiveDayEl = document.createElement("p");
                            fiveDayEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                            fiveDayEl.innerHTML = `${forecastMonth}/${forecastDay}/${forecastYear}`;
                            forecastEl[i].append(fiveDayEl);
                            var fiveDayImg = document.createElement("img");
                            fiveDayImg.setAttribute("src", `https://openweathermap.org/img/wn/${response.list[fiveDayIndex].weather[0].icon}@2x.png`);
                            fiveDayImg.setAttribute("alt", response.list[fiveDayIndex].weather[0].description);
                            forecastEl[i].append(fiveDayImg);
                            var fiveDayTemp = document.createElement("p");
                            fiveDayTemp.innerHTML = `Temp: ${Math.round(response.list[fiveDayIndex].main.temp)}&#176F`;
                            forecastEl[i].append(fiveDayTemp);
                            var fiveDayHumid = document.createElement("p");
                            fiveDayHumid.innerHTML = `Humidity: ${response.list[fiveDayIndex].main.humidity}%`;
                            forecastEl[i].append(fiveDayHumid);
                        }
                    })
            });
    };
    // function to convert Kelvin to Fahrenheit (thank you Google)
    // var k2f = function (K) {
    //     return Math.floor((K - 273.15) * 1.8 + 32);
    // }
    // grab info from the searched city and save to local storage
    searchBtnEl.addEventListener("click", function () {
        const searchTerm = inputEl.value;
        getWeather(searchTerm);
        cityHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(cityHistory));
        loadCityHistory();
    })

    // clear the local storage 
    clearBtnEl.addEventListener("click", function () {
        cityHistory = [];
        loadCityHistory();
    })

    var loadCityHistory = function () {
        historyEl.innerHTML = "";
        for (let i = 0; i < cityHistory.length; i++) {
            const historyItem = document.createElement("input");
            // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-grey");
            historyItem.setAttribute("value", cityHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    loadCityHistory();
    if (cityHistory.length > 0) {
        getWeather(cityHistory[cityHistory.length - 1]);
    }

}
loadPage();

