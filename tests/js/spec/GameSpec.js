describe("A Game object ", function() {

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

  it("can update the UI with player Bs choice", function(){
    
  });

  it("can update the UI with the result", function(){

  });

  // 
  // it("return the result to update the store", function(){

  //   expect( results.includes(game.play('rock')) ).toBeTruthy();

  // });

  describe("Can play computer v computer", function(){

    it("Can run the play funciton without any parameters to achieve this", function(){



    });

  });


});