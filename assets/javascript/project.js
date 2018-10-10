//drop down
$('.dropdown-trigger').dropdown();
//drop down
$('.dropdown-trigger').dropdown();


//global variable declaration for user related data
var addressInput;
var addLat;
var addLng;
var radiusMeters;
var entertainment;
var input;
var options;

//main javascript code
$(document).ready(function () {

  $('.parallax').parallax();
  $('.sidenav').sidenav();
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('select').formSelect();

  // "finish" button click submit form and store variables to local storage
  $("#finish-button").on("click", function(event) {
    event.preventDefault();
    // grab user input for address and stre in a variable
    addressInput = $("#question-address").val().trim().replace(/ /g, "+");
    console.log("User addres input is " + addressInput);
    // grab user input for prefered entertainment and store to variable
    entertainment = $("#question-entertainment").val();
    console.log(entertainment);
    // grab value from range slider 2) radius and save to a variable
    const radiusMiles = $("#question-range").val();
    console.log("User radius input in miles is " + radiusMiles);
    // convert the user's input desired radius in miles to drive to distance in meters for use with the APIs
    radiusMeters = radiusMiles * 1609.344;
    console.log("Miles converted to meters is " + radiusMeters);

    const valid = valdiateForm(addressInput, entertainment);
    if(valid) {
      sessionStorage.setItem("addressInput", addressInput);
      sessionStorage.setItem("entertainment", entertainment);
      sessionStorage.setItem("radiusMeters", radiusMeters);

      window.location.href = "results.html";
    }
  });
  
}); 

function valdiateForm(address, entertainment) {
  console.log("inside validate form.");
  console.log(address);
  console.log(entertainment);
  let valid;
  let addressValid;
  let entertainmentValid;
  if(address === "") {
    console.log("address undefined.");
    $("#addressValText").text("Don't forget to add a starting address.");
    addressValid = false;
  }
  else {
    addressValid = true;
  }
  if(entertainment === null) {
    console.log("entertainment undefined.");
    $("#entertainmentValText").text("Pick somewhere you like to have fun.");
    entertainmentValid = false;
  }
  else {
    entertainmentValid = true;
    $("#entertainmentValText").text("");
  }
  if(!addressValid || !entertainmentValid) {
    valid = false;
  }
  else if(addressValid && entertainmentValid) {
    valid = true;
    $("#entertainmentValText").text("");
  }
  return valid;
}