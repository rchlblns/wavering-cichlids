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

// "finish" button click submit form and store variables to local storage
$("#submitBtn").on("click", function() {
  // grab text from 1) starting address and save to local storage
  var startLocation = $("#userAddress").val().trim();
  localStorage.setItem("startLocation", startLocation);
  // grabe value from range slider 2) radius and save to local storage
  var radius = $("#driveRadius").val();
  localStorage.setItem("radius", radius);
  // run function that uses Google API
  // initMap();
});

function initMap() {
  console.log("Inside initMap function.");
}

