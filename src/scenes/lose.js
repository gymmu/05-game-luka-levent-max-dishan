import { k } from "../game.js"

import "./level-01.js"
import "./level-02.js"
import "./level-03.js"
import "./level-04.js"
/**
 * Diese Szene  wird verwendet wenn das Spiel verloren ist, also wenn der
 * Spieler gestorben ist.
 */
k.scene("lose", () => {
  const player = k.get("player")
  // This code was giving an error when trying to destroy the player.
  // I asked codium to fix the issue, and it returned the code seen here.
  if (player.length > 0) {
    player[0].destroy()
  }
  // If the const is: "const player = k.get("player")[0]", it will not work.
  // Instead, you have to define "player" and then put a [0] after it, as seen above.
  // The player.length must also be more than 0
  // I don't fully understand why either of these things solve the problem, but they do.

  k.add([
    k.text("Game over", { size: 44 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("bot"),
  ])

  k.add([
    k.text("Drücke SPACE um das Spiel neu zu starten", {
      size: 22,
    }),
    k.pos(k.width() / 2, k.height() / 2 + 20),
    k.anchor("center"),
  ])

  k.onKeyPress("space", () => {
    k.go("level-01")
  })
})
