$(document).ready(function () {
  const apiKey = "10a522f9d8216f7c5d46d3a3132e73b0";
  const forecastDiv = $("#forecast");

  //add event search btn
  $("#search-btn").on("click", function (event) {
    //prevent default
    event.preventDefault();

    //get the user input
    const userInput = $("#userInput").val();

    //show the weather data
    getCurrentWeather(userInput);
    // getForecastData(userInput);

    //create the a new button
  });

  function populateSearchHistory() {
//read the array out of local storage, loop through it


  }
  //get the weather current data
  function getCurrentWeather(cityName) {
    var settings = {
      url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`,
      method: "GET",
      timeout: 0,
    };

    $.ajax(settings).done(function (response) {
      //do stuff with the data

      // <p id="uv">UV Index: <span class="btn btn-sm btn-danger">6.33</span></p>

      console.log("response current:", response);

      if (!localStorage.getItem("weatherSearchHistory")) {
        localStorage.setItem(
          "weatherSearchHistory",
          JSON.stringify([response.name])
        );
      } else {
        var historyFromStorage = JSON.parse(
          localStorage.getItem("weatherSearchHistory")
        );
        historyFromStorage.push(response.name);
        localStorage.setItem(
          "weatherSearchHistory",
          JSON.stringify(historyFromStorage)
        );
      }

      //create the current weather card
      const currentWeatherCard = `
        <div class="card">
          <div class="card-body" id="current-weather-body">
            <h3 class="card-title">
              ${response.name} (${new Date().toLocaleDateString()})
              <img src="https://openweathermap.org/img/w/${
                response.weather[0].icon
              }.png">
            </h3>
            <p class="card-text">Temperature: ${response.main.temp} °F</p>
            <p class="card-text">Humidity: ${response.main.humidity} %</p>
            <p class="card-text"> Wind-Speed: ${response.wind.speed} mph</p>
          </div>
        </div>
      `;

      //show the current weather card
      $("#today").html(currentWeatherCard);

      var latitude = response.coord.lat;
      var longitude = response.coord.lon;

      var settings2 = {
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`,
        method: "GET",
        timeout: 0,
      };

      $.ajax(settings2).done(function (response) {
        console.log(response);
        var currentWeatherBody = document.getElementById(
          "current-weather-body"
        );
        var uvi = document.createElement("p");
        uvi.innerHTML = `UV Index: ${response.current.uvi}`;
        currentWeatherBody.append(uvi);

        // Display Forecast Data
        forecastDiv.html("");
        for (let i = 1; i <= 5; i++) {
          var unixSeconds = response.daily[i].dt;
          var unixMilliseconds = unixSeconds * 1000;
          var forecastDateUnix = new Date(unixMilliseconds);
          var forecastDoW = forecastDateUnix.toLocaleString("en-US", {
            weekday: "long",
          });
          var forecastCard = document.createElement("div");
          forecastCard.classList.add("forecast-card");
          forecastCard.innerHTML = `<h3>${forecastDoW}</h3>
          <p>Temperature: ${response.daily[i].temp.day} °F</p>
          <p>Humidity: ${response.daily[i].humidity} %</p>
          <img src="https://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}.png">`;

          forecastDiv.append(forecastCard);
        }
      });
    });
  }
});

