
class Nasa{
  constructor(){
    this.nasaAsteroidConfig = {};
    this.getAsteroids = this.getAsteroids.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.addClickHandler = this.addClickHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.yesterday;
    this.yesterdayDate;
    this.yesterdayMonth;
    this.yesterdayYear;

    this.asteroidObject;
    this.asteroidCount;
    this.asteroidArray;
    this.asteroidName;
    this.asteroidNameArray = [];
    this.asteroidDiameter;
    this.asteroidDiameterArray = [];
    this.craterRadius;
    this.craterRadiusArray = [];
    this.blastRadius;
    this.blastRadiusArray = [];

    this.latitude = 33.69;
    this.longitude = -117.83;
  }

  getAsteroids(){
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() -1);
    this.yesterdayDate = this.yesterday.getDate();
    this.yesterdayMonth = this.yesterday.getMonth() + 1;
    this.yesterdayYear = this.yesterday.getFullYear();
    if(this.yesterdayDate < 10){
      this.yesterdayDate = "0" + this.yesterdayDate;
    }
    if(this.yesterdayMonth < 10){
      this.yesterdayMonth = "0" + this.yesterdayMonth;
    }
    this.yesterday = [this.yesterdayYear, this.yesterdayMonth, this.yesterdayDate].join('-');

    this.nasaAsteroidConfig = {
      url: "https://api.nasa.gov/neo/rest/v1/feed",
      method: "get",
      dataType: "json",
      data: {
        api_key: "jHkKcbwwbWci3IntdOPehBbtfG91DJ6KxgSvqKDo",
        start_date: this.yesterday,
      },
      success: function(response){
        // console.log("success", response);

        this.asteroidObject = response.near_earth_objects;
        this.render();
      }.bind(this),
      error: function(response){
        // console.log("error");
      }
    }
    $.ajax(this.nasaAsteroidConfig);
  }

  render(){
    this.asteroidCount = this.asteroidObject[this.yesterday].length;

    var countDiv = $("<div>");
    countDiv.text("Asteroid Count: " + this.asteroidCount);
    countDiv.addClass("countDiv");
    $(".asteroidContainer").append(countDiv);

    this.asteroidArray = this.asteroidObject[this.yesterday];

    for(var asteroidIndex = 0; asteroidIndex < this.asteroidArray.length; asteroidIndex++){
      this.asteroidName = this.asteroidObject[this.yesterday][asteroidIndex].name;
      this.asteroidNameArray.push(this.asteroidName);

      this.asteroidDiameter = this.asteroidObject[this.yesterday][asteroidIndex].estimated_diameter.meters.estimated_diameter_max;
      this.asteroidDiameterArray.push(this.asteroidDiameter);

      this.craterRadius = this.asteroidDiameter * 10.87;
      this.craterRadiusArray.push(this.craterRadius);

      this.blastRadius = this.asteroidDiameter * 13.6;
      this.blastRadiusArray.push(this.blastRadius);
    }

    var nameDiv = $("<div>");
    nameDiv.text("Asteroid Name: ");
    nameDiv.addClass("nameDiv asteroidButton");
    for(var nameIndex = 0; nameIndex < this.asteroidNameArray.length; nameIndex++){
      var nameList = $("<li>");
      nameList.text(this.asteroidNameArray[nameIndex]);
      nameList.addClass("nameList");
      $(".nameDiv").append(nameList);
      $(".asteroidContainer").append(nameDiv);
    }

    var diameterDiv = $("<div>");
    diameterDiv.text("Asteroid Diameter (in meters): ");
    diameterDiv.addClass("diameterDiv");
    for(var diameterIndex = 0; diameterIndex < this.asteroidDiameterArray.length; diameterIndex++){
      var diameterList = $("<li>");
      diameterList.text(this.asteroidDiameterArray[diameterIndex]);
      diameterList.addClass("diameterList");
      $(".diameterDiv").append(diameterList);
      $(".asteroidContainer").append(diameterDiv);
    }
    // console.log(this.asteroidObject);
    // console.log(this.asteroidNameArray);
    console.log(this.asteroidDiameter);
    console.log(this.asteroidDiameterArray);
    console.log(this.craterRadius);
    console.log(this.blastRadius);
    console.log(this.blastRadiusArray);
  }

  addClickHandler(domElementID){
    this.domElementID = domElementID;
    $(this.domElementID).on('click', this.handleClick);
  }

  handleClick(){
    console.log("asteroid clicked");
    appMap.renderMapCircle();
  }

  setPosition(position){
    this.latitude = position.clickLat;
    this.longitude = position.clickLon;
  }
}
