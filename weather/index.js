$(document).ready(function() {
  //borrowed from Jason Garland https://codepen.io/crownedjitter/pen/AXzdvQ
  function checkChrome() {
    var isChromium = window.chrome,
      winNav = window.navigator,
      vendorName = winNav.vendor,
      isOpera = winNav.userAgent.indexOf("OPR") > -1,
      isIEedge = winNav.userAgent.indexOf("Edge") > -1,
      isIOSChrome = winNav.userAgent.match("CriOS");
    if (isIOSChrome) {
      return true;
    } else if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
      return true;
    } else {
      return false;
    }
  }

  function checkLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var userLocation = {
      'long': longitude,
      'lat': latitude
    };
    getWeather(userLocation);
  }

  function getWeather(loc) {
    var urlWeather = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + String(loc.lat) + '&lon=' + String(loc.long) + '&appid=8a46bdb4e2124cd94984644ea2e38715' + "&units=imperial";
    $.getJSON(urlWeather, (data) => {
      var jData = JSON.stringify(data);
      $("#temp").html(Math.round(data.main.temp) + "<span>&deg;F</span>");
      $("#city").html(data.name);
      $("#country").html(data.sys.country)
      $("#desc").html(data.weather[0].main);
      $("#icon").html('<i class="wi wi-owm-' + data.weather[0].id + '"></i>');
      var unixRise = new Date(data.sys.sunrise * 1000);
      var hours = unixRise.getHours();
      var minutes = "0" + unixRise.getMinutes();
      var seconds = "0" + unixRise.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      $("#sunset").html("Sunset " + formattedTime);

    });
  }

  function parseError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        var msg = "User denied the request for geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        var msg = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        var msg = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        var msg = "An unknown error occurred."
        break;
    }
    showError(msg);
  }

  function showError(err) {
    $('#warning').css('display', 'block').html(err);
    $('#temp').text('X');
    $('#weather').text('X');
    $('#icon').text('X');
  }

  if (checkChrome() && window.location.protocol != "https:") {
    showError("You need to use HTTPS. Click here: <a target='_top' href='https://codepen.io/timjkstrickland/pen/LxPxNL'>Local Weather</a>")
  } else {
    navigator.geolocation.getCurrentPosition(checkLocation, parseError);
  }
  var submit = document.getElementById('subBtn').addEventListener('click', () => {
    var city = document.getElementById("search").value;
    var searchWeather = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a46bdb4e2124cd94984644ea2e38715&units=imperial";
    $.getJSON(searchWeather, (data) => {
      var jData = JSON.stringify(data);
      $("#temp").html(Math.round(data.main.temp) + "<span>&deg;<span id='tempType'>F</span>");
      $("#city").html(data.name);
      $("#country").html(data.sys.country)
      $("#desc").html(data.weather[0].main);
      $("#icon").html('<i class="wi wi-owm-' + data.weather[0].id + '"></i>');
      var unixRise = new Date(data.sys.sunrise * 1000);
      var hours = unixRise.getHours();
      var minutes = "0" + unixRise.getMinutes();
      var seconds = "0" + unixRise.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      $("#sunset").html("Sunset " + formattedTime);
    });
  });
});

$('.temperature').click(function() {
  var tempVal = $('#tempType').html();
  var tempNum = ($('#temp').text()).slice(0, -2);

  if (tempVal === 'F') {
    var celsNum = Math.round((Number(tempNum) - 32) * 0.5556);
    $('#temp').html(celsNum + '<span>&deg;</span><span id="tempType">C</span>');
  } else {
    var fahrNum = Math.round((Number(tempNum) * 1.8) + 32);
    $('#temp').html(fahrNum + '<span>&deg;</span><span id="tempType">F</span>');

  }
})