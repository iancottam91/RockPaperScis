describe("A Storage object ", function() {

  describe("stores user details.", function(){

    // mock local store
    var store = {};
    // storage JS object
    var storer = Storage();

    // test user data
    var userOneData = {
      name : 'Jo Smith',
      wins : 0,
      losses: 0,
      draws: 0
    }
    
    beforeEach(function(){

      // this allows us to mock the use of local storage in our tests
      spyOn(localStorage, 'getItem').and.callFake(function(key){
        return store[key];
      });

      spyOn(localStorage, 'setItem').and.callFake(function(key, value){
        return store[key] = value + '';
      });

      spyOn(localStorage, 'clear').and.callFake(function(key){
        store = {};
      });

      spyOn(localStorage, 'removeItem').and.callFake(function(key){
        delete store[key];
      });

      // add a user for each scenario
      storer.addUser(userOneData);


    });

    afterEach(function(){

      store = {};

    });

    it("It wont let you add a user with no username", function() {

      var userNoNameData = {
        name : '',
        wins : 0,
        losses: 0,
        draws: 0
      }

      expect( storer.addUser(userNoNameData) ).toBeFalsy();


    });


    it("It stores a user if there is no user data at all", function() {

      expect( JSON.parse(store['rps_user_data'])[0] ).toEqual(userOneData);


    });

    it("It sets and gets the selected user to storage", function() {

      storer.setSelectedUser('Jo Smith');
      expect( store['rps_user_selected'] ).toEqual('Jo Smith');
      expect( storer.getSelectedUser()).toEqual('Jo Smith');


    });


    it("It adds a user to the exisiting data if there is some user data.", function() {

      var userTwoData = {
        name : 'Ben Smith',
        wins : 0,
        losses: 0,
        draws: 0
      }

      // create second user and save it to the storage
      storer.addUser(userTwoData);

      expect( JSON.parse(store['rps_user_data']) ).toEqual([userOneData, userTwoData]);


    });

    it("Can check to see if a user already exists", function(){

      expect(storer.userExists('Jo Smith')).toBeTruthy();
      expect(storer.userExists('Josh Smith')).toBeFalsy();

    });

    it("It wipes all user data", function(){


      // check first user is in the store
      expect( JSON.parse(store['rps_user_data'])[0] ).toEqual(userOneData);

      // then delete all users and expect that key to be undefinied
      storer.deleteAllUsers();
      expect( store['rps_user_data'] ).not.toBeDefined();


    });

    it("It gets a specific user's data for display", function(){

      var userTwoData = {
        name : 'Ben Smith',
        wins : 0,
        losses: 0,
        draws: 0
      }

      storer.addUser(userTwoData);

      storer.getUserData('Jo Smith');

      expect( storer.getUserData('Jo Smith') ).toEqual( userOneData );

    });

    it("It gets all user data for display.", function(){


      var userTwoData = {
        name : 'Ben Smith',
        wins : 0,
        losses: 0,
        draws: 0
      }

      storer.addUser(userTwoData);

      expect( storer.getAllUsers() ).toEqual([userOneData, userTwoData]);

    });

    it("It can update a user's data in the storage", function(){


      var userTwoData = {
        name : 'Ben Smith',
        wins : 0,
        losses: 0,
        draws: 1
      }
      storer.addUser(userTwoData);

      var userTwoData = {
        name : 'Jo Smith',
        wins : 1,
        losses: 2,
        draws: 3
      }

      storer.setUserData(userTwoData);

      expect(storer.getUserData('Jo Smith')).toEqual(userTwoData);


    });

    // describe("It can update user's data based on results", function(){

      it(" by adding a draw when there is a draw", function(){

        var result = 'draw';
        var updatedData = {
          name : 'Jo Smith',
          wins : 0,
          losses: 0,
          draws: 1
        }

        storer.updateData(userOneData, result);
        expect( storer.getUserData(userOneData.name) ).toEqual(updatedData);

      });

      it(" by adding a win when they win", function(){

        var result = 'playerA';
        var updatedData = {
          name : 'Jo Smith',
          wins : 1,
          losses: 0,
          draws: 1
        }

        storer.updateData(userOneData, result);
        expect( storer.getUserData(userOneData.name) ).toEqual(updatedData);
      });
      
      it(" by adding a loss when they loose", function(){

        var result = 'playerB';
        var updatedData = {
          name : 'Jo Smith',
          wins : 1,
          losses: 1,
          draws: 1
        }

        storer.updateData(userOneData, result);
        expect( storer.getUserData(userOneData.name) ).toEqual(updatedData);
      });

    // });
  
  });

});