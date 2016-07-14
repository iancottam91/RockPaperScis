// (function () {

  var storer = Storage();
  var interactions = Interactions();
  var user;

  // take user data and populate the table

  function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    var userName = document.getElementById('user-name-field').value;
		user = User(userName);

		var canAddUser = storer.addUser(user.getData());

		if(canAddUser){
			interactions.hideInvalidUserMessage();
			// populate the table
			interactions.populateTable(storer.getAllUsers());

			// store selected user
			storer.setSelectedUser(user.getData().name);

			// present selected user
			interactions.setSelectedUsername(user.getData().name);
		} else {
			interactions.displayInvalidUserMessage();
		}

		// return false to stop default form submission
    return false;
  }

  var form = document.getElementById('add-user-form');
  form.addEventListener("submit", processForm);

	// delete all users when click the delete user button
	document.getElementById('delete-users').onclick = function() {
		interactions.hideInvalidUserMessage();
  	storer.deleteAllUsers();
  	interactions.populateTable(storer.getAllUsers());
	}

	// clicking the select user button will store the new user and update the UI

	// populate the table from the user data
	interactions.populateTable(storer.getAllUsers());

	// user selected value from storage on page load
	interactions.setSelectedUsername(storer.getSelectedUser());



// })();