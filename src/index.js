let currentDate = new Date();
let day = currentDate.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let fullDay = days[currentDate.getDay()];
let date = currentDate.getDate();
let month = currentDate.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let fullMonth = months[currentDate.getMonth()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}
let h1 = document.querySelector("h1");

h1.innerHTML = `${fullDay}, ${date} ${fullMonth}, ${hours}.${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let weeklyForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7)
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
              <div class ="forecast-date">${formatDate(forecastDay.dt)}</div>
              <br />
              <div class = "forecast-temperatures" >
                <span class = "forecast-min">${Math.round(
                  forecastDay.temp.max
                )}°</span> | 
                <span class="forcast-max">${Math.round(
                  forecastDay.temp.min
                )}°</span></div>
         </div>
       `;
  });
  forecastHTML = forecastHTML + `</div>`;
  weeklyForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `8d6db36656a595a8f0c6f5ee19440b24`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentWeather(response) {
  let cityResult = response.data.name;
  let resultCountry = response.data.sys.country;
  let temperature = Math.round(response.data.main.temp);
  let feelTemp = Math.round(response.data.main.feels_like);
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#icon");

  degreesCelsius = Math.round(response.data.main.temp);
  degreesHigh = Math.round(response.data.main.temp_max);
  degreesLow = Math.round(response.data.main.temp_min);
  degreesFeel = Math.round(response.data.main.feels_like);

  let searchCityCountry = document.querySelector("#city-heading");
  searchCityCountry.innerHTML = `${cityResult}, ${resultCountry}`;

  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = `${temperature}°`;

  let feelLike = document.querySelector("#feel-like");
  feelLike.innerHTML = `Feels like ${feelTemp}°`;

  let high = document.querySelector("#today-high");
  high.innerHTML = ` | ${currentHigh}°`;

  let low = document.querySelector("#today-low");
  low.innerHTML = `${currentLow}° | `;

  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed}km/h`;

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = `8d6db36656a595a8f0c6f5ee19440b24`;
  let cityName = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}

function currentPositionForecast(coordinates) {
  let apiKey = `8d6db36656a595a8f0c6f5ee19440b24`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function locationWeather(response) {
  let cityResult = response.data.name;
  let resultCountry = response.data.sys.country;
  let temperature = Math.round(response.data.main.temp);
  let feelTemp = Math.round(response.data.main.feels_like);
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#icon");

  degreesCelsius = Math.round(response.data.main.temp);
  degreesHigh = Math.round(response.data.main.temp_max);
  degreesLow = Math.round(response.data.main.temp_min);
  degreesFeel = Math.round(response.data.main.feels_like);

  let searchCityCountry = document.querySelector("#city-heading");
  searchCityCountry.innerHTML = `${cityResult}, ${resultCountry}`;

  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = `${temperature}°`;

  let feelLike = document.querySelector("#feel-like");
  feelLike.innerHTML = `Feels like ${feelTemp}°`;

  let high = document.querySelector("#today-high");
  high.innerHTML = ` | ${currentHigh}°`;

  let low = document.querySelector("#today-low");
  low.innerHTML = `${currentLow}° | `;

  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed}km/h`;

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentPositionForecast(response.data.coord);
}

function showPosition(position) {
  let apiKey = `8d6db36656a595a8f0c6f5ee19440b24`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlLongLat = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlLongLat).then(locationWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", search);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", currentPosition);
