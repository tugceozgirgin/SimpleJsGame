//$("h1").css("color","red");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStart = false;
var level = 0;

$(document).keypress(function(){
 if(!isStart){
   $("h1").text("Level "+level);
   nextSequence();
   isStart = true;
}});



$("div.btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){
    level+=1;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

   $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   

}

function playSound(color) {
    var audio = new Audio(`./sounds/${color}.mp3`);
   audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]== gamePattern[currentLevel]){
        console.log(true);
        
        if(currentLevel+1 == gamePattern.length){
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);       
        }
    }
    else{
        console.log(false);
        var audio = new Audio(`./sounds/wrong.mp3`);
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart.");
        startOver();
}
}

function startOver(){
    level = 0;
    gamePattern = [];
    isStart = false;
    userClickedPattern = [];

}
