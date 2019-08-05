
class Yelp{
  constructor(){
    this.yelpAjaxConfig ={};
    this.getYelpData = this.getYelpData.bind(this);
    this.yelpSuccess = this.yelpSuccess.bind(this);
    this.yelpError = this.yelpError.bind(this);
    this.render = this.render.bind(this);
    this.yelpSearch = this.yelpSearch.bind(this);
    this.applyClickHandler = this.applyClickHandler.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.yelpContainer = $(".yelpContainer");
    this.yelpInput = $(".yelpBox");
    this.yelpInputBox = $(".yelpInput");
    this.searchValue = "coffee";
    this.yelpName;
    this.yelpAddress;
    this.yelpRating;
    this.yelpReview;
    this.yelpPrice;
    this.latitude = 34.052;
    this.longitude = -118.243;

  }
  applyClickHandler(){
    $("#yelpButton").on("click", this.yelpSearch);
  }
  yelpSearch(){
    if (this.yelpInputBox.val() === ""){
    } else {
      this.searchValue = this.yelpInputBox.val();

      this.getYelpData();

      this.render();

    }
  }
  getYelpData(){
    this.yelpAjaxConfig = {
      dataType: "json",
      url: "yelp.php",
      method: 'get',
      headers: {
        "Authorization": "Bearer K86dXVGhsx9t-SEYXVTpp6lJr2CBl3aLKBcXnOMdf8tUp0mBe9rzWbSu-5LGORVbqnNCWrAMngd0-VvR7IugL9R-fwgPeEFOhDeFo_APDkIhIlTICac9Omtp_gNBXXYx"
      },
      data: {
        'term': this.searchValue,
        'latitude': this.latitude,
        'longitude': this.longitude
      },
      success: this.yelpSuccess,
      error: this.yelpError
    };
    $.ajax( this.yelpAjaxConfig );
  }
  yelpSuccess(response, status){
    console.log("Success response", response);
    this.yelpListResults = response.businesses;

    this.applyClickHandler();

  }
  yelpError(response, status) {
    console.log("Error response", response);
  }
  render(){
    this.yelpContainer.empty();
    var currentResult = 0;
    var lengthOfResults = this.yelpListResults.length;

    while (currentResult < lengthOfResults){
      this.yelpName = (currentResult+1) + ". " + this.yelpListResults[currentResult].name;
      this.yelpAddress = this.yelpListResults[currentResult].location.display_address;
      if (this.yelpListResults[currentResult].rating === undefined){
        this.yelpRating = "";
      } else {
        this.yelpRating = "Rating: " + this.yelpListResults[currentResult].rating;
      }
      if (this.yelpListResults[currentResult].review_count === undefined){
        this.yelpReview = "";
      } else {
        this.yelpReview = " | " + this.yelpListResults[currentResult].review_count + " Reviews on Yelp";
      }
      if ( this.yelpListResults[currentResult].price === undefined){
        this.yelpPrice = "";
      } else {
        this.yelpPrice = " | " + this.yelpListResults[currentResult].price;
      }
      if (this.yelpListResults[currentResult].categories[0].title === undefined){
        this.yelpCategory = "";
      } else {
        this.yelpCategory = this.yelpListResults[currentResult].categories[0].title;
      }

      var resultContainer = $("<div>", {
        class: "yelpResultContainer"
      });
      var resultName = $("<a>", {
        class: "yelpName",
        text: this.yelpName,
        target: "_blank",
        href: this.yelpListResults[currentResult].url
      });
      var resultAddress = $("<div>", {
        class: "yelpAddress",
        text: this.yelpAddress
      });
      var resultRatingReviewPrice = $("<div>", {
        class: "yelpRatingReviewPrice",
        text: this.yelpRating + " " + this.yelpReview + " " +  this.yelpPrice
      });
      var resultCategory = $("<div>", {
        class: "yelpCategory",
        text: this.yelpCategory = this.yelpCategory
      });
      var resultPhotoDiv = $("<div>", {
        class: "yelpContainer",
      });
      var resultPhoto = $("<img>", {
        class: "yelpPhoto"
      });
      resultPhoto.attr("src", this.yelpListResults[currentResult].image_url)
      resultPhotoDiv.append(resultPhoto);
      resultContainer.append(resultPhotoDiv, resultName, resultAddress, resultRatingReviewPrice, resultCategory);

      this.yelpContainer.append(resultContainer);

      var photoLocation =
      {
        lat: parseFloat(
          this.yelpListResults[currentResult].coordinates.latitude , 10),
        lng: parseFloat(
          this.yelpListResults[currentResult].coordinates.longitude , 10)
      }
      appMap.renderMarker(photoLocation);







      currentResult++;

    }
  }
  setPosition(position) {
    this.latitude = position.clickLat;
    this.longitude = position.clickLon;
  }
}
