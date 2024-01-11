function handleSearchInput(event) {
  event.preventDefault();

  let apiKey = "044f639212f8b63toca06640b723a6aa";
  let cityElementInput = document.querySelector("#city-input");
  let cityValue = cityElementInput.value;
  console.log(cityValue);
  let headingElement = document.querySelector("#city");
  // headingElement.innerHTML = "Have I got this?";
}

let searchInputElement = document.querySelector("#form");

searchInputElement.addEventListener("submit", handleSearchInput);
