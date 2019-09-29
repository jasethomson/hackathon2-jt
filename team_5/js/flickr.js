
class FlickrPhotoSearch{
  constructor (apiKey){
    this.getFlickrData = this.getFlickrData.bind(this);
    this.renderFlickr = this.renderFlickr.bind(this);
    this.flickrError = this.flickrError.bind(this);
    this.addClickHandlers = this.addClickHandlers.bind(this);
    this.handleClickHandlers = this.handleClickHandlers.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.apiKey = apiKey;
    this.flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.formatCallback = "format=json&nojsoncallback=1";
    this.flickrPhotoData =[];
    this.flickrLocationData = [];
    this.submitElementId;
    this.rangeElementId;
    this.queryElementId;
    this.latitude = 33.7;
    this.longitude= -117.8;
  }

  getFlickrData(queryFilter){
    var rangeFilter = 100;
    // console.log('getFlickData');
    var rightLongitude = (this.longitude + rangeFilter / 30).toFixed(2)
    var rightLatitude = (this.latitude + rangeFilter / 30).toFixed(2);
    var leftLongitude = (this.longitude - rangeFilter / 30).toFixed(2);
    var leftLatitude = (this.latitude - rangeFilter / 30).toFixed(2);
    var latLonBox = `${leftLongitude},${leftLatitude},${rightLongitude},${rightLatitude}`;

    var settings = {
      async: true,
      crossDomain: true,
      url: `${this.flickrUrl}&api_key=${this.apiKey}&${this.formatCallback}`,
      method: "GET",
      headers: {},
      data: {
        bbox: latLonBox,
        text: queryFilter
      },
      success: this.renderFlickr,
      error: this.flickrError
    };
    $.ajax(settings);
  }

  renderFlickr(response, status){
    var photoInfo = response.photos.photo;
    for (var photoIndex = 0; photoIndex < photoInfo.length; photoIndex++) {
      this.flickrPhotoData.push(photoInfo[photoIndex]);
      var farmId = photoInfo[photoIndex].farm;
      var serverId = photoInfo[photoIndex].server;
      var id = photoInfo[photoIndex].id;
      var secret = photoInfo[photoIndex].secret;
      var photoUrl = "https://farm" + farmId + ".staticflickr.com/"
        + serverId + "/" + id + "_" + secret + ".jpg";
      $("#flickr").append("<img src=" + photoUrl + "/>");
      this.renderPhotoLatLon(id, photoIndex, photoUrl);
    }
  }

  flickrError(response, status) {
    // console.log("Flickr Error response", response);
    // console.log("Flickr Error status", status);
  }

  renderPhotoLatLon(id, photoIndex, photoUrl){
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${this.apiKey}&${this.formatCallback}`,
      method: "GET",
      headers: {},
      data: {
        photo_id: id
      },

      success: function(response){
        this.flickrLocationData.push(response);
        var image = {
          url: photoUrl,
          size: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0)
        }
        var photoLocation =
          { lat: parseInt(
              this.flickrLocationData[photoIndex].photo.location.latitude, 10),
            lng: parseInt(
              this.flickrLocationData[photoIndex].photo.location.longitude, 10)
          }
        appMap.renderMapIcon(image, photoLocation);

      }.bind(this),
      error: this.flickrError
    };
    $.ajax(settings);
  }

  addClickHandlers(queryElementId, submitElementId){
    this.queryElementId = queryElementId;
    this.submitElementId = submitElementId;
    $(this.submitElementId).on('click', this.handleClickHandlers);
  }

  handleClickHandlers(){
    var queryFilter = $(this.queryElementId).val();
    this.getFlickrData(queryFilter);
  }

  getFlikrData(){
    return this.flickrData;
  }

  setPosition(position){
    this.latitude = position.clickLat;
    this.longitude = position.clickLon;
  }
}
