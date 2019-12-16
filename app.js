var canvas = document.getElementById("back");
var context = canvas.getContext("2d");
let score;
let lives;
let lists;
let refreshIntervalId;

function drawItems(lists) {
  ({ itemsList, paraList, textScore, textLives } = lists);
  context.clearRect(0, 0, canvas.width, canvas.height);
  //Always display score
  textScore.show(context, score);
  if (lives > 0) {
    textLives.show(context, lives);
    paraList.forEach(parachut => {
      drawItem(parachut);
      parachut.move(boat.x, boat.y, boat.width);
    });
    itemsList.forEach(item => {
      drawItem(item);
      item.move(canvas.width);
    });

    requestAnimationFrame(drawItems.bind(null, lists));
  } else {
    endGame();
  }
}

function drawItem({ img, x, y }) {
  context.drawImage(img, x, y);
}
//Move by arrows, when game over by pressing enter -> replay
document.addEventListener("keydown", boatMove);
function boatMove(e) {
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      boat.move(canvas.width, -boat.speed);
      break;
    case "ArrowRight":
      boat.move(canvas.width, boat.speed);
      break;
    case "Enter":
      if (lives === 0) {
        startGame();
      }
  }
}
//end game clean up
function endGame() {
  clearInterval(refreshIntervalId);
  lists = {};
  lives = 0;
  endText = new TextField("Game Over :(", 300, 200, "25px", "Consolas");
  endText.show(context, "");
  replayText = new TextField(
    "Play again? Just press ENTER :)",
    300,
    250,
    "25px",
    "Consolas"
  );
  replayText.show(context, "");
}
//start game
function startGame() {
  lists = {};
  lives = 3;
  score = 0;
  lists = initItems({});
  lists.paraList = [];
  drawItems(lists);
  //random plane drop
  refreshIntervalId = setInterval(
    createParachut,
    Math.random() * 3000 + 2000,
    lists.paraList
  );
}

function initItems(lists) {
  lists.itemsList = [];
  sea = new Item("resources/sea.png", 0, canvas.height * 0.78, 0, 0);
  lists.itemsList.push(sea);
  boat = new Boat("resources/boat.png", 400, canvas.height * 0.6, 210, 5);
  lists.itemsList.push(boat);
  plane = new Plane("resources/plane.png", canvas.width - 150, 15, 100, 1);
  lists.itemsList.push(plane);
  lists.textScore = new TextField("SCORE: ", 20, 20, "20px", "Consolas");
  lists.textLives = new TextField("LIVE: ", 20, 50, "20px", "Consolas");
  return lists;
}

function createParachut(list) {
  list.push(
    new Parachut(
      "resources/parachutist.png",
      plane.x,
      plane.y,
      0,
      1.5,
      dropOrChatch.bind(null, list)
    )
  );
}

function dropOrChatch(list, flag) {
  //Catch
  if (flag) {
    score += 10;
    //Miss
  } else {
    lives--;
  }
  list.shift();
}
