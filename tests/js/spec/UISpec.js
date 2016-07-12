describe("User Interactions:", function() {

  jasmine.getFixtures().fixturesPath = 'src/fixtures/';

  var interactions = Interactions();

  describe("Adding User data", function(){

  	var userData = {
      name : 'Jo Smith',
      wins : 0,
      losses: 0,
      weaponPlayed : {
        'rock' : 0,
        'paper' : 0,
        'scissors' : 0
      }
    }

    var userDataTwo = {
      name : 'Ben Smith',
      wins : 1,
      losses: 3,
      weaponPlayed : {
        'rock' : 0,
        'paper' : 0,
        'scissors' : 0
      }
    }

    it(" can display a message saying there is no user data", function() {

      loadFixtures('usermessage.html');
      interactions.displayNoUserMessage();

      expect($('#no-data-message')).not.toHaveClass("hidden");
      expect($('#leaderboard-data')).toHaveClass("hidden");
      

    });

    it(" can display a table that will show the user data", function() {

      loadFixtures('usermessage.html');
      interactions.hideNoUserMessage();

      expect($('#no-data-message')).toHaveClass("hidden");
      expect($('#leaderboard-data')).not.toHaveClass("hidden");
      

    });

    it(" can add a table row of user data to the leaderboard table", function() {

      loadFixtures('usermessage.html');
      var leaderboard = document.getElementById('leaderboard-data-body');

      interactions.addLeaderboardEntry(userData, leaderboard);

      expect($('#leaderboard-data-body tr td').length).toEqual(4);
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
      weaponPlayed : {
        'rock' : 0,
        'paper' : 0,
        'scissors' : 0
      }
    }

    it(" can display data for a selected user.", function(){

      loadFixtures('userdata.html');
      interactions.populateUserDataTable(userData);
      expect($('#user-wins').text()).toEqual('10');
      expect($('#user-losses').text()).toEqual('3');

    });

    it(" users can select a game weapon, by clicking on the image for one.", function(){

      expect('a').toEqual('b');

    });

  })

});