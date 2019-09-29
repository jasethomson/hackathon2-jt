class DisplayWeather{
  constructor(){
    this.setPosition = this.setPosition.bind(this);
    this.renderWeatherInfo = this.renderWeatherInfo.bind(this);
    this.latitude = 33.69;
    this.longitude = -117.83;
  }

  renderWeatherInfo(){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?APPID=e9ca034e50ecf7c0b99d25a7290a0a56" +
      "&units=imperial&lat=" + this.latitude.toFixed(1) + "&lon=" + this.longitude.toFixed(1), function (data) {
        weatherIcon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $('.weatherIcon').attr('src', weatherIcon);
        var weatherTemp = Math.round(data.main.temp);
        $('.weatherTemp').text(weatherTemp + " F");
        var weatherDescription = data.weather[0].main;
        $('.weatherDescription').text(weatherDescription);
        var location = data.name;
        $('.location').text(location);
        // var windSpeed = data.wind.speed;
        // $('.windSpeed').text("Wind Speed : " + windSpeed.toFixed(0) + " mph");
        // var windDirection = data.wind.deg;
        // $('.windDirection').text("Wind Direction : "
        //   + windDirection.toFixed(0) + " degrees");
    }.bind(this));
  }

  setPosition(position){
    this.latitude = position.clickLat;
    this.longitude = position.clickLon;
  }
}
