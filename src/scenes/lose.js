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
  // This code was giving an error when trying to destroy the player.
  // I asked codium to fix the issue, and it returned the code seen here.
  // If the const is: "const player = k.get("player")[0]", it will not work.
  // Instead, you have to define "player" and then put a [0] after it, as seen above.
  // The player.length must also be more than 0
  // I don't fully understand why either of these things solve the problem, but they do.

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
    k.text("Press SPACE to restart", {
      size: 22,
      font: "sans-serif",
    }),
    k.pos(k.width() / 2, k.height() / 2 + 40),
    k.anchor("top"),
  ])

  k.onKeyPress("space", () => {
    k.go("intro")
    k.play("clicking", { volume: 1 })
    location.reload(true)
  })

  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })

  Promise.resolve().then(() => {
    player.destroy()
  })
})
