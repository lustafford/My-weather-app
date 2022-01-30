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

window.onload = function () {
  locationWeather();
  console.log("testing");
};

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
}

function search(event) {
  event.preventDefault();
  let apiKey = `8d6db36656a595a8f0c6f5ee19440b24`;
  let cityName = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
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

function fahrenheitDegrees(event) {
  event.preventDefault();
  let fahrenheitTemperature = (degreesCelsius * 9) / 5 + 32;
  let currentFahrenheit = Math.round(fahrenheitTemperature);
  let currentTemperature = document.querySelector("#today-temp");
  currentTemperature.innerHTML = `${currentFahrenheit}°`;

  let fahrenheitHigh = (degreesHigh * 9) / 5 + 32;
  let fahHigh = Math.round(fahrenheitHigh);
  let currentHigh = document.querySelector("#today-high");
  currentHigh.innerHTML = ` | ${fahHigh}°`;

  let fahrenheitLow = (degreesLow * 9) / 5 + 32;
  let fahLow = Math.round(fahrenheitLow);
  let currentLow = document.querySelector("#today-low");
  currentLow.innerHTML = `${fahLow}° | `;

  let fahrenheitFeel = (degreesFeel * 9) / 5 + 32;
  let fahFeel = Math.round(fahrenheitFeel);
  let currentFeel = document.querySelector("#feel-like");
  currentFeel.innerHTML = `Feels like ${fahFeel}°`;
}

function celsiusDegrees(event) {
  event.preventDefault();
  let celsiusTemperature = Math.round(degreesCelsius);
  let currentCelsius = document.querySelector("#today-temp");
  currentCelsius.innerHTML = `${celsiusTemperature}°`;
  let celsiusHigh = Math.round(degreesHigh);
  let topCelsius = document.querySelector("#today-high");
  topCelsius.innerHTML = ` | ${celsiusHigh}°`;
  let celsiusLow = Math.round(degreesLow);
  let bottomCelsius = document.querySelector("#today-low");
  bottomCelsius.innerHTML = `${celsiusLow}° | `;
  let celsiusFeel = Math.round(degreesFeel);
  let feelsLikeCelsius = document.querySelector("#feel-like");
  feelsLikeCelsius.innerHTML = `Feels like ${celsiusFeel}°`;
}
let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", search);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", currentPosition);

let degreesCelsius = null;
let degreesHigh = null;
let degreesLow = null;
let degreesFeel = null;

let fahrenheitButton = document.querySelector("#fahrenheit-switch");
fahrenheitButton.addEventListener("click", fahrenheitDegrees);

let celsiusButton = document.querySelector("#celsius-switch");
celsiusButton.addEventListener("click", celsiusDegrees);
