let stage, loader, flappy;

const init = () => {
  stage = new createjs.Stage("gameCanvas");
  
  createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", stage);

  const background = new createjs.Shape();
  background.graphics.beginLinearGradientFill(["#257388", "#6C88DA", "#567A32"], [0, 0.8, 0.83], 0, 0, 0, 480).drawRect(0, 0, 320, 480);
  background.x = 0;
  background.y = 0;
  background.name = "background";
  background.cache(0, 0, 320, 480);

  stage.addChild(background);

  let manifest = [
    {"src": "cloud.png", "id": "cloud"},
    {"src": "flappy.png", "id": "flappy"},
    {"src": "pipe.png", "id": "pipe"}
  ];

  loader = new createjs.LoadQueue(true);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, './assets/');
}

const handleComplete = () => {
  createClouds();
  createFlappy();
  createPipes();
  stage.on("stagemousedown", jumpFlappy);
}

const createClouds = () => {
  let clouds = [];
  for (let i = 0; i<3; i++) {
    clouds.push(new createjs.Bitmap(loader.getResult("cloud")));
  }
  clouds[0].x = 40;
  clouds[0].y = 20;
  clouds[1].x = 140;
  clouds[1].y = 70;
  clouds[2].x = 100;
  clouds[2].y = 130;

  for (let i = 0; i < 3; i++) {
    let directionMultiplier = i % 2 == 0 ? -1: 1;
    let [oX, oY] = [clouds[i].x, clouds[i].y];
    createjs.Tween.get(clouds[i], {loop: true})
    .to({x: clouds[i].x-(200*directionMultiplier)}, 3000, createjs.Ease.getPowInOut(2))
    .to({x: oX}, 3000, createjs.Ease.getPowInOut(2));
    stage.addChild(clouds[i]);
  }
}

const createFlappy = () => {
  flappy = new createjs.Bitmap(loader.getResult("flappy"));
  flappy.regX = flappy.image.width / 2;
  flappy.regY = flappy.image.height / 2;
  flappy.x = stage.canvas.width / 2;
  flappy.y = stage.canvas.height / 2;
  stage.addChild(flappy)
}

const jumpFlappy = () => {
  createjs.Tween.get(flappy, {override: true})
  .to({y: flappy.y - 60, rotation: -10}, 500, createjs.Ease.getPowOut(2))
  .to({y: stage.canvas.height + (flappy.image.width / 2), rotation: 30}, 1500, createjs.Ease.getPowIn(2))
  .call(gameOver);
}

const createPipes = () => {
  let topPipe, bottomPipe;
  let position = Math.floor(Math.random()*280+100);

  topPipe = new createjs.Bitmap(loader.getResult("pipe"));
  topPipe.y = position-75;
  topPipe.x = stage.canvas.width / 2;
  topPipe.rotation = 180
  topPipe.name = "pipe";

  bottomPipe = new createjs.Bitmap(loader.getResult("pipe"));
  bottomPipe.y = position+75;
  bottomPipe.x = stage.canvas.width / 2;
  bottomPipe.skewY = 180;
  bottomPipe.name = "pipe";

  topPipe.regX = bottomPipe.regX = topPipe.image.width / 2;

  stage.addChild(bottomPipe, topPipe)
}

const gameOver = () => {
  console.log("Game Over")
} 