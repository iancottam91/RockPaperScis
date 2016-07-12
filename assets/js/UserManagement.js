// User model and methods to update user details during gameplay
function User(name){

  var userData = {
    name : name,
    wins : 0,
    losses: 0,
    draws: 0
  }

  return {
    getData : function () {
      return userData;
    },
    addWin: function (){}
  }

}


// Storage object - handle saving user data to storage and retrieving this data

function Storage(){
 
  return{

    // set selected user - keep this as a separate property for simplicity 
    setSelectedUser : function(name){

      sessionStorage.setItem( "rps_user_selected", name);

    },

    getSelectedUser : function(){

      return sessionStorage.getItem( "rps_user_selected");

    },

    getUserData : function(username){

      function checkName(ele){
        // this will use name value from function parameter
        if(ele.name === username){
          return true;
        } else {
          return false;
        }
      }
      
      var allUserData = sessionStorage.getItem("rps_user_data");

      if(allUserData !== undefined && allUserData !== null){
        var users = JSON.parse( allUserData );
        return users.filter(checkName)[0];
      } else{
        return false;
      }
    },

    // take a user data object and overwrite existing object with it
    setUserData: function(data){

      // get all data
      // remove existing piece of data
      // add the new one

      var users;

      function removeExisitingEntry(ele){
        // this will use name value from function parameter
        if(ele.name === data.name){
          return false;
        } else {
          return true;
        }
      }

      var allUserData = sessionStorage.getItem("rps_user_data");

      if(allUserData !== undefined && allUserData !== null){
        users = JSON.parse( allUserData );
        users = users.filter(removeExisitingEntry);
        users.push(data);

        sessionStorage.setItem("rps_user_data", JSON.stringify(users) );
      } else{
        return false;
      }

    },

    // add a new User to storage
    addUser : function(data){

      // get existing data object
      var allUserData = sessionStorage.getItem("rps_user_data");
      var users;

      // if there is no object add it and create the user
      if(allUserData === undefined || allUserData === null){

        users = [];
        users.push(data);
        sessionStorage.setItem( "rps_user_data", JSON.stringify(users) );
      } else {
      
        users = JSON.parse( allUserData );

        // check if existing user exists - dont add a user twice
        if(this.userExists(data.name)){
          return false;

        } else if(users.length < 5){
          // if there are less than five users add the new one
          users.push(data);
          sessionStorage.setItem( "rps_user_data", JSON.stringify(users) );
        } else {
          return false;
        }

      }

    },

    // check to see if a user with a specified name already exists
    
    userExists : function(name){

      var allUserData = sessionStorage.getItem("rps_user_data");
      var users;
      var matches;

      function checkName(ele){
        // this will use name value from function parameter
        if(ele.name === name){
          return true;
        } else {
          return false;
        }
      }

      if(allUserData === undefined || allUserData === null){
        return false;
      } else {

        users = JSON.parse( allUserData );
        matches = users.filter(checkName);
        if(matches.length !== 0){
          return true
        } else {
          return false;
        }

      }

    },

    // clear all users from storage object
    deleteAllUsers : function(){
      sessionStorage.removeItem("rps_user_data");
    },

    // get all user data as JSON array
    getAllUsers : function(){
      return JSON.parse( sessionStorage.getItem("rps_user_data") );
    },

    // update a users data based on a result
    // data - the current data
    // the result
    updateData: function(data, result){

      // add a draw
      if(result === "draw"){
        data.draws += 1;
        // set this to storage
        this.setUserData(data);
        // console.log(data);
      } else if (result === "playerA"){
        data.wins += 1;
        this.setUserData(data);
      } else if (result === "playerB"){
        data.losses += 1;
        this.setUserData(data);
      }

    }

  }
 
}