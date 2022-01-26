function fahrenheitDegrees(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#today-temp");
  fahrenheitTemperature.innerHTML = `68°`;
  let fahrenheitHigh = document.querySelector("#today-high");
  fahrenheitHigh.innerHTML = `High 70°`;
  let fahrenheitLow = document.querySelector("#today-low");
  fahrenheitLow.innerHTML = `Low 52°`;
  let fahrenheitFeel = document.querySelector("#feel-like");
  fahrenheitFeel.innerHTML = `Feels like 72°`;
}

function celsiusDegrees(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#today-temp");
  celsiusTemperature.innerHTML = `20°`;
  let celsiusHigh = document.querySelector("#today-high");
  celsiusHigh.innerHTML = `High 21°`;
  let celsiusLow = document.querySelector("#today-low");
  celsiusLow.innerHTML = `Low 11°`;
  let celsiusFeel = document.querySelector("#feel-like");
  celsiusFeel.innerHTML = `Feels like 22°`;
}

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

let fahrenheitButton = document.querySelector("#fahrenheit-switch");
fahrenheitButton.addEventListener("click", fahrenheitDegrees);

let celsiusButton = document.querySelector("#celsius-switch");
celsiusButton.addEventListener("click", celsiusDegrees);

function currentWeather(response) {
  console.log(response.data.main.temp_max);
  let cityResult = response.data.name;
  let resultCountry = response.data.sys.country;
  let temperature = Math.round(response.data.main.temp);
  let feelTemp = Math.round(response.data.main.feels_like);
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);

  let searchCityCountry = document.querySelector("#city-heading");
  searchCityCountry.innerHTML = `${cityResult}, ${resultCountry}`;

  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = `${temperature}°`;

  let feelLike = document.querySelector("#feel-like");
  feelLike.innerHTML = `Feels like ${feelTemp}°`;

  let high = document.querySelector("#today-high");
  high.innerHTML = `${currentHigh}°`;

  let low = document.querySelector("#today-low");
  low.innerHTML = `${currentLow}°`;

  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let apiKey = `8d6db36656a595a8f0c6f5ee19440b24`;
  let cityName = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", search);

function locationWeather(response) {
  let cityResult = response.data.name;
  let resultCountry = response.data.sys.country;
  let temperature = Math.round(response.data.main.temp);
  let feelTemp = Math.round(response.data.main.feels_like);
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);

  let searchCityCountry = document.querySelector("#city-heading");
  searchCityCountry.innerHTML = `${cityResult}, ${resultCountry}`;

  let currentTemp = document.querySelector("#today-temp");
  currentTemp.innerHTML = `${temperature}°`;

  let feelLike = document.querySelector("#feel-like");
  feelLike.innerHTML = `Feels like ${feelTemp}°`;

  let high = document.querySelector("#today-high");
  high.innerHTML = `${currentHigh}°`;

  let low = document.querySelector("#today-low");
  low.innerHTML = `${currentLow}°`;

  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
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
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", currentPosition);
