import { k, addGeneralGameLogic } from "../game.js"
import { generateMapRPG } from "../map.js"
import { loadKeyboardRPG } from "../keyboard.js"

import "./level-06.js"
import "./lose.js"

k.scene("level-05", async () => {
  k.setGravity(0)
  loadKeyboardRPG()

  await generateMapRPG("maps/level-05.txt")

  addGeneralGameLogic()

  k.onCollide("player", "cave", (player) => {
    if (player.hasFlower === true) {
      k.play("teleport", { volume: 0.5 })
      k.go("level-06")
      player.pos = k.vec2(64, 128)
    }
  })

  k.onKeyPressRepeat("c", () => {
    k.onKeyRelease("0", () => {
      k.play("teleport", { volume: 0.5 })
      k.go("level-06")
    })
  })

  k.onCollide("player", "flower", (player, flower) => {
    flower.destroy()
    player.hasFlower = true
  })
})
