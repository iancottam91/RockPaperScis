# RockPaperScis

## Testing framework:

- Jasmine - test all JS with this TDD/BDD framework
- css tests, create static views

## Design: 

### How to build the JS?

Rock, paper and scissor object?
Weapon object that acts as any of them?

Basic level:

1) Choose a weapon
2) Play the game
3) win or lose?

- set logic for winning and loosing
- think how to make this extensible

IDEAS:
- db to keep scoreline? Necessary to play for an hour
- Where to show off?

### Visual

#### Gameplay
- three column layout, item per column
- clicking an option will grey/fade out other items
- the one you click slides to the left of the screen to fill half width.
- there is a countdown and the computer loads his option randomly in the RHS
- perhaps flick through the options during countdown
- Green mesage for win, yellow for draw, red for loss

#### Weapons
- CCS transitions for snipping scissors
- stack of paper and take the top sheet
- static rock probably

#### PC V PC

- Could have LHS and RHS flash through all the images before stopping on the one selected, like a fruit machine.

### Hours of fun

- Store results in Local storage

#### AI

- check your past plays and choose the option that will beat most of them
- play the option that beats your last attempt
- easy - completely random
