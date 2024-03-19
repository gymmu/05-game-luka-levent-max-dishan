import { k } from "../game.js"
import { getPlayer } from "../player.js"
import "./intro.js"
import "./level-03.js"

/**
 * Dies ist eine weitere Szene die angezeigt wird wenn das Spiel vorbei bzw.
 * gewonnen ist.
 */
k.scene("finish", () => {
  const player = getPlayer()
  player.destroy()
  k.add([
    k.text("Ziel erreicht", { size: 32, font: "sinko" }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ])

  k.onKeyPress("space", () => {
    k.go("intro")
  })
  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
})
