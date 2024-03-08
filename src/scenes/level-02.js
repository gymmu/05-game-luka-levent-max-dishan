import { k, addGeneralGameLogic } from "../game.js"
import { generateMapRPG } from "../map.js"
import { loadKeyboardRPG } from "../keyboard.js"

import "./level-03.js"
import "./lose.js"

/**
 * Szene für das Level 2.
 *
 * Hier gibt es keine Gravitation, wir sind hier in einem RPG-Setting.
 */
k.scene("level-02", async () => {
  k.setGravity(0)
  loadKeyboardRPG()

  await generateMapRPG("maps/level-02.txt")

  addGeneralGameLogic()

  k.onCollide("player", "cave", (player) => {
    if (player.hasFlower === true) {
    }
    k.go("level-03")
  })

  k.onCollide("player", "flower", (player, flower) => {
    flower.destroy()
    player.hasFlower = true
  })
})
k.onUpdate(() => {
  const player = k.get("player")[0]
  if (player.pos.y > 720) {
    k.go("lose")
  }
})
