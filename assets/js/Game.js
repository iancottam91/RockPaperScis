// logic for winning or losing the game
function Game () {

  var playerAWeapon;
  var playerBWeapon;
  var result;
  var resultMessage;
  var choices = ['rock', 'paper', 'scissors'];
  var pcvpc = false;


  return {

    generateWeapon : function(){

      return choices[Math.floor(Math.random() * 3)];

    },

    // results can be 'draw', 'playerA' or 'playerB'
    determineResult: function(playerAWeapon, playerBWeapon){

      if(playerAWeapon === playerBWeapon){
        return "draw";
      } else if(playerAWeapon === 'rock' && playerBWeapon === 'scissors'){
        return "playerA";
      } else if(playerAWeapon === 'paper' && playerBWeapon === 'rock'){
        return "playerA";
      } else if(playerAWeapon === 'scissors' && playerBWeapon === 'paper'){
        return "playerA";
      } else if(playerAWeapon === 'rock' && playerBWeapon === 'paper'){
        return "playerB";
      } else if(playerAWeapon === 'paper' && playerBWeapon === 'scissors'){
        return "playerB";
      } else if(playerAWeapon === 'scissors' && playerBWeapon === 'rock'){
        return "playerB";
      }
    },

    // play the game
    // generate computer weapon
    // determine the result

    // test it
    play: function(weapon){

      if(weapon !== undefined){

        // hide play button during the game
        document.getElementById('play-game').className = "hidden";

        playerAWeapon = weapon;
        playerBWeapon = this.generateWeapon();
        this.updatePlayerAWeapon(playerAWeapon);
        this.updatePlayerBWeapon(playerBWeapon);
        result = this.determineResult(playerAWeapon, playerBWeapon);
        resultMessage = this.createResultMessage(result, playerAWeapon, playerBWeapon);
        this.updateResultToUi(resultMessage, result);
        return result;

      } else {
        pcvpc = true;
        playerAWeapon = this.generateWeapon();
        playerBWeapon = this.generateWeapon();
        this.updatePlayerAWeapon(playerAWeapon);
        this.updatePlayerBWeapon(playerBWeapon);
        result = this.determineResult(playerAWeapon, playerBWeapon);

        resultMessage = this.createResultMessagePC(result, playerAWeapon, playerBWeapon);
        this.updateResultToUi(resultMessage, result);

        return result;
      }

    },

    // create a message to show user after the match is finished!
    createResultMessage : function(result, playerAWeapon, playerBWeapon){

      var message = "";

      if(result === 'playerA'){
        message += 'Well done! You won.'
      } else if (result === 'playerB'){
        message += 'Doh! You lost.'
      } else {
        message += 'You drew! Better play again.'
      }

      message+= ' You played ' + playerAWeapon + ' and the computer played ' + playerBWeapon + '.'; 

      return message;

    },

    createResultMessagePC : function(result, playerAWeapon, playerBWeapon){

      var message = "";

      if(result === 'playerA'){
        message += 'Player A won!'
      } else if (result === 'playerB'){
        message += 'Player B won!'
      } else {
        message += 'It was a draw! Better play again.'
      }

      message+= ' Player A shot ' + playerAWeapon + ' and Player B shot ' + playerBWeapon + '.'; 

      return message;

    },

    // mock a countdown and update the UI with the results
    updatePlayerBWeapon : function(weapon){

      document.getElementById('computer-play').className = "";

      document.getElementById('player-b-weapon').textContent = "3";

      // remove ability to click weapons


      setTimeout(function() {
        document.getElementById('player-b-weapon').textContent = "2"
      }, 1000);

      setTimeout(function() {
        document.getElementById('player-b-weapon').textContent = "1"
      }, 2000);

      setTimeout(function() {
        document.getElementById('player-b-weapon').textContent = weapon;
      }, 3000);

      setTimeout(function() {
        document.getElementById('computer-play').className = "hidden";
        // bring back the play button
        document.getElementById('play-game').className = "";
      }, 5000);
        
      
    },

    // test it
    updatePlayerAWeapon : function(weapon){
      if(!pcvpc){
        document.getElementById('player-a-weapon').textContent = weapon;
      } else {

        document.getElementById('player-a-weapon').textContent = "3";

        setTimeout(function() {
          document.getElementById('player-a-weapon').textContent = "2"
        }, 1000);

        setTimeout(function() {
          document.getElementById('player-a-weapon').textContent = "1"
        }, 2000);

        setTimeout(function() {
          document.getElementById('player-a-weapon').textContent = weapon;
        }, 3000);

      }
    },

    // update the user weapon element
    updateUserWeapon : function(weapon){
      document.getElementById('user-weapon').textContent = weapon;
    },

    // update the game result message element with a message
    updateResultToUi: function(resultMessage, result){

      setTimeout(function() {
        var resultEle = document.getElementById('game-result-message');
        resultEle.textContent = resultMessage;
        document.getElementById('game-result').className = "";

        if(result === 'playerA'){
          resultEle.className = 'win';
        } else if (result === 'draw'){
          resultEle.className = 'draw';
        } else if (result === 'playerB'){
          resultEle.className = 'loss';
        }

      }, 3000);

    }

     
  }
}