(function () {

  var interactions = Interactions();
  var game = Game();
  var weapon;
  var result;

  // attach event listeners:

  document.getElementById('play-pc-v-pc').onclick = function() {

    result = game.play();

    // update result in UI
    console.log(result);

  }


})();