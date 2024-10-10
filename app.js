const apiKey = 'e8dc66dc90ed2e748522de87f1b158ad';

document.addEventListener('DOMContentLoaded', () => {
    // Default city
    const defaultCity = 'Dantewada';
    fetchWeatherData(defaultCity);
});

function getWeather() {
    const city = document.getElementById('cityInput').value;
    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => updateCurrentWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => updateForecast(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

function updateCurrentWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('currentTemp').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('currentCondition').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('airQuality').textContent = `Air Quality: Moderate`; // Placeholder
    document.getElementById('windSpeed').textContent = `Wind: ${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('thoughts').textContent = `Current weather in ${data.name} is ${data.weather[0].description}.`;

    // Update weather details
    document.getElementById('detailTemp').textContent = `${data.main.temp} °C`;
    document.getElementById('detailCloudiness').textContent = `${data.clouds.all}%`;
    document.getElementById('detailWind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('detailHumidity').textContent = `${data.main.humidity}%`;
}

function updateForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    data.list.forEach(item => {
        if (item.dt_txt.includes('12:00:00')) { // Only add forecast for 12 PM each day
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');
            forecastCard.innerHTML = `
                <h3>${new Date(item.dt_txt).toLocaleDateString()}</h3>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Forecast Icon">
                <p>Temp: ${item.main.temp} °C</p>
                <p>Condition: ${item.weather[0].description}</p>
            `;
            forecastContainer.appendChild(forecastCard);
        }
    });
}

// Set the playback speed of the background video to slow it down
const backgroundVideo = document.getElementById('backgroundVideo');
backgroundVideo.playbackRate = 0.5; // Set the speed to half of the normal speed



