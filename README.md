# Weather Dashboard-challenge-wk-6

This week we were challenged with creating a Weather Dashboard. 

We were not supplied any starter code for this challenge. All we were given was a mockup of how it should look and some directions on how it should function. We were also supplied with the link to access the OpenWeather One Call API to use for our server-side API. 

Starting out there was a lot of console logs to be able to get the response from the server API and then finding out exactly which bit of information I needed to access at any given time to display on the page. Also had to read through the docs to figure out how the info would be displayed in order to be able to then use JavaScript to interpret that data and display it in a way that would be more user friendly. 

I also used Bootstrap CDN in order to help style the page and easily manipulate the grid layout. Helps immensely for styling new DOM elements and keeping things more responsive. 

## Usage

* Upon loading the page, the user will see a screen with the following:
    * Header that reads "Weather Dashboard" to alert the user what this tool will be used for.
    * A search box for the user to input a city that they would like to acess the weather for.
    * A box with information that displays the city name, the current date, current temperature, wind speed, humidity, and UV Index
    * A section that displays the next 5 days of the forecast

* The page will load with the city of "Austin" if this is the first time the user has used the page.   
* When the user types in a new city, the corresponding weather information will load in to their respective areas on screen. 
* That city will then be saved in to their local storage and displayed as a box for them to access again should they need to. 
* If the user refreshes the page, the last searched city will load on to the page for them. 
* The UV index will changed colors based on the number that is displayed:
    * green for a UV index less than 3
    * orange for a UV index between 3 and 6
    * red for a UV index over 6

* The user can clear their local storage history with the red "Clear History" button below the "Search" button. This will bring them back to default which will load "Austin".

*The 5 day forecast is going to display the temperature at a given time and not the average temp for that day. The only way to access that data was to upgrade the API key behind a paywall. 

<img src="https://media.giphy.com/media/DqmuC1C9pEW1BmV4jd/giphy.gif?cid=790b761148a2da7e9d66fa781a88cd2e169259b2c58c4620&rid=giphy.gif&ct=g">

## License
[MIT](https://choosealicense.com/licenses/mit/)
## Contact

Richard Martin - rmartin1985@att.net

Project Link: (https://rmartin1985.github.io/Weather-Dashboard/)

## Acknowledgements 

* Used the Bootstrap CDN for styling purposes (https://www.bootstrapcdn.com/)
* Used the OpenWeather Call API for accessing server side data (https://openweathermap.org/api/one-call-api)
