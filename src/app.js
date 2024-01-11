function changeEmoji(response) {
  let emojiElement = document.querySelector("#emoji");
}

function getDayName(dayIndex) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
}
function updateDayAndTime() {
  let now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  let dayIndex = now.getDay();
  let dayName = getDayName(dayIndex);

  let timeString = `${hours}:${minutes}:${seconds}`;
  let dayString = `${dayName}`;

  let currentTimeElement = document.querySelector("#time");
  let currentDayElement = document.getElementById("day");
  currentTimeElement.innerHTML = timeString;
  currentDayElement.innerHTML = dayString;
}
function displayCurrentWeatherValues(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  let currentTemperature = response.data.temperature.current;
  currentTemperatureElement.innerHTML = currentTemperature;
  let feelsLikeTempElement = document.querySelector("#feels-like-temperature");
  feelsLikeTemp = response.data.temperature.feels_like;
  feelsLikeTempElement.innerHTML = feelsLikeTemp;
  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = windSpeed;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = humidity;
  changeEmoji(response);
}

function displayCity(response) {
  let city = response.data.city;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
  displayCurrentWeatherValues(response);
}
function getWeatherData(cityValue) {
  let apiKey = "044f639212f8b63toca06640b723a6aa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}`;
  axios.get(apiUrl).then(displayCity);
}
function handleSearchInput(event) {
  event.preventDefault();

  let cityElementInput = document.querySelector("#city-input");
  let cityValue = cityElementInput.value;
  // HEADING CHANGE let headingElement = document.querySelector("#city");
  // HEADING CHANGE headingElement.innerHTML = "Have I got this?";
  getWeatherData(cityValue);
}

getWeatherData("Paris");
setInterval(updateDayAndTime, 1000);
updateDayAndTime();
let searchInputElement = document.querySelector("#form");

searchInputElement.addEventListener("submit", handleSearchInput);
