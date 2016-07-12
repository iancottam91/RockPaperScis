// (function () {

  var storer = Storage();
  var interactions = Interactions();
  var user;

  // take user data and populate the table

  
  // add user when clicking the add user btn
	document.getElementById('add-user-button').onclick = function() {

		var userName = document.getElementById('user-name-field').value;
		user = User(userName);
		storer.addUser(user.getData());

		// populate the table
		// handle error message
		interactions.populateTable(storer.getAllUsers());

		// store selected user
		storer.setSelectedUser(user.getData().name);

		// present selected user
		interactions.setSelectedUsername(user.getData().name);

	}

	// delete all users when click the delete user button
	document.getElementById('delete-users').onclick = function() {
  	storer.deleteAllUsers();
  	interactions.populateTable(storer.getAllUsers());
	}

	// clicking the select user button will store the new user and update the UI

	// populate the table from the user data
	interactions.populateTable(storer.getAllUsers());

	// user selected value from storage on page load
	interactions.setSelectedUsername(storer.getSelectedUser());



// })();