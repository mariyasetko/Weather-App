let APIKey = "e5d9a85c8fa9bb90928a3e909d39854c";

let $searchBtn = document.getElementById("searchBtn");
let $cityName = document.getElementById("inputValue");

function searchCity () {
  var city_name = $cityName.value;
  let queryCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&limit=5&appid=${APIKey}`;

  let queryURL = queryCityUrl;
  $("#five-day-forecast").empty();
  $("#city").text(city_name);
    $.ajax({
      url: queryURL,
      success: function(data){ 
          console.log(data);

          timeupdated = moment.unix(data.dt).format("MM/DD/YYYY");
          $("#name").text(data.name);
         
          $("#date").text(" (" + timeupdated + ")");
          var iconURL = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          $("#condition").text("Weather: " + data.weather[0].description);
          $("#condition").append(`<img src=${iconURL}>`);
          $("#temp").text("Temperature: " + data.main.temp + " \u00B0C");
          $("#temp-today").text(data.main.temp + " \u00B0C");
          $("#humidity").text("Humidity: " + data.main.humidity + "%");
          $("#wind").text("Wind Speed: " + data.wind.speed + " m/s");
          $('#uv-index').text("UV Index: ");
          var lon = data.coord.lon;
          var lat = data.coord.lat;
          getUVI(lat, lon);
          getFiveDay(city_name);
      },
      error: function(e){
        alert("There was an error.");
      }
    });
};

function getUVI(lat, lon) {
  requestURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      uvindex = data.value;
      var UV = $(document.createElement('p'));
      UV.attr("class", "btn");
      UV.attr("id", "uv-btn");
      UV.text(uvindex);
    
      if (uvindex <= 3) {
        UV.css("color", "green");
      } else if (uvindex > 3 && uvindex <= 6) {
        UV.css("color", "yellow");
      } else if (uvindex > 6 && uvindex <= 9) {
        UV.css("color", "orange");
      } else if (uvindex > 9 && uvindex <= 12) {
        UV.css("color", "purple");
      }
      $('#uv-index').append(UV);
    })
};
  
function getFiveDay(city_name) {
  let fiveDayCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=metric&limit=5&appid=${APIKey}`;
  fetch(fiveDayCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt[11] === "1" && data.list[i].dt_txt[12] === "2") {
          var forecastDate = moment.unix(data.list[i].dt).format("MM/DD/YYYY");
          var forecastIcon = data.list[i].weather[0].icon;
          var forecastIconURL = `https://openweathermap.org/img/w/${forecastIcon}.png`;
          var forecastTemperature = data.list[i].main.temp;
          var forecastHumidity =  data.list[i].main.humidity;
          $("#five-day-forecast").append(
          `<div class="col running card-parent">
            <div class="card">
              <div>
                <h5>${forecastDate}</h5>
                <img alt="Forecast" src="${forecastIconURL}"> <hr>
                <p>Temperature:<br> ${forecastTemperature} \u00B0C</p> <hr>
                <p>Humidity:<br> ${forecastHumidity}%</p> <hr>
              </div>
            </div>
          </div>`
          );
        }
      }
    })
};
  
  $searchBtn.addEventListener("click", searchCity);