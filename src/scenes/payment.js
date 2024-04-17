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
k.scene("payment", async () => {
  const player = getPlayer()
  // This code was giving an error when trying to destroy the player.
  // I asked codium to fix the issue, and it returned the code seen here.
  // If the const is: "const player = k.get("player")[0]", it will not work.
  // Instead, you have to define "player" and then put a [0] after it, as seen above.
  // The player.length must also be more than 0
  // I don't fully understand why either of these things solve the problem, but they do.

  k.add([
    k.text("Scan QR code to access a secure third party payment database.", {
      size: 22,
      font: "sans-serif",
    }),
    k.pos(k.width() / 2, k.height() / 3),
    k.anchor("bot"),
  ])

  k.add([
    k.sprite("pay", { width: k.width(), height: k.height() }),
    k.pos(330, 200),
    k.scale(1.5),
    k.z("-100"),
    k.fixed(),
    "backgroundTag",
  ])
  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
})
