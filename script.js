const apiKey = '7e3f21edee540e6110af347b55eb1ab2';

document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

function getWeather() {
    const cityName = document.getElementById('search-input').value;

    if (cityName.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {

    if (data.cod === '404') {
        alert('City not found. Please try again.');
        return;
    }


    let city = document.querySelector(".city")
    city.innerText = `${data.name}, ${data.sys.country}`;
    let date = document.querySelector(".date")
    let currentDate = new Date();
    date.innerText = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let temp = document.querySelector(".temp")
    temp.innerText = `${Math.round(data.main.temp)}°C`;
    let weather = document.querySelector(".weather")
    weather.innerText = `${data.weather[0].description}`;
    let minmax = document.querySelector(".min-max")
    minmax.innerText = `${Math.round(data.main.temp_min)}°C/${Math.round(data.main.temp_max)}°C`;


}
