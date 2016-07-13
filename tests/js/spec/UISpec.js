describe("User Interactions:", function() {

  jasmine.getFixtures().fixturesPath = 'src/fixtures/';

  var interactions = Interactions(); 

  describe("Adding User data", function(){

  	var userData = {
      name : 'Jo Smith',
      wins : 0,
      losses: 0,
      draws: 0
    }

    var userDataTwo = {
      name : 'Ben Smith',
      wins : 1,
      losses: 3,
      draws: 0
    }

    it(" can display an error message when an invalid user is entered or too many are added.", function() {

      loadFixtures('usermessage.html');
      interactions.displayInvalidUserMessage();

      expect($('#invalid-user-message')).not.toHaveClass("hidden");


    });

    it(" can hide the invalid user message.", function() {

      loadFixtures('usermessage.html');
      interactions.displayInvalidUserMessage();
      expect($('#invalid-user-message')).not.toHaveClass("hidden");
      interactions.hideInvalidUserMessage();

      expect($('#invalid-user-message')).toHaveClass("hidden");


    });

    it(" can display a message saying there is no user data", function() {

      loadFixtures('usermessage.html');
      interactions.displayNoUserMessage();

      expect($('#no-data-message').text()).toBe("Add a new user to begin playing.");
      expect($('#leaderboard-data')).toHaveClass("hidden");
      

    });

    it(" can display a table that will show the user data", function() {

      loadFixtures('usermessage.html');
      interactions.hideNoUserMessage();

      expect($('#no-data-message').text()).toBe("Add a new user. You can have up to 5 users.");
      expect($('#leaderboard-data')).not.toHaveClass("hidden");
      

    });

    it(" can add a table row of user data to the leaderboard table", function() {

      loadFixtures('usermessage.html');
      var leaderboard = document.getElementById('leaderboard-data-body');

      interactions.addLeaderboardEntry(userData, leaderboard);

      expect($('#leaderboard-data-body tr td').length).toEqual(5);
      expect($('#leaderboard-data-body tr:first-child').data('row-username')).toEqual('Jo Smith');
      expect($('#leaderboard-data-body tr td:first-child').text()).toEqual('Jo Smith');
      expect($('#leaderboard-data-body tr td:nth-child(2)').text()).toEqual('0');

    });

    it(" can set selected username", function(){
    	loadFixtures('usermessage.html');

    	interactions.setSelectedUsername('Jo Smith');

    	// check txt
    	expect($('#selected-user').text()).toEqual('Jo Smith');

    	// check row highlighting
    	expect($('[data-row-username="Jo Smith"]')).toHaveClass('selected');

    	// set selected value in local storage

    })

    it(" remove old entries from the table and replace them with new data", function() {

      loadFixtures('usermessagefull.html');
      interactions.populateTable([userData, userDataTwo]);
      expect($('#leaderboard-data-body tr').length).toEqual(2);
      expect($('#leaderboard-data-body tr td:first-child').text()).toEqual('Jo SmithBen Smith');
      expect($('#leaderboard-data-body tr td:nth-child(2)').text()).toEqual('01');

    });
  
  });


  describe("Game play interactions", function(){

    var userData = {
      name : 'Jo Smith',
      wins : 10,
      losses: 3,
      draws: 0
    }

    it(" can display data for a selected user.", function(){

      loadFixtures('userdata.html');
      interactions.populateUserDataTable(userData);
      expect($('#user-wins').text()).toEqual('10');
      expect($('#user-losses').text()).toEqual('3');
      expect($('#user-draws').text()).toEqual('0');

    });

    it(" users can select a game weapon, by clicking on the image for one.", function(){

      loadFixtures('selectweapon.html');
      expect($('#play-game')).toHaveClass('hidden');
      expect($('#play-message').text()).toBe('. Choose your weapon!');

      // select a weapon
      expect(interactions.selectWeapon('rock')).toEqual('rock');

      expect($('#user-weapon').text()).toEqual('rock');
      expect($('#player-b-weapon').text()).toEqual('');
      expect($('#select-rock')).toHaveClass('selected');
      expect($('#play-game')).not.toHaveClass('hidden');
      expect($('#play-message').text()).toBe('. Click below to play the game!');


    });

  })

});