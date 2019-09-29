
class Superhero{
  constructor(){
    this.superheroConfig = {};
    this.getSuperheroes = this.getSuperheroes.bind(this);
    this.randomNum;
    this.superheroObject
    this.superheroImage;
    this.superheroName;
    this.superheroBase;
    this.superheroAffiliation;
  }

  getSuperheroes(){
    this.randomNum = Math.floor((Math.random() * 731) + 1);

    this.superheroConfig = {
      url: "superheroapi.php",
      method: "get",
      dataType: "json",
      data: {
        apikey: "10217629195674986",
        id: this.randomNum
      },
      success: function(response){
        // console.log("success", response);

        this.superheroObject = response;
        this.render();
      }.bind(this),
      error: function(response){
        // console.log("error");
      }
    }
    $.ajax(this.superheroConfig);
  }

  render(){
    this.superheroImage = this.superheroObject.image.url;
    var image = $("<img>");
    image.attr("src", this.superheroImage);

    var imageDiv = $("<div>");
    imageDiv.append(image);

    this.superheroName = this.superheroObject.name;
    var nameDiv = $("<div>");
    nameDiv.addClass("nameDiv");
    nameDiv.text("Name: " + this.superheroName);

    this.superheroBase = this.superheroObject.work.base;
    var baseDiv = $("<div>");
    baseDiv.addClass("baseDiv");
    baseDiv.text("Home Base: " + this.superheroBase);

    this.superheroAffiliation = this.superheroObject.connections["group-affiliation"];
    var affiliationDiv = $("<div>");
    affiliationDiv.addClass("affiliationDiv");
    affiliationDiv.text("Affiliation: " + this.superheroAffiliation);

    $(".superheroContainer").append(imageDiv);
    $(".instructionDisplay").append(nameDiv, baseDiv, affiliationDiv);
  }
}
