(function () {

  var storer = Storage();
  var interactions = Interactions();
  var game = Game();
  var result;

	// user selected value from storage on page load
	interactions.setSelectedUsername(storer.getSelectedUser());

	// get user data for selected  user
	var userData = storer.getUserData(storer.getSelectedUser());

  // put it into the results table
	interactions.populateUserDataTable(userData);

  // attach event listeners:

  interactions.attachSelectWeapenEvents();

  document.getElementById('play-game').onclick = function() {

    interactions.detachSelectWeapenEvents();
    
    var weapon = document.getElementById('user-weapon').textContent;

    result = game.play(weapon);


    setTimeout(function() {
      // update result in store
      storer.updateData(userData, result);
      // update result in UI
      interactions.populateUserDataTable(userData);
    },3000);

    setTimeout(function(){
      // add the interactions back
      interactions.attachSelectWeapenEvents();
    }, 5000);

  }


})();