import { k, addGeneralGameLogic } from "../game.js"
import createPlayer from "../player.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { TILESIZE } from "../globals.js"
import "./finish.js"

k.scene("level-tutorial", async () => {
  k.setGravity(1200)

  createPlayer()

  loadKeyboardJumpAndRun()

  await generateMapJumpAndRun("maps/level-tutorial.txt")

  k.add([
    k.sprite("background", { width: k.width(), height: k.height() }),
    k.pos(0, 0),
    k.z("-100"),
    k.fixed(),
  ])

  let oneTimeEvent = 0

  onCollide("player", "ground", (player, ground) => {
    if (oneTimeEvent < 1) {
      k.add([
        sprite("pressAD", { anim: "idle" }),
        pos(player.pos.x + 4 * TILESIZE, player.pos.y),
        z(-1),
        anchor("right"),
        scale(2),
      ])
      oneTimeEvent = oneTimeEvent + 1
    }
  })
  // Hier laden wir die generelle Spiellogik. Also was passieren soll wenn
  // der Spieler mit einem Objekt kollidiert.
  addGeneralGameLogic()

  // Hier wird zusätzliche Spiellogik erstellt, die nur in diesem Level
  // verwendet wird.
  // Hier ist es so das wenn der Spieler mit dem "goal" kollidiert, dann
  // kommen wir ins nächste Level.
  k.onCollide("player", "goal", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("intro")
    location.reload(true)
  })

  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
})
