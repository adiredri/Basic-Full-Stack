// adir_edri_206991762_edwin_krasheninin_212232458

$(document).ready(function() {
    var emojis = ["😁","😍","👻","😎","👑","🐶","🤩","😡","🥸","🧟","🐔","🐵","💩","💃","🌟","🌕","🌻","🍑","🐱","👩‍🚀","😈","👨‍✈️","👨‍🦽","🦹‍♀️","👨‍🦯","🏂","🍔","🍺","🏀","⚽"];
    var cards = []; // Array to hold the card values
    var flippedCards = []; // Array to hold the flipped cards
    var startTime; // Variable to store the start time
    var timerInterval; // Variable to store the timer interval ID
  
    var gameContainer = $("#game-container");
    var gameInfo = $("#game-info");
    var playAgain = $("#play-again");
    var startButton = $("#start-game");
  
    // Function to shuffle the cards randomly
    function shuffleCards() {
      var currentIndex = cards.length;
      var temporaryValue, randomIndex;
  
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
    }
  
    // Function to update the timer display
    function updateTimer() {
      var currentTime = new Date();
      var elapsedTime = Math.round((currentTime - startTime) / 1000);
      gameInfo.text("Time: " + elapsedTime + " seconds");
    }
  
    // Function to initialize the game
    function initGame(playerName, numPairs) {
      if (numPairs > 30) {
        alert("Number of pairs cannot exceed 30. Please enter a new value.");
        return;
      }
      $("#player-name").hide();
      $("#num-pairs").hide();
      $("#start-game").hide();
      $('label').hide();

      $("h1").text(playerName);

      gameContainer.show();
  
      // Create an array with pairs of cards
      for (var i = 0; i < numPairs; i++) {
        cards.push(emojis[i]);
        cards.push(emojis[i]);
      }
  
      shuffleCards();
  
      // Create the card elements and append them to the game container
      for (var i = 0; i < cards.length; i++) {
        var card = $("<div>").addClass("card");
        card.data("value", cards[i]);
        gameContainer.append(card);
      }
  
      // Add click event handler to the cards
      $(".card").click(function() {
        var card = $(this);
        var value = card.data("value");
  
        // Check if the card is already flipped or matched
        if (!card.hasClass("flipped") && flippedCards.length < 2) {
          card.addClass("flipped");
          card.text(value);
          flippedCards.push(card);
  
          // Check if two cards are flipped
          if (flippedCards.length === 2) {
            var card1 = flippedCards[0];
            var card2 = flippedCards[1];
  
            // Check if the flipped cards match
            if (card1.data("value") === card2.data("value")) {
              card1.off("click");
              card2.off("click");
              flippedCards = [];
  
              // Check if all cards are matched
              if ($(".card:not(.flipped)").length === 0) {
                clearInterval(timerInterval); // Stop the timer
                var endTime = new Date();
                var totalTime = Math.round((endTime - startTime) / 1000);
                gameInfo.text("Congratulations, " + playerName + "! You completed the game in " + totalTime + " seconds.");
  
                playAgain.html('<button class="btn btn-primary">Play Again</button>');
                playAgain.click(function() {
                  gameContainer.empty();
                  gameInfo.empty();
                  playAgain.empty();
                  cards = [];
                  flippedCards = [];
                  startButton.prop("disabled", false); // Enable the "Start Game" button
                  $("#player-name").show();
                  $("#num-pairs").show();
                  $("#start-game").show();
                  $('label').show();
                  $("h1").text("Memory Game");
                });
              }
            } else {
              setTimeout(function() {
                card1.text("");
                card1.removeClass("flipped");
                card2.text("");
                card2.removeClass("flipped");
                flippedCards = [];
              }, 1000);
            }
          }
        }
      });
  
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
  
      // Disable the "Start Game" button
      startButton.prop("disabled", true);
    }
  
    // Event listener for the "Start Game" button
    startButton.click(function() {
      var playerName = $("#player-name").val();
      var numPairs = parseInt($("#num-pairs").val());
  
      if (playerName.trim() === "") {
        gameInfo.text("Please enter your name.");
        return;
      }
  
      if (numPairs > 30) {
        alert("Number of pairs cannot exceed 30. Please enter a new value.");
        return;
      }
  
      $("#player-name-display").text("Player: " + playerName);
  
      initGame(playerName, numPairs);
    });
  });
  