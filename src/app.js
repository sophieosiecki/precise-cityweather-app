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

function changeTheme(response) {
  let currentTemp = response.data.temperature.current;
  let container = document.querySelector("#container");

  if (currentTemp < 15) {
    document.body.classList.remove("warm");
    container.classList.remove("warm");
    document.body.classList.add("cool");
    container.classList.add("cool");
  } else {
    document.body.classList.remove("cool");
    container.classList.remove("cool");
    document.body.classList.add("warm");
    container.classList.add("warm");
  }
}

function changeIcon(response) {
  let iconUrl = response.data.condition.icon_url;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src ="${iconUrl}" />`;
  changeTheme(response);
}

function changeEmoji(response) {
  let emojiElement = document.querySelector("#emoji");
  let currentTemp = response.data.temperature.feels_like;
  if (currentTemp < 5) {
    emojiElement.innerHTML = "🥶";
  } else if (currentTemp < 24) {
    emojiElement.innerHTML = "😎";
  } else {
    emojiElement.innerHTML = "🥵";
  }
  changeIcon(response);
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
  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;
  changeEmoji(response);
}

function displayLastUpdate(response) {
  let lastUpdateElement = document.querySelector("#last-update-time");
  let timeStamp = response.data.time;
  let date = new Date(timeStamp * 1000);

  let dateString = date.toLocaleDateString();
  let timeString = date.toLocaleTimeString();
  let lastUpdateTimeAndDate = ` ${dateString} @ ${timeString}`;
  lastUpdateElement.innerHTML = lastUpdateTimeAndDate;
}

function handleError(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = "Check for typos...";
}

function displayCity(response) {
  let city = response.data.city;
  let country = response.data.country;
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  if (!city) {
    handleError(response);
  } else {
    cityElement.innerHTML = city;
    countryElement.innerHTML = country.toUpperCase();
    displayCurrentWeatherValues(response);
    displayLastUpdate(response);
  }
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
  getWeatherData(cityValue);
}

getWeatherData("Paris");
setInterval(updateDayAndTime, 1000);
updateDayAndTime();
let searchInputElement = document.querySelector("#form");

searchInputElement.addEventListener("submit", handleSearchInput);
