import * as PIXI from "pixi.js"

export default function createNewPixiApp(width,height, container){
    const size = [width, height];
    const loader = PIXI.Loader.shared;
    const Sprite = PIXI.Sprite;
    const Container = PIXI.Container;
    const ratio = size[0] / size[1];
  
    //Create the app:
    const app = new PIXI.Application({
      antialias: true,
      resizeTo: container,
      transparent: true
    })
    //app Settings
    app.renderer.autoResize = true;
    app.renderer.view.style.touchAction = 'auto';
    app.renderer.plugins.interaction.autoPreventDefault = false;
    app.renderer.resize(size[0], size[1]);

    container.appendChild(app.view);
  
    return {app, loader, Sprite, Container, ratio}
  }