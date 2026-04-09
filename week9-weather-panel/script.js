const weatherData = [
    {
        city: "New York",
        temperature: 72,
        condition: "Partly Cloudy",
        icon: "fa-cloud-sun",
        humidity: 65,
        wind: 12,
        type: "cloudy",
        image: "https://picsum.photos/seed/nyc/600/400"
    },
    {
        city: "Tokyo",
        temperature: 58,
        condition: "Rainy",
        icon: "fa-cloud-rain",
        humidity: 82,
        wind: 8,
        type: "rainy",
        image: "https://picsum.photos/seed/tokyo/600/400"
    },
    {
        city: "Paris",
        temperature: 65,
        condition: "Sunny",
        icon: "fa-sun",
        humidity: 48,
        wind: 6,
        type: "sunny",
        image: "https://picsum.photos/seed/paris/600/400"
    }
];

function renderWeather() {
    const grid = document.getElementById('weatherGrid');
    
    grid.innerHTML = weatherData.map(city => `
        <div class="weather-card ${city.type}">
            <img src="${city.image}" alt="${city.city}" class="weather-bg">
            <div class="weather-content">
                <div class="city-header ${city.type}">
                    <div class="city-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <span class="city-name">${city.city}</span>
                </div>
                
                <div class="weather-main">
                    <i class="fas ${city.icon} weather-icon"></i>
                    <div class="temperature">
                        ${city.temperature}<span>°F</span>
                    </div>
                </div>
                
                <p class="condition">${city.condition}</p>
                
                <div class="weather-details">
                    <div class="detail-item">
                        <i class="fas fa-tint"></i>
                        <span>${city.humidity}%</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-wind"></i>
                        <span>${city.wind} mph</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderWeather);
