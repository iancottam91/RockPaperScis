(function () {

  var storer = Storage();

  // take user data and populate the table
	function populateTable(userData){

		
		var leaderboard = document.getElementById('leaderboard-data-body');
		// remove the old entries
		while (leaderboard.hasChildNodes()){
			leaderboard.removeChild(leaderboard.lastChild);
		}

		// populate the table if there is data, otherwise display message saying there is no data
		if(userData !== null){
			hideNoUserMessage();
			for(var i=0; i<userData.length; i++){
				addLeaderboardEntry(userData[i], leaderboard);
			}
		} else {
			displayNoUserMessage();
		}

	}

	function addLeaderboardEntry (userData, leaderboard) { 
  // create a new div element 
	  // and give it some content 
	  var newRow = document.createElement("tr"); 

	  var newNameField = document.createElement("td"); 
	  var newNameContent = document.createTextNode(userData.name); 
	  newNameField.appendChild(newNameContent);

	  var newWinField = document.createElement("td"); 
	  var newWinContent = document.createTextNode(userData.wins); 
	  newWinField.appendChild(newWinContent);

	  var newLossField = document.createElement("td"); 
	  var newLossContent = document.createTextNode(userData.losses); 
	  newLossField.appendChild(newLossContent);

	  newRow.appendChild(newNameField); //add the text node to the newly created div. 
	  newRow.appendChild(newWinField);
	  newRow.appendChild(newLossField);

	  // add the newly created element and its content into the DOM 
	  leaderboard.appendChild(newRow); 
	}

	function displayNoUserMessage(){
		document.getElementById("leaderboard-data").className = "hidden";
		document.getElementById("no-data-message").className = ""
	}

	function hideNoUserMessage(){
		document.getElementById("no-data-message").className = "hidden";
		document.getElementById("leaderboard-data").className = "";
	}

  
  // add user when clicking the add user btn
	document.getElementById('add-user-button').onclick = function() {

		var userName = document.getElementById('user-name-field').value;
		var user = User(userName);
		storer.addUser(user.getData());

		// populate the table
		// handle error message
		populateTable(storer.getAllUsers());

	}

	// delete all users when click the delete user button
	document.getElementById('delete-users').onclick = function() {
  	storer.deleteAllUsers();
  	populateTable(storer.getAllUsers());
	}

	// populate the table from the user data
	populateTable(storer.getAllUsers());



})();