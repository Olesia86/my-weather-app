let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let year = now.getFullYear();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["January", "Febriary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
h3.innerHTML = `${day} ${date} ${month}, ${year}`;
  

  function submitBtn(event) {
  event.preventDefault();
  let city = document.querySelector(".search-bar").value;
  search(city);
}
function search(city) {
  let apiKey = "49299905f177ecc5c9f1da6f89238e56";
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
  windElement.innerHTML = `wind speed: ${wind} mph`
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
}





let button = document.querySelector("#current-loc");
button.addEventListener("click", searchButton);
 
 search("London");