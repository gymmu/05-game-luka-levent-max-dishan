import { k, addGeneralGameLogic } from "../game.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { playerHardcore } from "./intro.js"
import { TILESIZE } from "../globals.js"

import "./level-05.js"
import "./lose.js"

k.scene("level-04", async () => {
  k.setGravity(1200)
  loadKeyboardJumpAndRun()
  await generateMapJumpAndRun("maps/level-04.txt")

  k.add([
    k.sprite("background", { width: k.width(), height: k.height() }),
    k.pos(0, 0),
    k.z("-100"),
    k.fixed(),
  ])

  addGeneralGameLogic()

  k.onCollide("player", "goal", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("level-05")
  })

  k.onKeyPressRepeat("c", () => {
    k.onKeyRelease("0", () => {
      k.play("teleport", { volume: 0.5 })
      k.go("level-05")
    })
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
        player.pos = k.vec2(64, 14 * TILESIZE)
        minusScore = true
      }
    }
    player.on("death", () => {
      if (playerHardcore === true) {
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(64, 14 * TILESIZE)
        healPlayer = true
        minusScore = true
      }
    })
  })
})
