import * as PIXI from "pixi.js"
import { CRTFilter } from "@pixi/filter-crt"

export default function setTvEffect(app, Container, spriteAlpha, ref, time, curvature, lineWidth, noise, noiseSize, contrast) {
    
    
    const container = new Container();
    const sprite = new PIXI.Graphics();
    const filter = new CRTFilter();
    
    sprite.position.set(0, 0)
    sprite.scale.set(1);
    sprite.beginFill(0x222222);
    sprite.lineStyle(5, 0x000000);
    sprite.drawRect(0, 0, ref.current.clientWidth, ref.current.clientHeight);
    sprite.alpha = spriteAlpha;
    filter.lineWidth = lineWidth;
    filter.noise = noise;
    filter.noiseSize = noiseSize;
    filter.curvature = curvature;
    filter.lineContrast = contrast;
    container.filters = [filter]
    container.addChild(sprite)
    app.stage.addChild(container);
    app.ticker.add(() => {
        filter.seed = Math.random();
        filter.time += time;
    })

    return sprite
}