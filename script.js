'use strict';
/** Todos
 * implement dice roll functionality
 * - generate random dice
 * - print random dice image based on the random dice number
 * - add dice roll to active player current score
 * - switch between players when dice roll hits number 1
 * ----------------------------------------------
 * implement holding score functionality
 * - add current score to the active player's score
 * - clear active player current score when player hit the hold button
 * - switch to the other player
 * ----------------------------------------------
 * implement player winning the game functionality
 * - first player to reache 100 point wins the game
 * - add winner css class to the winner player
 * - disable game buttons until a new game initiate
 * ----------------------------------------------
 * implement new game functionality
 * - reset every thing to initial game state
 */

/* DOM Elements */
const p1 = document.querySelector('[p-1]');
const p1Score = document.querySelector('[p-1-Score]');
const p1CurrentScore = document.querySelector('[p-1-CurrentScore]');
const p2 = document.querySelector('[p-2]');
const p2Score = document.querySelector('[p-2-Score]');
const p2CurrentScore = document.querySelector('[p-2-CurrentScore]');
const diceImg = document.querySelector('[diceImg]');
const diceBtn = document.querySelector('[diceBtn]');
const holdScoreBtn = document.querySelector('[holdScoreBtn]');
const newGameBtn = document.querySelector('[newGameBtn]');

/* Global Variabls */
let score, currentScore, isGaming, activePlayer;

// Helper Functions
const switchPlayer = () => {
  // clear active player current score and switch player
  currentScore = 0;
  document.querySelector(`[p-${activePlayer}-CurrentScore]`).textContent = 0;
  p1.classList.toggle('active');
  p2.classList.toggle('active');
  activePlayer = activePlayer === 1 ? 2 : 1;
};

/* implement dice roll functionality */

const dice = () => {
  if (isGaming) {
    // generate random dice
    const dice = Math.floor(Math.random() * 6) + 1;
    // print random dice image based on the random dice number
    diceImg.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // add dice roll to active player current score
      document.querySelector(`[p-${activePlayer}-CurrentScore]`).textContent =
        currentScore += dice;
    } else {
      switchPlayer();
    }
  }
};
diceBtn.addEventListener('click', dice);

/* implement holding score functionality */

const playerScore = () => {
  if (isGaming) {
    // add current score to the active player's score
    document.querySelector(`[p-${activePlayer}-Score]`).textContent = score[
      activePlayer - 1
    ] += currentScore;
    if (score[activePlayer - 1] >= 100) {
      // player win the game
      document.querySelector(`[p-${activePlayer}]`).classList.add('winner');
      document.querySelector(
        `[p-${activePlayer}-Score]`,
      ).style.cssText = `font-size: 5rem`;
      document.querySelector(
        `[p-${activePlayer}-Score]`,
      ).textContent = `Winner 🏆`;
      newGameBtn.textContent = `🔄 New Game`;
      isGaming = false;
    } else {
      switchPlayer();
    }
  }
};
holdScoreBtn.addEventListener('click', playerScore);

/* implement new game functionality */

const startNewGame = () => {
  isGaming = true;
  diceImg.src = '';
  score = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;
  p1.classList.add('active');
  p1.classList.remove('winner');
  p2.classList.remove('winner', 'active');
};
// startNewGame();
newGameBtn.addEventListener('click', startNewGame);
