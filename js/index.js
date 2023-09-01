let now = new Date();

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    "Friday",
    `Saturday`,
  ];
  let day = days[date.getDay()];
  return `${day} <strong>${hours}:${minutes}</strong>`;
}

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
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let dateElement = formatDate(response.data.dt * 1000);
  fahrenheitTemperature = response.data.main.temp;
  windSpeed = response.data.wind.speed;

  console.log(response);
  console.log(response.data.wind);

  let showTemperature = document.querySelector("#temp-on-display");
  showTemperature.innerHTML = Math.round(fahrenheitTemperature);

  let showCity = document.querySelector("#location");
  showCity.innerHTML = `${city}`;

  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity}`;

  let showWindSpeed = document.querySelector("#wind");
  showWindSpeed.innerHTML = Math.round(windSpeed);

  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = `${description}`;

  let showIcon = document.querySelector("#main-icon");
  showIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  showIcon.setAttribute("alt", response.data.weather[0].description);

  let showDate = document.querySelector("#week-day");
  showDate.innerHTML = `${dateElement}`;
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
  let celciusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  let celsiusWind = windSpeed * 1.609344;

  let showCelsiusTemp = document.querySelector("#temp-on-display");
  showCelsiusTemp.innerHTML = `${Math.round(celciusTemperature)}`;

  let showCelsiusWind = document.querySelector("#wind");
  showCelsiusWind.innerHTML = `${Math.round(celsiusWind)}`;

  let celsiusspeedMetric = document.querySelector("#speed-metric");
  celsiusspeedMetric.innerHTML = `km/h`;

  let celsiusMainUnit = document.querySelector("#fahrenheit");
  celsiusMainUnit.innerHTML = `C`;
  let fahrenheitSmallUnit = document.querySelector("#celsius");
  fahrenheitSmallUnit.innerHTML = `F`;
}

function fahrenheitConverter(event) {
  event.preventDefault();
  let showFahrenheitTemp = document.querySelector("#temp-on-display");
  showFahrenheitTemp.innerHTML = Math.round(fahrenheitTemperature);

  let showCelsiusWind = document.querySelector("#wind");
  showCelsiusWind.innerHTML = `${Math.round(windSpeed)}`;

  let celsiusspeedMetric = document.querySelector("#speed-metric");
  celsiusspeedMetric.innerHTML = `m/h`;

  let fahrenheitMainUnit = document.querySelector("#fahrenheit");
  fahrenheitMainUnit.innerHTML = `F`;
  let celsiusSmallUnit = document.querySelector("#celsius");
  celsiusSmallUnit.innerHTML = `C`;
}

let tempConversion = document.querySelector("#celsius");
tempConversion.addEventListener("click", celsiusConverter);

let conversionBack = document.querySelector("#fahrenheit");
conversionBack.addEventListener("click", fahrenheitConverter);

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

let fahrenheitTemperature = null;
let windSpeed = null;

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity(`Los Angeles`);
