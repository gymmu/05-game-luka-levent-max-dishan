import { k, addGeneralGameLogic } from "../game.js"
import createPlayer from "../player.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { TILESIZE } from "../globals.js"
import "./finish.js"

k.scene("tutorial", async () => {
  k.setGravity(1200)

  createPlayer()

  loadKeyboardJumpAndRun()

  await generateMapJumpAndRun("maps/tutorial.txt")

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
        pos(player.pos.x + 1 * TILESIZE, player.pos.y),
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
    k.go("finish.js")
  })

  // Diese Funktion wird bei jedem Frame ausgeführt. Bei einem Jump'n'Run ist
  // es so das wenn der Spieler von einer PLattform stützt, dann hat man das
  // Spiel verloren. Man könnte hier auch anders darauf reagieren, zum
  // Beispiel den Spieler an einen Checkpoint zurück setzen, und die
  // Lebenspunkte von dem Spieler anpassen.
  let healPlayer = false

  k.onUpdate(() => {
    const player = k.get("player")[0]
    if (healPlayer === true) {
      player.heal(100)
      healPlayer = false
    }
    if (player.pos.y > 720) {
      player.pos = k.vec2(64, 128)
    }
    player.on("death", async () => {
      player.pos = k.vec2(64, 128)
      healPlayer = true
    })
  })
})
