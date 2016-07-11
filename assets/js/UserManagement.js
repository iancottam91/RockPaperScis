// User model and methods to update user details during gameplay
function User(name){

  var userData = {
    name : name,
    wins : 0,
    loses: 0,
    weaponPlayed : {
      'rock' : 0,
      'paper' : 0,
      'scissors' : 0
    }
  }

  return {
    getData : function () {
      return userData;
    }
  }

}

// Storage 

// storage structure:
// a) could use an array, but accessing the relevant user would require looping through - not very good performance wise
// could use JS filter on name
// b) could use the name a key - what about spec chars?

function Storage(){
 
  return{

    // get existing data object
    // if there is no data object add it and create user
    // else check if existing user exists
      // if it does, return false
      // if it doesn't and length < 5 add the user
      // if it doesn't and length >= 5 remove first user

    createUser : function(data){

      // get existing data object
      var allUserData = sessionStorage.getItem("rps_user_data");

      // if there is no object add it and create the user
      if(allUserData === undefined || allUserData === null){
        var users = [];
        users.push(data);
        sessionStorage.setItem( "rps_user_data", JSON.stringify(users) );
      }

    }

  }
 
}