describe("A Storage object ", function() {

  describe("stores user details.", function(){

    var store = {};

    // this allows us to mock the use of local storage in our tests
    beforeEach(function(){

      spyOn(sessionStorage, 'getItem').and.callFake(function(key){
        return store[key];
      });

      spyOn(sessionStorage, 'setItem').and.callFake(function(key, value){
        return store[key] = value + '';
      });

      spyOn(sessionStorage, 'clear').and.callFake(function(key){
        store = {};
      });

    });

    it("It stores a user if there is no user data at all", function() {

      var storer = Storage();
      var userData = {
        name : 'Jo Smith',
        wins : 0,
        loses: 0,
        weaponPlayed : {
          'rock' : 0,
          'paper' : 0,
          'scissors' : 0
        }
      }

      // create a user and save it to the storage
      storer.createUser(userData);

      expect( JSON.parse(store['rps_user_data'])[0] ).toEqual(userData);


    });

    it("It wipes all user data", function(){

      expect( JSON.parse(store['rps_user_data'])).toEqual('');

    });

    it("It gets all user data for display.", function(){

      expect( JSON.parse(store['rps_user_data'])).toEqual('');

    });
  
  });

});