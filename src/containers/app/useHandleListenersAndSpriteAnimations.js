import { useState, useEffect } from "react"
import * as PIXI from "pixi.js"
import * as PIXISound from "pixi-sound"
import { gsap, TimelineMax } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { PixiPlugin } from "gsap/PixiPlugin"
import { GodrayFilter } from "@pixi/filter-godray"

export default function useHandleListenersAndSpritesAnimation(
    hasLoaded,
    isReady,
    setIsReady,
    app,
    _waterSprite,
    _cloudsSprite,
    _rippleSprite,
    allFishes,
    _dropSound,
    _firstContainer,
    _titleText,
    _flowSound,
    linkRefs) {

    const [isBallDeflating, setIsBallDeflating] = useState(false);
    const [rippleAnimation, setRippleAnimation] = useState(null);
    const [isMuted, setIsMuted] = useState(false);


    //Handling listeners resize, scroll, pointermove, and click events
    useEffect(() => {
        const mousePos = {
            x: 0,
            y: 0
        }

        if (hasLoaded) {

            _waterSprite.anchor.set(0.5);
            _waterSprite.width = app.renderer.view.width;
            _waterSprite.height = app.renderer.view.height;
            _waterSprite.position.set(window.innerWidth / 2, window.innerHeight / 2);
            _waterSprite.scale.set(1)
            _cloudsSprite.anchor.set(0.5);
            _cloudsSprite.scale.set((window.innerWidth / 1000), window.innerHeight / 1000);
            _cloudsSprite.position.set(0);
            _cloudsSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            const cloudsFilter = new PIXI.filters.DisplacementFilter(_cloudsSprite, window.innerWidth < 800 ? 50 : 50);
            const raysFilter = new GodrayFilter();

            _rippleSprite.anchor.set(0.5);
            _rippleSprite.scale.set(0.05);
            _rippleSprite.position.set(0, 0)
            const rippleFilter = new PIXI.filters.DisplacementFilter(_rippleSprite);
            rippleFilter.scale.set(100);
            _firstContainer.filters = [cloudsFilter, rippleFilter, raysFilter]
            const rippleTl = new TimelineMax()
                .to(_rippleSprite.scale, 3, { x: 2, y: 2 })
                .to(rippleFilter.scale, 3, { x: 2, y: 2 })
                .pause()
            setRippleAnimation(rippleTl);

            //Setting fishes sprites 
            function setFishSprite(fish, pos) {
                fish.anchor.set(0.5);
                fish.position.set(window.innerWidth / 2, (pos / 4) * window.innerHeight);
                fish.scale.set(0.3)
                fish.rotation = 0;
            }

            for (let i = 0; i < allFishes.length; i++)
                setFishSprite(allFishes[i].fish, i)

            _titleText.anchor.set(0.5)
            _titleText.position.set(window.innerWidth / 2 + 35, 200)

            //fishes
            //Assign a turning timeline to the fishes
            for (let fish of allFishes) {
                fish.fish.anchor.set(0.5);
                fish.fish.animationSpeed = 0.5;
                fish.fish.play()
                _firstContainer.addChild(fish.fish)
                fish.tlLeft =
                    new TimelineMax()
                        .to(fish.fish, { pixi: { scaleX: 0 }, duration: 0.3 })
                        .to(fish.fish, { pixi: { scaleX: -0.3 }, duration: 0.1 })
                fish.tlRight =
                    new TimelineMax()
                        .to(fish.fish, { pixi: { scaleX: 0 }, duration: 0.3 })
                        .to(fish.fish, { pixi: { scaleX: 0.3 }, duration: 0.1 })
            }

            //Fishes animations to follow the mouse pointer and to run back away to the starting positions 
            let fishFollowTl = new TimelineMax({})
                .to(allFishes.map(fish => fish.fish), 10, { x: () => mousePos.x, y: () => mousePos.y, ease: "M0,0 C0.476,0.134 0,-0.014 0.774,0.294 0.865,0.33 0.738,0.78 1,0.986 " })



            //Animate @ 60FPS
            app.ticker.add(moveWater);
            app.ticker.add(moveRays)
            app.ticker.add(animateFish);
            //This handles the rotation of the fishes toward the mouse pointer
            function animateFish() {
                //rotate on mouse move
                for (let fish of allFishes) {
                    if (fish.direction === "left") {
                        let dx = fish.fish.position.x - mousePos.x;
                        let dy = fish.fish.position.y - mousePos.y;
                        fish.fish.rotation = Math.atan2(dy, dx)
                    } else {
                        let dx = mousePos.x - fish.fish.position.x;
                        let dy = mousePos.y - fish.fish.position.y;
                        fish.fish.rotation = Math.atan2(dy, dx)
                    }
                }
            }

            function moveWater(delta) {
                _cloudsSprite.x += 2 * delta;
                _cloudsSprite.y += 2 * delta * 2;
            }

            function moveRays() {
                raysFilter.time += 0.03;
            }

            //EVENT LISTENERS

            window.addEventListener("resize", handleResize);
            window.addEventListener("pointermove", handleMouseMove);
            _firstContainer.addListener("pointerdown", handleWaterClick);

            function handleMouseMove(e) {
                mousePos.x = e.x;
                mousePos.y = e.y;
                fishFollowTl?.invalidate();
                fishFollowTl?.restart();

                //This handles the fish direction shift during mouse moving from left to right
                for (let fish of allFishes) {
                    if (fish.fish.position.x >= mousePos.x) {
                        if (fish.direction === "right")
                            fish.tlLeft.restart();
                        fish.direction = "left"
                    }
                    if (fish.fish.position.x <= mousePos.x) {
                        if (fish.direction === "left")
                            fish.tlRight.restart();
                        fish.direction = "right"
                    }
                }
            }


            function handleResize(e) {

                app.renderer.resize(e.target.innerWidth, e.target.innerHeight + 30);
            }

            function handleWaterClick(e) {
                console.log(e)
                let isReadyLocal;
                setIsReady(isReady => { isReadyLocal = isReady; return isReady });

                if (!isReadyLocal) return;
                const newRippleSprite = new PIXI.Sprite(PIXI.Loader.shared.resources.ripple.texture);
                _firstContainer.addChild(newRippleSprite);
                newRippleSprite.anchor.set(0.5);
                newRippleSprite.scale.set(0.05);
                newRippleSprite.position.x = e.data.global.x;
                newRippleSprite.position.y = e.data.global.y;
                const newRippleFilter = new PIXI.filters.DisplacementFilter(newRippleSprite);
                newRippleFilter.scale.set(100);
                _firstContainer.filters = [..._firstContainer.filters, newRippleFilter];
                new TimelineMax()
                    .to(newRippleSprite.scale, 3, { x: 2, y: 2 })
                    .to(newRippleFilter.scale, 3, { x: 2, y: 2 })
                _dropSound.play()
                //Animate fishes on mobile views where there is no mouse move animation
                if (window.innerWidth < 800) {
                    mousePos.x = e.data.global.x;
                    mousePos.y = e.data.global.y;
                    fishFollowTl?.invalidate();
                    fishFollowTl?.restart();

                    //This handles the fish direction shift during mouse moving from left to right
                    for (let fish of allFishes) {
                        if (fish.fish.position.x >= mousePos.x) {
                            if (fish.direction === "right")
                                fish.tlLeft.restart();
                            fish.direction = "left"
                        }
                        if (fish.fish.position.x <= mousePos.x) {
                            if (fish.direction === "left")
                                fish.tlRight.restart();
                            fish.direction = "right"
                        }
                    }
                }
            }




            return () => {
                window.removeEventListener("resize", handleResize)
            }
        }
    }, [hasLoaded])


    function handleMenuLinks(target, prevTarget) {
//console.log(target, prevTarget)
    if (!target || !prevTarget) return;    
        target = linkRefs[target + "LinkRef"].current
        prevTarget = linkRefs[prevTarget + "LinkRef"].current
  
       const containerHeight = target.parentNode.getBoundingClientRect().height;
        const diffPositionLinkContainer = target.getBoundingClientRect().y - target.parentNode.getBoundingClientRect().y;
            const linkRaise = new TimelineMax()
         .to(prevTarget, 1, { color: "#66ccff", y: 0, duration: 1, ease: "bounce" })
 

        const linkFall = new TimelineMax()
            .to(target, 1, {
                color: "#ff6600",
                y: containerHeight - diffPositionLinkContainer - 30, ease: "bounce"
            })


        if (window.innerWidth > 768) //Animates "Im here only" for big screens
            setIsBallDeflating(isBallDeflating => {
                if (!isBallDeflating)
                    inflate();
                return isBallDeflating
            })

    }


    function deflate() {

        new TimelineMax({ onStart: () => { setIsBallDeflating(true) }, onComplete: () => { setIsBallDeflating(false) } })
            .to(linkRefs.hereRef.current, { scale: 1, bottom: "43px", duration: 3.5, ease: "elastic" })
    }

    function inflate() {

        new TimelineMax()
            .to(linkRefs.hereRef.current, { scale: "+=0.3", bottom: "+=10px", duration: 0.7, visibility: "visible", modifiers: { scaleX: checkScaleX } })

        function checkScaleX(scale) {
            if (+scale >= 2.1) {
                this.kill();
                deflate();
                return 2.1;
            } else
                return scale
        }

    }

    function handleAudio() {
        console.log("Toggling audio", isMuted)
        setIsMuted(bool => !bool)   
    }
    return { handleMenuLinks, setRippleAnimation, handleAudio, isMuted, rippleAnimation }
}


