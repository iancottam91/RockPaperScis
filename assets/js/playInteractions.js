(function () {

  var storer = Storage();
  var interactions = Interactions();
  var game = Game();
  var weapon;
  var result;

	// user selected value from storage on page load
	interactions.setSelectedUsername(storer.getSelectedUser());

	// get user data for selected  user
	var userData = storer.getUserData(storer.getSelectedUser());

  // put it into the results table
	interactions.populateUserDataTable(userData);

  // attach event listeners:

  document.getElementById('select-rock').onclick = function() {
    interactions.selectWeapon('rock');
    weapon = 'rock';
  }
  document.getElementById('select-paper').onclick = function() {
    interactions.selectWeapon('paper');
    weapon = 'paper';
  }
  document.getElementById('select-scissors').onclick = function() {
    interactions.selectWeapon('scissors');
    weapon = 'scissors';
  }

  document.getElementById('play-game').onclick = function() {
    result = game.play(weapon);

    // update result in store
    storer.updateData(userData, result);
    // update result in UI
    interactions.populateUserDataTable(userData);

  }


})();