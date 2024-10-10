const apiKey = 'aa5bd7e170b6f83179e1b67f2cf09308'; 

async function getWeather() {
    const city = document.getElementById('city-input').value; // Default city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    
    if (response.ok && forecastResponse.ok) {
        const data = await response.json();
        const forecastData = await forecastResponse.json();
        console.log(data);
        
        
        // Update current weather
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('weather').textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Update 5-day forecast
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ''; // Clear previous forecast
        for (let i = 0; i < forecastData.list.length; i += 8) { // API returns 3-hour intervals; 8 intervals per day
            const day = forecastData.list[i];
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            forecastDay.innerHTML = `
                <p>${new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon">
                <p>Temp: ${day.main.temp}°C</p>
                <p>Humidity: ${day.main.humidity}%</p>
                <p>Wind Speed: ${day.wind.speed} m/s</p>
                <p>${day.weather[0].description}</p>
            `;
            forecastContainer.appendChild(forecastDay);
        }
    } else {
        alert('City not found! Please enter a valid city name.');
    }
}

window.onload = () => {
    getWeather(); // Default weather on load
};