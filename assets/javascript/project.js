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

