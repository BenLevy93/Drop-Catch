var canvas = document.getElementById("myCanvas");
canvas_width = canvas.width;
canvas_height = canvas.height;
var context = canvas.getContext("2d");
let score;
let lives;
let lists;
let refreshIntervalId;
function drawItems({ itemsList, paraList, textScore, textLives }) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (lives > 0) {
    textScore.show(context, score);
    textLives.show(context, lives);
    paraList.forEach(parachut => {
      drawItem(parachut);
      parachut.move(boat.x, boat.y, boat.width);
    });
    itemsList.forEach(item => {
      drawItem(item);
      item.move(canvas);
    });

    requestAnimationFrame(drawItems.bind(null, lists));
  } else {
    textScore.show(context, score);
    endGame();
  }
}
function drawItem({ img, x, y }) {
  context.drawImage(img, x, y);
}
document.addEventListener("keydown", boatMove);
function boatMove(e) {
  const key = e.key;
  switch (key) {
    case "ArrowLeft":
      boat.move(canvas, -boat.speed);
      break;
    case "ArrowRight":
      boat.move(canvas, boat.speed);
      break;
    case "Enter":
      if (lives === 0) {
        startGame();
      }
  }
}
function endGame() {
  clearInterval(refreshIntervalId);
  lists.paraList = [];
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

function startGame() {
  lists = {};
  lives = 3;
  score = 0;
  lists.itemsList = initItems([]);
  lists.paraList = [];
  lists.textScore = new TextField("SCORE: ", 20, 20, "20px", "Consolas");
  lists.textLives = new TextField("LIVE: ", 20, 50, "20px", "Consolas");
  drawItems(lists);
  refreshIntervalId = setInterval(
    createParachut,
    Math.random() * 6000 + 1000,
    lists.paraList
  );
}

function initItems(items) {
  sea = new Item("resources/sea.png", 0, canvas_height * 0.75, 0, 0, 0);
  items.push(sea);
  boat = new Boat("resources/boat.png", 400, 340, 210, 150, 5);
  items.push(boat);
  plane = new Plane("resources/plane.png", canvas.width - 150, 15, 100, 0, 1);
  items.push(plane);
  return items;
}

function createParachut(list) {
  console.log("Hey" + new Date());
  list.push(
    new Parachut(
      "resources/parachutist.png",
      plane.x,
      plane.y,
      7,
      150,
      1.5,
      dropOrChatch.bind(null, list)
    )
  );
}

function dropOrChatch(list, param) {
  if (param) {
    score += 10;
  } else {
    lives--;
  }
  list.shift();
}
