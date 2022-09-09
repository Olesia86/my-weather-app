let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let year = now.getFullYear();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["January", "Febriary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
h3.innerHTML = `${day} ${date} ${month}, ${year}`;

function showForecast(response) {
  let forecast = response.main.hourly;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
  forecastHTML = forecastHTML + `
  <div class="col-2">
  <div class="card-body">
  <h6 class="card-title">${forecast.dt}</h6>
  <p class="temp">${forecast.temp}°C</p>
  <img src="https://openweathermap.org/img/wn/${response.main.weather[0].icon}@2x.png/>"
  alt=""
  width="50"/>
    </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML)
}
function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858"
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
 }

 function submitBtn(event) {
  event.preventDefault();
  let city = document.querySelector(".search-bar").value;
  search(city);
}
function search(city) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let searchForm = document.querySelector("button");
searchForm.addEventListener("click", submitBtn);

function showWeather(response) {
 let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let temperatureDescription = document.querySelector(".description");
  let temperatureElement = document.querySelector("h5");
  temperatureElement.innerHTML = `${temperature}°C`
  temperatureDescription.innerHTML = `${description}`
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `Wind speed: ${wind} mph`
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
search("London");
showForecast();
