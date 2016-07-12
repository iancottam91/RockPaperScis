// logic for winning or losing the game
function Game () {

  var playerAWeapon;
  var playerBWeapon;
  var result;
  var choices = ['rock', 'paper', 'scissors'];


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

    // return result to update record with storer object
    play: function(weapon){

      if(weapon !== undefined){

        playerAWeapon = weapon;
        playerBWeapon = this.generateWeapon();
        this.updatePlayerBWeapon(playerBWeapon);
        result = this.determineResult(playerAWeapon, playerBWeapon);
        this.updateResultToUi(result);
        return result;

      } else {
        playerAWeapon = this.generateWeapon();
        playerBWeapon = this.generateWeapon();
        this.updatePlayerAWeapon(playerAWeapon);
        this.updatePlayerBWeapon(playerBWeapon);
        result = this.determineResult(playerAWeapon, playerBWeapon);
        return result;
      }

    },

    // test it
    updatePlayerBWeapon : function(weapon){
      document.getElementById('player-b-weapon').textContent = weapon;
    },

    // test it
    updatePlayerAWeapon : function(weapon){
      document.getElementById('player-a-weapon').textContent = weapon;
    },

    // test it
    updateResultToUi: function(result){
      document.getElementById('game-result-message').textContent = result;
    }

     
  }
}