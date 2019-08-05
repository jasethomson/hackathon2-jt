$(document).ready(initializeApp);
var defaultLat = 33.69;
var defaultLon = -117.83;
var latitude = defaultLat;
var longitude = defaultLon;
var defaultPhoto = "cats"
var defaultRange = 50;
var appMap = null;
var flikrPhotoSearch = null;
var weatherIcon;

function initializeApp(){
  displayWeather = new DisplayWeather();
  displayWeather.renderWeatherInfo();

  appMap = new DisplayMap(38.95, -94.63, 4, 'map');
  appMap.initMap();
  appMap.addMapListener();

  var flickrApiKey = "98721ce410e380c81dc67cf4214fd2a6";
  flickrPhotoSearch = new FlickrPhotoSearch(flickrApiKey);

  flickrPhotoSearch.addClickHandlers('#photoFilter','#submitPhotoFilter');

  var yelpApi = new Yelp();
  // var yelpDataAccess = yelpApi.getYelpData();


  appMap.addClickCallback(flickrPhotoSearch.setPosition);
  appMap.addClickCallback(displayWeather.setPosition);
  appMap.addClickCallback(displayWeather.renderWeatherInfo);
  appMap.addClickCallback(yelpApi.setPosition);
  var yelpDataAccess = yelpApi.getYelpData();
  var hero = new Superhero();
  var superheroes = hero.getSuperheroes();
  // appMap.addClickCallback( superheroes.updateSuperhero );

  var nasa = new Nasa();
  var asteroids = nasa.getAsteroids();
  // appMapp.addClickCallback( asteroids.handleImpact );
  // var mapCircle = new google.maps.Circle({
  //   center: "latitude/longitude",
  //   radius: "blast radius",
  //   strokeColor: "#0000FF",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "#0000FF",
  //   fillOpacity: 0.4
  // });
  // $(".asteroidButton").on("click", mapCircle);

  // var yelpApi = new Yelp();
  // var yelpDataAccess = yelpApi.getYelpData();
  // appMap.addClickCallback( yelpApi.getRestaurantsForLocation );

}
