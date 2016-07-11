describe("A User object ", function() {

  describe("sets user information:", function(){

    var Ian = User('Ian Cottam');


    it("by creating a user with a specified name", function() {

      expect('Ian Cottam').toEqual(Ian.getData().name);
      // console.log(store);

    });

  
  });

});