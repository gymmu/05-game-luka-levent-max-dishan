import { k, addGeneralGameLogic } from "../game.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { playerHardcore } from "./intro.js"

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

  k.onKeyRelease("0", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("level-05")
  })
  let healPlayer = false
  k.onUpdate(() => {
    const player = k.get("player")[0]
    if (healPlayer === true) {
      player.heal(100)
      healPlayer = false
    }
    if (player.pos.y > 720) {
      if (playerHardcore === true) {
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(64, 128)
        if (player.score >= 5) {
          player.score -= 5
        } else {
          player.score -= player.score
        }
      }
    }
    player.on("death", async () => {
      if (playerHardcore === true) {
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(64, 128)
        healPlayer = true
        if (player.score >= 5) {
          player.score -= 5
        } else {
          player.score -= player.score
        }
      }
    })
  })
})
