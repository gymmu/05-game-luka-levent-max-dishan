import { k } from "../game.js"
import { getPlayer } from "../player.js"
import "./intro.js"
import "./level-06.js"
import { playerHardcore } from "./intro.js"
import { TILESIZE } from "../globals.js"
import { boss } from "../gameObjects.js"
import { bossMusic } from "./level-09.js"

let CutsceneState = 0

let Cutscene = [
  "They have warned you",
  "You didn't listen",
  "Now all that's left are ashes",
  "The dragon has been released",
  "AnD iT's AlL yOuR fAuLt",
]

k.scene("dragon", () => {
  k.add([
    k.sprite("dragonEnd", { width: k.width(), height: k.height() }),
    k.z(-100),
  ])

  k.add([
    sprite("pressEnter", { anim: "idle" }),
    pos(k.camPos().x - TILESIZE * 8, k.camPos().y - TILESIZE * -5.5),
    z(2),
    anchor("right"),
    "enter",
    scale(2),
  ])

  onUpdate(() => {
    if (isKeyReleased("enter")) {
      destroyAll("Cutscene")
      add([
        pos(k.camPos().x - TILESIZE * 8, k.camPos().y - TILESIZE * -4.5),
        z(2),
        color(255, 255, 255),
        text(Cutscene[CutsceneState], {
          size: 20, // 48 pixels tall
          width: TILESIZE * 16, // it'll wrap to next line when width exceeds this value
          font: "sans-serif", // specify any font you loaded or browser built-in
        }),
        "Cutscene",
      ])
      add([
        rect(TILESIZE * 16 + 4, TILESIZE * 3 + 4),
        outline(1),
        color(210, 180, 140),
        opacity(0.4),
        pos(k.camPos().x - TILESIZE * 8, k.camPos().y - TILESIZE * -4.5),
        "Cutscene",
      ])
      CutsceneState++
      if (CutsceneState === 1) {
        k.play("fire1", { volume: 0.5 })
      }
      if (CutsceneState === 2) {
        k.play("fire2", { volume: 0.5 })
      }
      if (CutsceneState === 3) {
        k.play("fire3", { volume: 0.5 })
      }
      if (CutsceneState === 4) {
        k.play("fire4", { volume: 0.5 })
      }
      if (CutsceneState === 5) {
        k.play("fire5", { volume: 0.5 })
      }

      if (CutsceneState > Cutscene.length) {
        destroyAll("Cutscene")
        k.go("intro")
        location.reload(true)
      }
    }
  })
  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
})
