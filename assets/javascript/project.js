//function for paralax
$(document).ready(function () {
  $('.parallax').parallax();
});
//function for slide navbar
$(document).ready(function () {
  $('.sidenav').sidenav();
});
//drop down
$('.dropdown-trigger').dropdown();
$(document).ready(function () {
  $('.sidenav').sidenav();
});
//drop down
$('.dropdown-trigger').dropdown();
//modal
$(document).ready(function () {
  $('.modal').modal();
});
//modal
$(document).ready(function () {
  $('select').formSelect();
});

//global variable declaration for user related data
var addressInput;
var addLat;
var addLng;
var radiusMeters;
var entertainment;

// var user = {
//   name: "",
//   questionAnswers: []

// }

//main javascript code
$(document).ready(function () {
  
  // "finish" button click submit form and store variables to local storage
  $("#finish-button").on("click", function (event) {
    event.preventDefault();
    // grab user input for address and stre in a variable
    addressInput = $("#question-address").val().trim().replace(/ /g, "+");
    console.log("User addres input is " + addressInput);
    // grab user input for prefered entertainment and store to variable
    var questionEntertainment = $("#question-option1").attr("data-target");
    //  !!!!!!!!!!!!!!! not a question !!!!!!!!!!!!!!!!!!
    //var question2ID = $("#question-option2").attr("data-target");
    entertainment = $("#" + questionEntertainment).attr("value");
    // console.log($("#" + question1ID).attr("value"));
    // user.questionAnswers.push($("#" + question2ID).attr("value"));
    // grab value from range slider 2) radius and save to a variable
    const radiusMiles = $("#question-range").val();
    console.log("User radius input in miles is " + radiusMiles);
    // convert the user's input desired radius in miles to drive to distance in meters for use with the APIs
    radiusMeters = radiusMiles * 1609.344;
    console.log("Miles converted to meters is " + radiusMeters);
    // run function that select a keyword for Google Nearby Search
    // keywordPicker():
    //console.log(user.questionAnswers);
    // console.log output: 3831+Kristin+Lee+Ln,+Houston,+TX+77014 (spaces not allowed in URL)
    sessionStorage.setItem("addressInput", addressInput);
    sessionStorage.setItem("entertainment", entertainment);
    sessionStorage.setItem("radiusMeters", radiusMeters);

    window.location.href = "results.html";
  });
}); 


/*function keywordPicker() {
  console.log("Inside keywordPicker function.");
  // grab values from questions 3 and 4
  const q3 = $("#question3").val();
  const q4 = $("#question4").val();
  let keyword;
  if (q3 === "warm") {
    if (q4 === "outdoors") {
      console.log("Need warm, outdoors activity for a Google keyword.");
      keyword = "beach";
    }
    else if (q4 === "indoors") {
      console.log("Need warm, indoors activity for a Google keyword.");
      keyword = "shopping";
    }
  }
  else if (q3 === "cool") {
    if (q4 === "outdoors") {
      console.log("Need cold, outdoors activity for a Google keyword.");
      keyword = "skiing";
    }
    else if (q4 === "indoors") {
      console.log("Need cold, indoors activity for a Google keyword.");
      keyword = "museum";
    }
  }
  console.log("Keyword is " + keyword);
}
});*/