import { k, addGeneralGameLogic } from "../game.js"
import { generateMapRPG } from "../map.js"
import { loadKeyboardRPG } from "../keyboard.js"

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
    k.play("teleport", { volume: 0.5 })
    k.go("level-03")
    player.pos = k.vec2(64, 128)
  })

  k.onKeyRelease("0", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("level-03")
  })

  k.onCollide("player", "flower", (player, flower) => {
    flower.destroy()
    player.hasFlower = true
  })
})
