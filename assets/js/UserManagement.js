// User model and methods to update user details during gameplay
function User(name){

  var userData = {
    name : name,
    wins : 0,
    losses: 0,
    weaponPlayed : {
      'rock' : 0,
      'paper' : 0,
      'scissors' : 0
    }
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
    }

  }
 
}