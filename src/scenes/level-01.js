import { k, addGeneralGameLogic } from "../game.js"
import createPlayer from "../player.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"
import { TILESIZE } from "../globals.js"
import { playerHardcore } from "./intro.js"
import "./level-02.js"
import "./lose.js"
import { getPlayer } from "../player.js"

/** Das ist unser erstes Level. Hier können wir Dinge einstellen die nur für
 * dieses Level gelten sollen, und aber auch Funktionen verwenden die in allen
 * Levels gleich sind.
 *
 * Wir brauchen hier das Schlüsselwort `async` direkt vor der Funktion, weil
 * wir innerhalb der Funktion eine spezielle Funktion aufrufen und warten
 * müssen bis diese beendet ist. Dieses warten passiert mit dem Schlüsselwort
 * `await`.
 *
 * Bei diesem ersten Level handelt es sich um ein Jump'n'Run-Spiel. Da müssen
 * wir einige spezialisierte Funktionen verwenden.
 *
 */

//this variable is the background music for the overworld
export const overworldMusic = k.play("overworldMusic", {
  loop: true,
  volume: 0.3,
  paused: true,
})
k.scene("level-01", async () => {
  // Wir stellen die Gravitation ein, damit es sich um ein Jump'n'Run-Spiel
  // handelt.
  k.setGravity(1200)

  // Wir erstellen den Spieler
  createPlayer()

  // Wir laden die Tasenbelegung für ein Jump'n'Run-Spiel.
  loadKeyboardJumpAndRun()

  // Hier lassen wir die Spielwelt erstellen.
  // Wir müssen dieser Funktion auch den Spieler übergeben, damit die
  // Position vom Spieler richtig gesetzt werden kann.
  await generateMapJumpAndRun("maps/level-01.txt")

  k.add([
    k.sprite("background", { width: k.width(), height: k.height() }),
    k.pos(0, 0),
    k.z("-100"),
    k.fixed(),
    "backgroundTag",
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

  //setting this to false makes the overworld music start playing
  overworldMusic.paused = false

  // Hier wird zusätzliche Spiellogik erstellt, die nur in diesem Level
  // verwendet wird.
  // Hier ist es so das wenn der Spieler mit dem "goal" kollidiert, dann
  // kommen wir ins nächste Level.
  k.onCollide("player", "goal", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("level-02")
  })

  k.onKeyRelease("0", () => {
    k.play("teleport", { volume: 0.5 })
    k.go("level-02")
  })

  // Diese Funktion wird bei jedem Frame ausgeführt. Bei einem Jump'n'Run ist
  // es so das wenn der Spieler von einer PLattform stützt, dann hat man das
  // Spiel verloren. Man könnte hier auch anders darauf reagieren, zum
  // Beispiel den Spieler an einen Checkpoint zurück setzen, und die
  // Lebenspunkte von dem Spieler anpassen.
  let healPlayer = false
  let minusScore = false

  // This code will handle respawning and death.
  k.onUpdate(() => {
    const player = getPlayer()
    if (healPlayer === true) {
      player.heal(100)
      healPlayer = false
    }
    //this is a penalty for dying in normal mode, to prevent people from dying for fun
    //every time a player does die, 5 coins get removed, to prevent the score from going below 0
    //there's a if that checks for the score
    if (minusScore === true) {
      if (player.score >= 5) {
        player.score -= 5
        minusScore = false
      } else {
        minusScore = false
        player.score = 0
      }
    }
    if (player.pos.y > 720) {
      // If the player is in hardcore then going below 720y is handled normally.
      if (playerHardcore === true) {
        overworldMusic.paused = true
        k.play("death", { volume: 0.5 })
        k.go("lose")
        // If the player is not in hardcore then they are teleported back to safety.
      } else {
        player.pos = k.vec2(64, 14 * TILESIZE)

        minusScore = true
      }
    }
    player.on("death", () => {
      // Death is handled normally if the player is in hardcore.
      if (playerHardcore === true) {
        overworldMusic.paused = true
        k.play("death", { volume: 0.5 })
        k.go("lose")
        // If the player is not in hardcore then they are teleported back to safety and healed.
        // The healPlayer variable is used because otherwise the codes ends up repeatedly healing the player.
      } else {
        player.pos = k.vec2(64, 14 * TILESIZE)
        healPlayer = true

        minusScore = true
      }
    })
  })
})
