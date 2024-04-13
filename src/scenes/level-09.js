import { k, addGeneralGameLogic } from "../game.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { playerHardcore } from "./intro.js"
import { TILESIZE } from "../globals.js"

import "./finish.js"
import "./lose.js"

k.scene("level-09", async () => {
  k.setGravity(1200)
  loadKeyboardJumpAndRun()
  await generateMapJumpAndRun("maps/level-09.txt")

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
  k.onUpdate(() => {
    const player = k.get("player")[0]
    if (healPlayer === true) {
      player.heal(100)
      healPlayer = false
    }
    if (player.pos.y > 720) {
      if (playerHardcore === true) {
        import("./lose.js")
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(480, 128)
      }
    }
    player.on("death", async () => {
      if (playerHardcore === true) {
        await import("./lose.js")
        k.play("death", { volume: 0.5 })
        k.go("lose")
      } else {
        player.pos = k.vec2(480, 128)
        healPlayer = true
      }
    })
  })
})