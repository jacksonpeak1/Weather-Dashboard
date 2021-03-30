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

  //get the weather current data
  function getCurrentWeather(cityName) {
    var settings = {
      url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`,
      method: "GET",
      timeout: 0,
    };

    $.ajax(settings).done(function (response) {
      //do stuff with the data

      // <p id="uv">UV Index: <span class="btn btn-sm btn-danger">6.33</span></p>

      console.log("response current:", response);

      //create the current weather card
      const currentWeatherCard = `
        <div class="card">
          <div class="card-body" id="current-weather-body">
            <h3 class="card-title">
              ${response.name} (${new Date().toLocaleDateString()})
              <img src="http://openweathermap.org/img/w/${
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
          <img src="http://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}.png">`;
  
          forecastDiv.append(forecastCard);
        }
      });
    });
  }
});

// var searchForm = $("#search-form");
// var searchTermEl = $("#search-term");
// var imagesDisplay = $("#images-display");

// searchForm.on("submit", function (event) {
//   event.preventDefault();
//   // Take the search term from out of the input.
//   var searchTerm- searchTermEl.val();
//   console.log(searchTerm);
//   var apiKey = "10a522f9d8216f7c5d46d3a3132e73b0";
//   // Build the api url with search term and the api key
//   // store teh api key in a variable
//   var queryURL = "http://openweathermap.org/img/w/search?api_key=" + apiKey + "&q" + searchTerm + "&limit=3";

//   // Make an API call using fetch
//   fetch(queryURL)
//   .then(function response) {
//     return response.json[];
//   })
//   .then (function (data) {
//     console.log(data.data[0].images.fixed_width_small.url);

//     imagesDisplay.empty();

//     for (var i = 0; i < data.data.length; i++) {
//       var imageEl= $("<img>");
//       imageEl.addclass("col-sm-4");
//       imageEl.attr("src", data.data[i].images.fixed_width_small.url)
//       imagesDisplay.append(imageEl);
//     }
//   })

// }

// $.getJSON(
//   "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=10a522f9d8216f7c5d46d3a3132e73b0",
//   function (data) {
//     console.log(data);

//     var icon =
//       "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
//     var temp = Math.floor(data.main.temp);
//     var weather = data.weather[0].main;

//     $(".icon").attr("src", icon);
//     $(".weather").append(weather);
//     $(".temp").append(temp);
//   }
// );

// fetch(
//   "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=10a522f9d8216f7c5d46d3a3132e73b0"
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

/* <script>
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
} */

// "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=10a522f9d8216f7c5d46d3a3132e73b0"
