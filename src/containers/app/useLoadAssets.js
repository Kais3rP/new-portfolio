import { useState, useEffect } from "react"
import * as PIXI from "pixi.js"
import * as PIXISound from "pixi-sound"
import createNewPixiApp from "../../helpers/createNewPixiApp"
import water from "../../pics/water.jpg"
import ripple from "../../pics/ripple.png"
import clouds from "../../pics/clouds.jpg"
import fish4 from "../../pics/fish4.png"
import fish4_1 from "../../pics/fish4_1.png"
import fish4_2 from "../../pics/fish4_2.png"
import fish4_3 from "../../pics/fish4_3.png"
import fish4_4 from "../../pics/fish4_4.png"
import flowSound from "../../sound/flow.wav"
import dropSound from "../../sound/drop.wav"

export default function useLoadWhenReady (container){
  const [app, setApp] = useState(null);
  const [_firstContainer, set_firstContainer] = useState(null);
  const [_rippleSprite, set_rippleSprite] = useState(null);
  const [_waterSprite, set_waterSprite] = useState(null);
  const [_cloudsSprite, set_cloudsSprite] = useState(null);
  const [allFishes, setAllFishes] = useState([]);
  const [_titleText, set_titleText] = useState(null);
  const [_flowSound, set_flowSound] = useState(null);
  const [_dropSound, set_dropSound] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

//Effect that creates the pixi App, loads the assets and sets the basic app containers
useEffect(() => {
if (!container) return;
  const {
    app,
    loader,
    Sprite,
    Container,
  } = createNewPixiApp(window.visualViewport.width, window.visualViewport.height + 30, container)

  const firstContainer = new Container();

  //Assets loader
  loader
    .add("water", water)
    .add("ripple", ripple)
    .add("clouds", clouds)
    .add("fish4", fish4)
    .add("fish4_1", fish4_1)
    .add("fish4_2", fish4_2)
    .add("fish4_3", fish4_3)
    .add("fish4_4", fish4_4)
    .add("flowSound", flowSound)
    .add("dropSound", dropSound)
    .load(init)

  loader.onProgress.add(data => {
    //console.log(data.progress+"% Loaded")
    setLoadProgress(Math.ceil(data.progress))
  })

  loader.onComplete.add(() => {
    setHasLoaded(true);
  }
  )
  //Function fired on load assets complete
  function init(loader, resources) {
    //Sprites creation
    const waterSprite = new Sprite(resources.water.texture);
    const rippleSprite = new Sprite(resources.ripple.texture);
    resources.clouds.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT; //It's important that the wrap modeis initialized before the sprite creation and upload
    const cloudsSprite = new Sprite(resources.clouds.texture);
    //console.log(resources.clouds.texture.baseTexture.isPowerOfTwo)

    const style = new PIXI.TextStyle({
      dropShadow: true,
      dropShadowAngle: 14,
      dropShadowBlur: 9,
      dropShadowColor: "#ff6600",
      dropShadowDistance: 70,
      fill: "none",
      fontFamily: "Helvetica",
      fontSize: 60,
      fontVariant: "small-caps",
      letterSpacing: 5,
      miterLimit: 20,
      lineJoin: "round",
      stroke: "none",
      strokeThickness: 9,
      textAlign:"center"
    });
    const titleText = new PIXI.Text('/HOME', style);
    const flowSound = PIXISound.default.Sound.from({
      url: resources.flowSound,
      loop: true,
      volume: 0.1,
      speed: 0.3,
      autoStart: false
    });
    const dropSound = PIXISound.default.Sound.from({
      url: resources.dropSound,
      autostart: false,
      volume: 0.1
    })
    const allFishes = [  
      {
        fish: new PIXI.AnimatedSprite([resources.fish4.texture, resources.fish4_1.texture, resources.fish4_2.texture, resources.fish4_1.texture, resources.fish4.texture, resources.fish4_3.texture, resources.fish4_4.texture, resources.fish4_3.texture]),
        direction: "right",
        startX: -window.innerWidth / 10,
        startY: window.innerHeight / 3,
      }
    ]

    app.stage.filterArea = app.screen;
    app.stage.addChild(firstContainer);
    firstContainer.interactive = true;
    firstContainer.addChild(rippleSprite, waterSprite, cloudsSprite, titleText);

    setApp(app);
    set_firstContainer(firstContainer);
    set_rippleSprite(rippleSprite);
    set_cloudsSprite(cloudsSprite);
    set_waterSprite(waterSprite);
    setAllFishes(allFishes)
    set_titleText(titleText)
    set_flowSound(flowSound)
    set_dropSound(dropSound)
  }
  return () => {
    //Clean all the PIXI WebGL assets on unmount 
    app.destroy({
      children: true,
      texture: true,
      baseTexture: true}
); 
  }
}, [container])

return ({
  app, _firstContainer, _rippleSprite, _cloudsSprite, _waterSprite, allFishes, _titleText, _flowSound, _dropSound, loadProgress, hasLoaded 
})
}