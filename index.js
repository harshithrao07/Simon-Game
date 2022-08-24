
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];

var userClickedPattern = [];
var level = 0;
var started = false;

$("body").keydown(function(event){
  if(started == false){
  nextSequence();
  started = true;
 }
});

function nextSequence()
{
    level = level + 1;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
}

      $(".btn").on("click",function(){
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
    });



function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed")
    } , 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
  {
    var count=0;
    var length = gamePattern.length;
    for(var i=0; i<length; i++)
    {
      if(userClickedPattern[i] == gamePattern[i])
      {
        count++;
      }
    }
    if(count == length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
