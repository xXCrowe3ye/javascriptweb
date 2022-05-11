
var btnColors = ["violet", "pink", "orange", "green"];

var gPattern = [];
var userClicked = [];

var isStarted = false;
var level = 0;

/* This is a jQuery event listener that listens for a keypress event. When the event is triggered, it
checks if the game has started. If it hasn't, it changes the title to "Level 0", calls the
nextPattern() function, and sets isStarted to true. */

$(document).keypress(function() {
  if (!isStarted) {
    $("#level-title").text("Level " + level);
    nextPattern();
    isStarted = true;
  }
});

/* This is a jQuery event listener that listens for a click event. When the event is triggered, it
stores the id of the button that got clicked in a variable called userChosenColour. It then adds the
id to the userClicked array, plays the sound associated with the button, and animates the button
being pressed. Finally, it calls the chkAns() function, passing in the index of the last item in the
userClicked array. */
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClicked.push(userChosenColour);

  gameSound(userChosenColour);
  pressAnimation(userChosenColour);

  chkAns(userClicked.length-1);
});

/**
 * If the user's click matches the pattern, then the next pattern is played. If not, the game is over
 * @param currentLevel - This is the current level of the game.
 */
function chkAns(currentLevel) {

    if (gPattern[currentLevel] === userClicked[currentLevel]) {
      if (userClicked.length === gPattern.length){
        setTimeout(function () {
          nextPattern();
        }, 1000);
      }
    } else {
      gameSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      playAgain();
    }
}


/**
 * The function generates a random number, uses that number to select a random color from the btnColors
 * array, pushes that color to the gPattern array, and then plays the sound and animation for that
 * color
 */
function nextPattern() {
  userClicked = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = btnColors[randomNumber];
  gPattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  gameSound(randomChosenColour);
}

/**
 * When a button is pressed, add the class "pressed" to the button, and after 100 milliseconds, remove
 * the class "pressed" from the button
 * @param currentColor - The color that was just played.
 */
function pressAnimation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/**
 * When the function is called, it creates a new audio object, and then plays it.
 * @param name - The name of the sound file to play.
 */
function gameSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * The playAgain() function resets the level, gPattern, and isStarted variables to their default
 * values.
 */
function playAgain() {
  level = 0;
  gPattern = [];
  isStarted = false;
}
