//function for paralax
$(document).ready(function(){
    $('.parallax').parallax();
  });
//function for slide navbar
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
//main javascript code
$(document).ready(function(){

  //global variable declaration
  var user = {
    name: "",
    questionAnswers: []
    
  }

  $("#finish-button").on("click", function(event){
    event.preventDefault();
    console.log("BUTTON TEST");
    var question1ID = $("#question-option1").attr("data-target");
    var question2ID = $("#question-option2").attr("data-target");
    user.questionAnswers.push($("#"+question1ID).attr("value"));
    console.log($("#"+question1ID).attr("value"));
    user.questionAnswers.push($("#"+question2ID).attr("value"));
    user.questionAnswers.push($("#question-range").val());
    console.log($("#question-range").val());
    console.log(user.questionAnswers);
    for(var i = 0; i < user.questionAnswers.length; i++){
      console.log(user.questionAnswers[i]);
    }
  });

});
  //drop down
  $('.dropdown-trigger').dropdown();
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
