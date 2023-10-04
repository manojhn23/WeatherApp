const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("windspeed");
const notfound = document.querySelector(".locationnotfound");
const weatherbody = document.querySelector(".weatherbody");

async function checkWeather(city) {
  city = city.trimRight();
  const api = "f86a9a7a86fe3fec4f762a64c42c5582";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  //   console.log(weather_data);

  if (weather_data.cod === `404`) {
    notfound.style.display = "flex";
    weatherbody.style.display = "none";
    return;
  }

  notfound.style.display = "none";
  weatherbody.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/Hr`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "./imgs/cloud.png";
      break;
    case "Clear":
      weather_img.src = "./imgs/clear.png";
      break;
    case "Rain":
      weather_img.src = "./imgs/rain.png";
      break;
    case "Mist":
      weather_img.src = "./imgs/mist.png";
      break;
    case "Snow":
      weather_img.src = "./imgs/snow.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
