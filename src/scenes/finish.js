import { k } from "../game.js"
import { getPlayer } from "../player.js"
import "./intro.js"
import "./level-06.js"
import { playerHardcore } from "./intro.js"
import { bossMusic } from "./level-09.js"

/**
 * Dies ist eine weitere Szene die angezeigt wird wenn das Spiel vorbei bzw.
 * gewonnen ist.
 */
k.scene("finish", () => {
  bossMusic.paused = true

  const player = getPlayer()
  player.destroy()
  k.add([
    k.text("Win", { size: 44, font: "sans-serif" }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("bot"),
  ])
  k.add([
    k.text("Your score: " + player.endScore, { size: 32, font: "sans-serif" }),
    k.pos(k.width() / 2, k.height() / 2 + 20),
    k.anchor("center"),
  ])
  k.add([
    k.text(
      "Press SHIFT and M in your next playthrough to uncensor all dialouges",
      { size: 16, font: "sans-serif" },
    ),
    k.pos(k.width() / 2, k.height() / 2 + 80),
    k.anchor("center"),
  ])
  if (playerHardcore === true) {
    k.add([
      k.text("Hardcore Mode", {
        size: 32,
        font: "sans-serif",
      }),
      k.pos(k.width() / 2, k.height() / 2 - 80),
      k.anchor("center"),
    ])
  }
  k.add([
    k.text("Press SPACE to continue", { size: 22, font: "sans-serif" }),
    k.pos(k.width() / 2, k.height() / 2 + 40),
    k.anchor("top"),
  ])
  k.onKeyPress("space", () => {
    k.play("clicking", { volume: 0.5 })
    k.go("dragon")
  })
  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
})
