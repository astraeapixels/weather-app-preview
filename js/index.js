let now = new Date();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  "Friday",
  `Saturday`,
];

let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

let weekDay = document.querySelector("#week-day");
weekDay.innerHTML = `${day} <strong>${hours}:${minutes}</strong>`;

let month = months[now.getMonth()];
let dateOfMonth = now.getDate();
let year = now.getFullYear();

let currentDate = document.querySelector("#date-of-month");
let firstDate = document.querySelector("#first-date");
let lastDate = document.querySelector("#last-date");

let formattedDate = `${month} ${dateOfMonth}, ${year}`;
currentDate.innerHTML = `${formattedDate}`;

function futureDate(day) {
  var future = new Date();
  let month = future.getMonth();
  let year = future.getFullYear();

  var getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
  };

  let monthDaysNumber = getDaysInMonth(month, year);
  let newDate = future.setDate(future.getDate() + day);

  if (newDate > monthDaysNumber) {
    return future;
  }
}

let firstMonth = months[futureDate(1).getMonth()];
let firstDay = futureDate(1).getDate();

let lastMonth = months[futureDate(6).getMonth()];
let lastDay = futureDate(6).getDate();

let showFirst = `${firstMonth} ${firstDay}`;
let showLast = `${lastMonth} ${lastDay}`;

firstDate.innerHTML = `${showFirst}`;
lastDate.innerHTML = `${showLast}`;

let dayOfWeek = [
  `S`,
  `M`,
  `T`,
  `W`,
  `T`,
  `F`,
  `S`,
  `S`,
  `M`,
  `T`,
  `W`,
  `T`,
  `F`,
  `S`,
];

let dayOne = document.querySelector("#day-one");
dayOne.innerHTML = `${dayOfWeek[now.getDay() + 1]}`;

let dayTwo = document.querySelector("#day-two");
dayTwo.innerHTML = `${dayOfWeek[now.getDay() + 2]}`;

let dayThree = document.querySelector("#day-three");
dayThree.innerHTML = `${dayOfWeek[now.getDay() + 3]}`;

let dayFour = document.querySelector("#day-four");
dayFour.innerHTML = `${dayOfWeek[now.getDay() + 4]}`;

let dayFive = document.querySelector("#day-five");
dayFive.innerHTML = `${dayOfWeek[now.getDay() + 5]}`;

let daySix = document.querySelector("#day-six");
daySix.innerHTML = `${dayOfWeek[now.getDay() + 6]}`;

function temperature(response) {
  let LocationTemperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].main;

  console.log(response);
  console.log(response.data.wind);

  let showTemperature = document.querySelector("#temp-on-display");
  showTemperature.innerHTML = `${LocationTemperature}`;

  let showCity = document.querySelector("#location");
  showCity.innerHTML = `${city}`;

  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;

  let showWindSpeed = document.querySelector("#wind");
  showWindSpeed.innerHTML = `${windSpeed}`;

  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = `${description}`;
}

function searchCity(city) {
  let apiKey = `2a9813540ff06c7d508ac5d7caf18400`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(temperature);
}

function searchLocation(event) {
  event.preventDefault();
  let location = document.querySelector("#location");
  let input = document.querySelector("#user-input");

  let city = input.value;

  if (city) {
    location.innerHTML = `${city}`;
  } else {
    alert("type the name of a city");
  }
  searchCity(city);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchLocation);

function celsiusConverter(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#temp-on-display");
  farenheitTemp.innerHTML = `30`;
}

function farenheitConverter(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#temp-on-display");
  farenheitTemp.innerHTML = `86`;
}

let tempConversion = document.querySelector("#celsius");
tempConversion.addEventListener("click", celsiusConverter);

let conversionBack = document.querySelector("#fahrenheit");
conversionBack.addEventListener("click", farenheitConverter);

function showPosition(position) {
  console.log(position);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = `2a9813540ff06c7d508ac5d7caf18400`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(temperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity(`Los Angeles`);
