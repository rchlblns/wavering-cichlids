//function for paralax
$(document).ready(function(){
  $('.parallax').parallax();
});
//function for slide navbar
$(document).ready(function(){
  $('.sidenav').sidenav();
});
//drop down
$('.dropdown-trigger').dropdown();
//modal
$(document).ready(function(){
  $('.modal').modal();
});
//modal
$(document).ready(function(){
  $('select').formSelect();
});
var addressInput;
var addLat;
var addLng;
var addressLatLng;
var radiusMeters;
var map;
var googleLatLng;
var placesInfo;
// "finish" button click submit form and store variables to local storage
$("#submitBtn").on("click", function() {
  // grab text from 1) starting address and save to a variable
  // addressInput = $("#userAddress").val().trim().replace(/ /g, "+");
  // console.log(addressInput);
  // grab value from range slider 2) radius and save to a variable
  // var radiusMiles = $("#driveRadius").val();
  const radiusMiles = 250;
  // convert the user's input desired radius in miles to drive to distance in meters for use with the Google places api
  radiusMeters = radiusMiles * 1609.344;
  console.log(radiusMeters);
  // run function that select a keyword for Google Nearby Search
  // keywordPicker():
});
radiusMeters = 502336;

addressInput = ("3831 Kristin Lee Ln, Houston, TX 77014").replace(/ /g, "+");
// console.log output: 3831+Kristin+Lee+Ln,+Houston,+TX+77014 (spaces not allowed in URL)
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressInput + "&country=US&key=AIzaSyCkWLplfERYd7MKirTiRwl9rhCzsPDVN8Q";
console.log(googleURL);

$.ajax({
  url: googleURL,
  method: "GET"
}).then(function(response) {
  addLat = response.results[0].geometry.location.lat;
  addLng = response.results[0].geometry.location.lng;
  addressLatLng = {lat: addLat, lng: addLng};
  console.log(addressLatLng);
});

// start of google maps api
function initMap() {
  // latitude and longitude converted to a google map coordinate
  googleLatLng = new google.maps.LatLng(addressLatLng);
  console.log(googleLatLng);
  map = new google.maps.Map($("#mapDisplay"), {
    center: googleLatLng,
    zoom: 12,
    fullscreenControl: false,
    gestureHandling: "cooperative",
    noClear: true
  });
<<<<<<< HEAD

  const request = {
    location: googleLatLng,
    radius: radiusMeters,
    keyword: "skiing"
  }
  console.log(request);

  placesInfo = new google.maps.places.PlacesService(map);
  placesInfo.nearbySearch(request, callback);
}

function callback(result, status) {
  console.log("Inside callback function.");
  const googleStatus = google.maps.places.PlacesServiceStatus;
  if (status === googleStatus.OK) {
    console.log("The response contains a valid result.");
    for(i = 0; i < 10; i++) {
      console.log(result[i]);
    }
  }
  else if (status === googleStatus.ERROR) {
    console.log("There was a problem contacting the Google servers.");
  }
  else if (status === googleStatus.INVALID_REQUEST) {
    console.log("This request was invalid.");
  }
  else if (status === googleStatus.OVER_QUERY_LIMIT) {
    console.log("The webpage has gone over its request quota.");
  }
  else if (status === googleStatus.NOT_FOUND) {
    console.log("The referenced location was not found in the Places database.");
  }
  else if (status === googleStatus.REQUEST_DENIED) {
    console.log("The webpage is not allowed to use the PlacesService.");
  }
  else if (status === googleStatus.UNKNOWN_ERROR) {
    console.log("The PlacesService request could not be processed due to a server error. The request may succeed if you try again.");
  }
  else if (status === googleStatus.ZERO_RESULTS) {
    console.log("No result was found for this request.");
  }
}

function keywordPicker() {
  console.log("Inside keywordPicker function.");
  // grab values from questions 3 and 4
  const q3 = $("#question3").val();
  const q4 = $("#question4").val();
  let keyword;
  if(q3 === "warm") {
    if(q4 === "outdoors"){
      console.log("Need warm, outdoors activity for a Google keyword.");
      keyword = "beach";
    }
    else if(q4 === "indoors"){
      console.log("Need warm, indoors activity for a Google keyword.");
      keyword = "shopping";
    }
  }
  else if(q3 === "cool"){
    if(q4 === "outdoors"){
      console.log("Need cold, outdoors activity for a Google keyword.");
      keyword = "skiing";
    }
    else if(q4 === "indoors"){
      console.log("Need cold, indoors activity for a Google keyword.");
      keyword = "museum";
    }
  }
  console.log("Keyword is " + keyword);
}