function Interactions () {

	return {

		populateTable: function(userData){

			var leaderboard = document.getElementById('leaderboard-data-body');
			// remove the old entries
			while (leaderboard.hasChildNodes()){
				leaderboard.removeChild(leaderboard.lastChild);
			}

			// populate the table if there is data, otherwise display message saying there is no data
			if(userData !== null){
				this.hideNoUserMessage();
				for(var i=0; i<userData.length; i++){
					this.addLeaderboardEntry(userData[i], leaderboard);
				}
			} else {
				this.displayNoUserMessage();
			}

		},

		// click on a weapon - update UI and return weapon value for use in the game object
		selectWeapon: function(weapon){
			document.getElementById('user-weapon').textContent= weapon;
			document.getElementById('player-b-weapon').textContent= "";

			
			var weaponContainers = document.getElementsByClassName('weapon-select');

			for(var i=0;i<weaponContainers.length; i++){
				var weapClasses = weaponContainers[i].className
				if(weapClasses.indexOf('select') >= 0){
					weaponContainers[i].className = "col-md-4 weapon-select";
				}
			}
		
			document.getElementById('select-' + weapon).className = 'col-md-4 weapon-select selected';
			document.getElementById('play-game').className = "";
			document.getElementById('play-message').textContent = '. Click below to play the game!'
			document.getElementById('computer-play').className = "hidden";

			return weapon;

		},

		detachSelectWeapenEvents: function(){

			var interactions = this;

			document.getElementById('select-rock').onclick = function() {

		  }
		  document.getElementById('select-paper').onclick = function() {

		  }
		  document.getElementById('select-scissors').onclick = function() {

		  }

		},

		attachSelectWeapenEvents: function(){

			var interactions = this;

			document.getElementById('select-rock').onclick = function() {
		    interactions.selectWeapon('rock');
		  }
		  document.getElementById('select-paper').onclick = function() {
		    interactions.selectWeapon('paper');
		  }
		  document.getElementById('select-scissors').onclick = function() {
		    interactions.selectWeapon('scissors');
		  }

		},

		displayInvalidUserMessage: function(){

			document.getElementById('invalid-user-message').className = "";

		},

		hideInvalidUserMessage: function(){

			document.getElementById('invalid-user-message').className = "hidden";

		},

		populateUserDataTable: function(userData){

			var userWins = document.getElementById('user-wins');
			userWins.textContent = userData.wins;

			var userLosses = document.getElementById('user-losses');
			userLosses.textContent = userData.losses;

			var userDraws = document.getElementById('user-draws');
			userDraws.textContent = userData.draws;

		},

		setSelectedUsername: function(username){

			if(username !== ""){

				// set value in txt
				document.getElementById("selected-user").textContent = username;
				// highlight column in table
				var rows = document.querySelectorAll("[data-row-username]");

				if(rows.length !== 0){
					for(var i=0;i<rows.length;i++){
						rows[i].className = "";
					}

					document.querySelectorAll("[data-row-username='"+ username +"']")[0].className = "selected";
				}
			}

		},

		addLeaderboardEntry: function(userData, leaderboard){

			// create a new div element 
		 	// and give it some content 
		  var newRow = document.createElement("tr"); 
		  newRow.setAttribute('data-row-username', userData.name);

		  // name field
		  var newNameField = document.createElement("td"); 
		  var newNameContent = document.createTextNode(userData.name); 
		  newNameField.appendChild(newNameContent);

		  // win field
		  var newWinField = document.createElement("td"); 
		  var newWinContent = document.createTextNode(userData.wins); 
		  newWinField.appendChild(newWinContent);

		  // loss field
		  var newLossField = document.createElement("td"); 
		  var newLossContent = document.createTextNode(userData.losses); 
		  newLossField.appendChild(newLossContent);

		  // draw field
		  var newDrawField = document.createElement("td"); 
		  var newDrawContent = document.createTextNode(userData.draws); 
		  newDrawField.appendChild(newDrawContent);

		  var selectField = document.createElement("td"); 
		  var selectButton = document.createElement("button");

		  selectButton.setAttribute('onclick','storer.setSelectedUser("'+userData.name+'"),interactions.setSelectedUsername("'+userData.name+'")');

		  var selectButtonTxt = document.createTextNode("Select User"); 
		  selectField.appendChild(selectButton);
		  selectButton.appendChild(selectButtonTxt);

		  newRow.appendChild(newNameField); //add the text node to the newly created div. 
		  newRow.appendChild(newWinField);
		  newRow.appendChild(newLossField);
		  newRow.appendChild(newDrawField);
		  newRow.appendChild(selectField);

		  // add the newly created element and its content into the DOM 
		  leaderboard.appendChild(newRow); 

		},

		displayNoUserMessage: function(){
			document.getElementById("leaderboard-data").className = "hidden";
			document.getElementById("ready-to-play").className = "hidden";
			document.getElementById("no-data-message").textContent = "Add a new user to begin playing."
		},

		hideNoUserMessage: function(){
			document.getElementById("no-data-message").textContent = "Add a new user. You can have up to 5 users.";
			document.getElementById("leaderboard-data").className = "";
			document.getElementById("ready-to-play").className = "";
		}

	}

}