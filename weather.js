const city = document.getElementById("city-name");
const weatherIcon = document.getElementById("icon");
const temp = document.getElementById("temp");
const descr = document.getElementById("description");
const wind = document.getElementById("wind");
const humid = document.getElementById("humid");
const long = document.getElementById("lon");
const lati = document.getElementById("lat");
const searchBtn = document.getElementById("search-btn");
const dataContainer = document.getElementById("data-container");

searchBtn.addEventListener("click", ()=>{
    
 const cityInput = document.getElementById("city-input");
  const cities = cityInput.value.trim().toLowerCase();
 let apiKey = "d60ce01d42a60e68e1a9fe13e53ad2dd";
 let url = `https://api.openweathermap.org/data/2.5/weather?q=${cities},SL&appid=${apiKey}&units=metric`;
  
 if(!cities){
   alert("Please type in the name of the city!")
 }
  
   fetch(url)
.then(res => res.json())
.then(data => {
  const cityName = data.name;
  const icon= data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const windSpeed = data.wind.speed;
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const lat = data.coord.lat;
  const lon = data.coord.lon;
          
    city.textContent = cityName;
    weatherIcon.innerHTML = `
    <img src="${iconUrl}" alt="Icon">
    `
    temp.textContent = `${temperature.toFixed(0)}°C`;
    descr.textContent = weatherDescription;
    wind.textContent = `${windSpeed}m/s`;
    humid.textContent = `${humidity}%`;
    long.textContent = lon;
    lati.textContent = lat;
});
  cityInput.value = "";

});


function updateDateTime() {
  const now = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  

  const formatted = now.toLocaleString('en-US', options);

  document.getElementById('date-time').textContent = formatted;
}

// Update every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Fetch and display the weather data for the default city on page load
function fetchDefaultWeather(){
  
  const defaultCity = "freetown";
  let apiKey = "d60ce01d42a60e68e1a9fe13e53ad2dd";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity},SL&appid=${apiKey}&units=metric`;
   
   
  fetch(url)
 .then(res => res.json())
 .then(data => {
   const cityName = data.name;
   const icon= data.weather[0].icon;
   const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
   const windSpeed = data.wind.speed;
   const weatherDescription = data.weather[0].description;
   const temperature = data.main.temp;
   const humidity = data.main.humidity;
   const lat = data.coord.lat;
   const lon = data.coord.lon;
           
     city.textContent = cityName
     weatherIcon.innerHTML = `
     <img src="${iconUrl}" alt="Icon">
     `
     temp.textContent = `${temperature.toFixed(0)}°C`;
     descr.textContent = weatherDescription;
     wind.textContent = `${windSpeed}m/s`;
     humid.textContent = `${humidity}%`;
     long.textContent = lon;
     lati.textContent = lat;
     
 });

};

fetchDefaultWeather();
