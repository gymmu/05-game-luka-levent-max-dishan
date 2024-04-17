import { k } from "../game.js"
import { getPlayer } from "../player.js"
import { playerHardcore } from "./intro.js"

import "./level-01.js"
import "./level-02.js"
import "./level-03.js"
import "./level-04.js"
import "./level-05.js"
import "./level-06.js"
import "./level-07.js"
/**
 * Diese Szene  wird verwendet wenn das Spiel verloren ist, also wenn der
 * Spieler gestorben ist.
 */
k.scene("lose", async () => {
  const player = getPlayer()

  k.add([
    k.text("Game over", { size: 44, font: "sans-serif" }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("bot"),
  ])

  k.add([
    k.text("Your score: " + player.endScore, { size: 32, font: "sans-serif" }),
    k.pos(k.width() / 2, k.height() / 2 + 20),
    k.anchor("center"),
  ])
  if (playerHardcore === true) {
    k.add([
      k.text("Hardcore Mode", {
        size: 64,
        font: "sans-serif",
      }),
      k.pos(k.width() / 2, k.height() / 2 - 120),
      k.anchor("center"),
    ])
  }
  k.add([
    k.text("Press Enter to restart", {
      size: 22,
      font: "sans-serif",
    }),
    k.pos(k.width() / 2, k.height() / 2 + 40),
    k.anchor("top"),
  ])

  k.onKeyPress("Enter", () => {
    k.go("intro")
    k.play("clicking", { volume: 0.5 })
    location.reload(true)
  })

  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })

  Promise.resolve().then(() => {
    player.destroy()
  })
})
