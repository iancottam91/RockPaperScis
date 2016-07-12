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

		  var newNameField = document.createElement("td"); 
		  var newNameContent = document.createTextNode(userData.name); 
		  newNameField.appendChild(newNameContent);

		  var newWinField = document.createElement("td"); 
		  var newWinContent = document.createTextNode(userData.wins); 
		  newWinField.appendChild(newWinContent);

		  var newLossField = document.createElement("td"); 
		  var newLossContent = document.createTextNode(userData.losses); 
		  newLossField.appendChild(newLossContent);

		  var selectField = document.createElement("td"); 
		  var selectButton = document.createElement("button");

		  selectButton.setAttribute('onclick','storer.setSelectedUser("'+userData.name+'"),interactions.setSelectedUsername("'+userData.name+'")');

		  var selectButtonTxt = document.createTextNode("Select User"); 
		  selectField.appendChild(selectButton);
		  selectButton.appendChild(selectButtonTxt);

		  newRow.appendChild(newNameField); //add the text node to the newly created div. 
		  newRow.appendChild(newWinField);
		  newRow.appendChild(newLossField);
		  newRow.appendChild(selectField);

		  // add the newly created element and its content into the DOM 
		  leaderboard.appendChild(newRow); 

		},

		displayNoUserMessage: function(){
			document.getElementById("leaderboard-data").className = "hidden";
			document.getElementById("ready-to-play").className = "hidden";
			document.getElementById("no-data-message").className = ""
		},

		hideNoUserMessage: function(){
			document.getElementById("no-data-message").className = "hidden";
			document.getElementById("leaderboard-data").className = "";
			document.getElementById("ready-to-play").className = "";
		}

	}

}