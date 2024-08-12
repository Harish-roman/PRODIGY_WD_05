const form = document.getElementById('locationForm');
    const input =document.getElementById('locationInput');
    const clear = document.querySelector(".clearbutton");
    const weatherDiv = document.getElementById('weather');
    const icon=document.getElementById("icon__button");
    const apiKey = '9808560bc33615a7a3e78fd222de6239'; 
    const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const location = document.getElementById('locationInput').value;
        fetchWeatherData(location);
    });

   

    function fetchWeatherData(location) {
        const url = `${weatherEndpoint}?q=${location}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const { name, main, weather } = data;
                    const { temp, humidity } = main;
                    const { description, icon } = weather[0];

                    const weatherInfo = `
                        <h2 class="city__name">${name}</h2>
                        <img class ="weather__icon" src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                        <p class="weather__description bottom">${description}</p>
                        <p class="weather__temperature bottom">Temperature: ${temp}Â°C</p>
                        <p class="weather__humidity bottom">Humidity: ${humidity}%</p>
                    `;
                    
                    weatherDiv.innerHTML = weatherInfo;
                    
                } else {
                    weatherDiv.innerHTML = '<p class="city__notfound">Location not found. Please try again.</p>';
                   
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherDiv.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
               
            });
    }
