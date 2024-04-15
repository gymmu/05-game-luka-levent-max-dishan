import { k, addGeneralGameLogic } from "../game.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { playerHardcore } from "./intro.js"

import "./lose.js"
import "./level-07.js"

k.scene("level-06", async () => {
  k.setGravity(1200)
  loadKeyboardJumpAndRun()
  await generateMapJumpAndRun("maps/level-06.txt")

  k.add([
    k.sprite("background", { width: k.width(), height: k.height() }),
    k.pos(0, 0),
    k.z("-100"),
    k.fixed(),
  ])

  addGeneralGameLogic()

  k.onCollide("player", "goal", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("level-07")
  })

  k.onKeyRelease("0", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("level-07")
  })
  let healPlayer = false

  let timeoutDeath = false

  k.onUpdate(() => {
    const player = k.get("player")[0]
    if (healPlayer === true) {
      player.heal(100)
      healPlayer = false
      timeoutDeath = false
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
    player.on("death", () => {
      if (playerHardcore === true) {
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(64, 128)
        healPlayer = true
        if (player.score >= 5 && timeoutDeath === false) {
          player.score -= 5
          timeoutDeath = true
        } else if (timeoutDeath === false) {
          player.score -= player.score
          timeoutDeath = true
        }
      }
    })
  })
})
