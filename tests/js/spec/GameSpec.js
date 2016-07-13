describe("A Game object ", function() {

  jasmine.getFixtures().fixturesPath = 'src/fixtures/';
  jasmine.clock().install();

  var game = Game();
  var choices = ['rock', 'paper', 'scissors'];
  var results = ['draw', 'playerA', 'playerB'];


  it("can generate a random weapon", function(){


    expect( choices.includes(game.generateWeapon()) ).toBeTruthy();


  });

  describe("Can put any weapon against another one and determine the winner.", function() {

    it("Should return 'draw' if the weapons are the same", function(){

      expect(game.determineResult('rock', 'rock')).toBe('draw');
      expect(game.determineResult('paper', 'paper')).toBe('draw');
      expect(game.determineResult('scissors', 'scissors')).toBe('draw');

    });

    it("Should return 'playerA' if 'playerA' wins", function(){

      expect(game.determineResult('rock', 'scissors')).toBe('playerA');
      expect(game.determineResult('paper', 'rock')).toBe('playerA');
      expect(game.determineResult('scissors', 'paper')).toBe('playerA');

    });

    it("Should return 'playerB' if 'playerB' wins", function(){

      expect(game.determineResult('rock', 'paper')).toBe('playerB');
      expect(game.determineResult('paper', 'scissors')).toBe('playerB');
      expect(game.determineResult('scissors', 'rock')).toBe('playerB');

    });

  });

  describe("Can handle UI interactions", function(){

    it("can update the UI with player Bs choice", function(){
      
      loadFixtures('play.html');
      game.updatePlayerBWeapon('rock');
      expect($('#player-b-weapon').text()).toBe('3');

      jasmine.clock().tick(1000);    
      expect($('#player-b-weapon').text()).toBe('2');

      jasmine.clock().tick(1000);
      expect($('#player-b-weapon').text()).toBe('1');

      jasmine.clock().tick(1000);
      expect($('#player-b-weapon').text()).toBe('rock');

    });

    it("can update the User's Weapon", function(){

      loadFixtures('play.html');
      game.updateUserWeapon('rock');
      expect($('#user-weapon').text()).toBe('rock');

    });

    it("can add a result message to the UI", function(){

      loadFixtures('play.html');
      game.updateResultToUi('You drew! Better play again. You played paper and the computer played paper.', 'draw');
      jasmine.clock().tick(3000);
      expect($('#game-result-message').text()).toBe('You drew! Better play again. You played paper and the computer played paper.');
      expect($('#game-result-message')).toHaveClass('draw');

    });

    it("can add a result message to the UI for a win", function(){

      loadFixtures('play.html');
      game.updateResultToUi('Well done! You won. You played paper and the computer played rock.', 'playerA');
      jasmine.clock().tick(3000);
      expect($('#game-result-message').text()).toBe('Well done! You won. You played paper and the computer played rock.');
      expect($('#game-result-message')).toHaveClass('win');

    });

    it("complete a RPS game when you click the play button. Expect all the relevant fns to be called.", function(){

      loadFixtures('play.html');
        
      spyOn(game, 'updatePlayerAWeapon');
      spyOn(game, 'updatePlayerBWeapon');
      spyOn(game, 'updateResultToUi');
      spyOn(game, 'determineResult');
      spyOn(game, 'createResultMessage');

      game.play('rock');


      expect(game.updatePlayerAWeapon).toHaveBeenCalled();
      expect(game.updatePlayerAWeapon).toHaveBeenCalled();
      expect(game.updateResultToUi).toHaveBeenCalled();
      expect(game.determineResult).toHaveBeenCalled();
      expect(game.createResultMessage).toHaveBeenCalled();



      // Expect it to call all the relevant functions:
        // result = this.determineResult(playerAWeapon, playerBWeapon);
        // resultMessage = this.createResultMessage(result, playerAWeapon, playerBWeapon);

      // Expect it to return one of the valid results
      
    });

    it("complete a RPS game when you click the play button. Expect the result to be valid.", function(){

      var outcomes = ['playerA', 'playerB', 'draw'];

      loadFixtures('play.html');
      var outcome = game.play('rock');

      expect(outcomes.indexOf(outcome)).not.toBe(-1);

    });

    it("complete a RPS game when you click the play button PC V PC.", function(){

      loadFixtures('play.html');

      spyOn(game, 'updatePlayerAWeapon');
      spyOn(game, 'updatePlayerBWeapon');
      spyOn(game, 'updateResultToUi');
      spyOn(game, 'determineResult');
      spyOn(game, 'createResultMessagePC');
      
      game.play();

      // Expect it to call all the relevant functions

      expect(game.updatePlayerAWeapon).toHaveBeenCalled();
      expect(game.updatePlayerAWeapon).toHaveBeenCalled();
      expect(game.updateResultToUi).toHaveBeenCalled();
      expect(game.determineResult).toHaveBeenCalled();
      expect(game.createResultMessagePC).toHaveBeenCalled();

    });

    it("complete a RPS game when you click the play button PC V PC. Expect the result to be valid.", function(){

      var outcomes = ['playerA', 'playerB', 'draw'];

      loadFixtures('play.html');
      var outcome = game.play();

      expect(outcomes.indexOf(outcome)).not.toBe(-1);

    });

  });

  describe("can create a message to show the user based on the result.", function(){

    it("Consider rock v paper", function(){

      var result = 'playerA';
      var weaponA = 'rock';
      var weaponB = 'scissors';

      expect(game.createResultMessage(result, weaponA, weaponB)).toBe('Well done! You won. You played ' + weaponA + ' and the computer played ' + weaponB + '.');

    });

    it("Consider rock v paper", function(){

      var result = 'playerA';
      var weaponA = 'paper';
      var weaponB = 'rock';

      expect(game.createResultMessage(result, weaponA, weaponB)).toBe('Well done! You won. You played ' + weaponA + ' and the computer played ' + weaponB + '.');

    });

    it("Consider scissors v scissors", function(){

      var result = 'draw';
      var weaponA = 'scissors';
      var weaponB = 'scissors';

      expect(game.createResultMessage(result, weaponA, weaponB)).toBe('You drew! Better play again. You played ' + weaponA + ' and the computer played ' + weaponB + '.');

    });

    it("Consider scissors v rock", function(){

      var result = 'playerB';
      var weaponA = 'scissors';
      var weaponB = 'rock';

      expect(game.createResultMessage(result, weaponA, weaponB)).toBe('Doh! You lost. You played ' + weaponA + ' and the computer played ' + weaponB + '.');

    });


  });

describe("can create a message to show the user based on the result for PC v PC.", function(){

    it("Consider rock v paper", function(){

      var result = 'playerA';
      var weaponA = 'rock';
      var weaponB = 'scissors';

      expect(game.createResultMessagePC(result, weaponA, weaponB)).toBe('Player A won! Player A shot '+ weaponA +' and Player B shot '+ weaponB +'.');

    });

    it("Consider rock v paper", function(){

      var result = 'playerA';
      var weaponA = 'paper';
      var weaponB = 'rock';

      expect(game.createResultMessagePC(result, weaponA, weaponB)).toBe('Player A won! Player A shot '+ weaponA +' and Player B shot '+ weaponB +'.');

    });

    it("Consider scissors v scissors", function(){

      var result = 'draw';
      var weaponA = 'scissors';
      var weaponB = 'scissors';

      expect(game.createResultMessagePC(result, weaponA, weaponB)).toBe('It was a draw! Better play again. Player A shot '+ weaponA +' and Player B shot '+ weaponB +'.');

    });

    it("Consider scissors v rock", function(){

      var result = 'playerB';
      var weaponA = 'scissors';
      var weaponB = 'rock';

      expect(game.createResultMessagePC(result, weaponA, weaponB)).toBe('Player B won! Player A shot '+ weaponA +' and Player B shot '+ weaponB +'.');

    });


  });

});