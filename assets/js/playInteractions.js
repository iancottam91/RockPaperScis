(function () {

  var storer = Storage();
  var interactions = Interactions();

	// user selected value from storage on page load
	interactions.setSelectedUsername(storer.getSelectedUser());

	// get user data for selected  user


})();