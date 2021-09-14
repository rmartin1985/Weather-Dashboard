function getWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=5ca80fae0ad046146aafb9af3b710993";
    fetch(queryURL).then(function(response) {
        return response.json()
    })
    .then(function (response) {
        console.log(response);
        var currentDate = new Date(response.dt*1000);
        console.log(currentDate);
        var day = currentDate.getDate();
        console.log(day);
        var month = currentDate.getMonth();
        console.log(month);
        var options = { month: 'long'};
        var realMonth = (new Intl.DateTimeFormat('en-US', options).format(currentDate));
        console.log(realMonth);
        console.log(currentDate.getFullYear());
    })}


getWeather();

