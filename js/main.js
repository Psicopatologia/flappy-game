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
