let APIKey = "e5d9a85c8fa9bb90928a3e909d39854c";

let $searchBtn = document.getElementById("searchBtn");
let $cityName = document.getElementById("inputValue");
//exclude=alerts,minutely  43.724076152474304, -79.42317491459922

function searchCity () {
  
  var city_name = $cityName.value;
  let queryCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&limit=5&appid=${APIKey}`;


 // let queryURL = queryURLTemplate;
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
          $("#condition").text("weather: " + data.weather[0].description);
          $("#condition").append(`<img src=${iconURL}>`);
          $("#temp").text("temperature: " + data.main.temp + " \u00B0C");
          $("#temp-today").text(data.main.temp + " \u00B0C");
          $("#humidity").text("humidity: " + data.main.humidity + "%");
          $("#wind").text("wind speed: " + data.wind.speed + " m/s");
          $('#uv-index').text("uv index: ");
          var lon = data.coord.lon;
          var lat = data.coord.lat;
          getUVI(lat, lon);
          getFiveDay(city_name);
      },
      error: function(e){
        alert("There was an error.");
      }
    });

  }
    function getUVI(lat, lon) {
      requestURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      fetch(requestURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          uvindex = data.value;
          // console.log(uvindex);
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
    }
  
  function getFiveDay(city_name) {
 
    let fiveDayCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=metric&limit=5&appid=${APIKey}`;
    fetch(fiveDayCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt[11] === "1" && data.list[i].dt_txt[12] === "2") {
            // console.log(data.list[i]);
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
                  <img alt="forecast" src="${forecastIconURL}"> <hr>
                  <p>temperature:<br> ${forecastTemperature} \u00B0C</p> <hr>
                  <p>humidity:<br> ${forecastHumidity}%</p> <hr>
                </div>
              </div>
            </div>`
            );
          }
        }
      })
    }
  

  $searchBtn.addEventListener("click", searchCity);