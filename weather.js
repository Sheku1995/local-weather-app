let cityName = document.getElementById("city-name");
let displayDate = document.getElementById("date");
let temperatureValue = document.getElementById("temperature-value");
let feelLikes = document.getElementById("feels-like");
let humidityValue = document.getElementById("humidity-value");
let windSpeedValue = document.getElementById("wind-speed-value");
let visibilityValue = document.getElementById("visibility-value");
let pressureValue = document.getElementById("pressure-value");
let uvIndexValue = document.getElementById("uv-index-value");
let cityInput = document.getElementById("city-input");
let weatherDescription = document.getElementById("weather-description");
let weatherIcon = document.querySelector("#weather-info img"); // More specific selector
let apiKey = "d60ce01d42a60e68e1a9fe13e53ad2dd";
let weatherData = JSON.parse(localStorage.getItem("weatherData")) || [];

function fetchData(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},SL&appid=${apiKey}&units=metric`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        alert("City not found. Please try again.");
      }
      return response.json();
    })
    .then(data => {
      weatherData = [data]; // Only keep latest
      localStorage.setItem("weatherData", JSON.stringify(weatherData));
      displayWeatherData(data);
      fiveDaysForecast(city);
    })
    .catch(error => {
      return error;
    });
}

function displayWeatherData(data) {
  if (data) {
    cityName.textContent = data.name;
    temperatureValue.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    feelLikes.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    humidityValue.textContent = `${data.main.humidity}%`;
    windSpeedValue.textContent = `${data.wind.speed} m/s`;
    visibilityValue.textContent = `${data.visibility / 1000} km`;
    pressureValue.textContent = `${data.main.pressure} hPa`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    uvIndexValue.textContent = "N/A"; 
  }
  getCurrentDate();
}

function getCurrentDate() {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let dayName = days[today.getDay()];
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  displayDate.textContent = `${dayName} ${month}-${day}-${year}`;
}

let forecast = document.getElementById("forecast-cards");
function fiveDaysForecast(city) {
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},SL&appid=${apiKey}&units=metric`;
  fetch(forecastUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error fetching forecast data");
      }
      return response.json();
    })
    .then(data => {
      const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
      forecast.innerHTML = "";
      dailyForecasts.forEach(item => {
        let date = item.dt_txt.split(" ")[0];
        let iconUrl = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        forecast.innerHTML += `
          <div class="forecast-card">
            <p>${date}</p>
            <img src="${iconUrl}" alt="${item.weather[0].description}">
            <p>${Math.round(item.main.temp)}°C</p>
            <p>${item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}</p>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error("Error fetching forecast data:", error);
     // forecast.innerHTML = `<p style="text-align: center; font-size: 20px">Error fetching forecast data</p>`;
    });
}

// Initial load
fetchData("Freetown");

// Search button handler
document.getElementById("search-btn").addEventListener("click", function() {
  const city = cityInput.value.trim() || "Freetown";
  fetchData(city);
  cityInput.value = "";
});