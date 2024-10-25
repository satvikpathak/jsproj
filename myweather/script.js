document.addEventListener("DOMContentLoaded", ()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
  
    const API_KEY = '817f9c08f0cf8753dc8d3abe3d4b7452';

    getWeatherBtn.addEventListener('click',async () =>{
        const city = cityInput.value.trim();
         if(!city) return;

            try {
              const weatherData =  await fetchWeatherData(city);
              displayWeatherData(weatherData);
            } catch (error) {
                showError();
            }

        });
       async function fetchWeatherData(city){
            //fetch
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            if(!response.ok) throw new Error('City not found');
            const data = await response.json(); // it become a proper JSON object
            return data;
        }
        function displayWeatherData(data){
            //display weather data
            console.log(data);
            const {name, main, weather} = data
            cityNameDisplay.textContent = name;
            temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
            descriptionDisplay.textContent = `weather: ${weather[0].description}`;
            weatherInfo.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        }
        function showError(message){
            weatherInfo.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    
    
});