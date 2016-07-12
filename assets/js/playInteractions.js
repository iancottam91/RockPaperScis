(function () {

  var storer = Storage();
  var interactions = Interactions();

	// user selected value from storage on page load
	interactions.setSelectedUsername(storer.getSelectedUser());

	// should come from the store
	var userData = storer.getUserData(storer.getSelectedUser());

	interactions.populateUserDataTable(userData);

	// get user data for selected  user


})();