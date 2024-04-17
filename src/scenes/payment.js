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
  k.add([
    k.text(
      "Scan QR code to access our ultra secure third party payment database.",
      {
        size: 22,
        font: "sans-serif",
      },
    ),
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
