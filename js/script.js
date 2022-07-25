let APIKey = "e5d9a85c8fa9bb90928a3e909d39854c";
let $searchBtn = document.getElementById("searchBtn");
let $cityName = document.getElementById("inputValue");
//exclude=alerts,minutely  43.724076152474304, -79.42317491459922

function searchCity () {

  var country_code = 'CA';
  var city_name = 'Toronto';
  var lat = 43.724076152474304;
  var lon = -79.42317491459922;
  let queryCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIKey}`;
 // let queryURLTemplate = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&appid=${APIKey}`; yN

 // let queryURL = queryURLTemplate;
  let queryURL = queryCityUrl;


//    var queryURL = queryURLTemplate + "&q=" + $cityName.value;
//    let results = fetch(queryURL);
//  let queryURL = queryURLTemplate + "&q=" + $cityName.value;
// let queryURL = queryURLTemplate + "&lat=33.44&lon=-94.04" ;
//  43.59166619787575, -79.64297710957234

    $.ajax({
      url: queryURL,
      success: function(data){ 
          console.log(data);
      },
      error: function(e){
        alert("There was an error.");
      }
    });


    fetch(queryURL, {
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
  
  }
  
  $searchBtn.addEventListener("click", searchCity);