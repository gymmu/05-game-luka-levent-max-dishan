import { k, addGeneralGameLogic } from "../game.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { playerHardcore } from "./intro.js"
import { TILESIZE } from "../globals.js"

import "./finish.js"
import "./lose.js"
import { overworldMusic } from "./level-01.js"

export const bossMusic = play("bossFight", {
  loop: true,
  volume: 0.5,
  paused: true,
})

let timeout = false

k.scene("level-09", async () => {
  k.setGravity(1200)
  loadKeyboardJumpAndRun()
  await generateMapJumpAndRun("maps/level-09.txt")

  overworldMusic.paused = true
  bossMusic.paused = false

  k.add([
    k.sprite("background", { width: k.width(), height: k.height() }),
    k.pos(0, 0),
    k.z("-100"),
    k.fixed(),
  ])

  addGeneralGameLogic()

  k.onCollide("player", "goal", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("finish")
  })

  k.onKeyRelease("0", () => {
    k.play("teleport", { volume: 0.5 })
    //k.go("finish")
  })
  let healPlayer = false

  let minusScore = false

  k.onUpdate(() => {
    const player = k.get("player")[0]
    if (healPlayer === true) {
      player.heal(100)
      healPlayer = false
    }
    if (minusScore === true) {
      if (player.score >= 5) {
        player.score -= 5
        minusScore = false
      } else {
        minusScore = false
        player.score = 0
      }
    }
    if (player.pos.y > 720) {
      if (playerHardcore === true) {
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(64, 128)
        minusScore = true
      }
    }
    player.on("death", () => {
      if (playerHardcore === true) {
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(64, 128)
        healPlayer = true
        minusScore = true
      }
    })
  })
})
