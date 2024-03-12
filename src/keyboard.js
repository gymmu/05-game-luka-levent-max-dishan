import { k } from "./game.js"
import { getPlayer } from "./player.js"
import { slash } from "./Combat.js"

/**
 * Diese Funktion lädt die Tastenbelegung wie sie pro Level sein soll. Die
 * generelle Steuerung für ein Jump'n'Run-Level ist immer etwa gleich, deshalb
 * laden wir sie hier in einer eigenen Funktion.
 */

// These are used for keeping track if the player is moving or not.
let movingLeft = false
let movingRight = false
export function loadKeyboardJumpAndRun() {
  const player = getPlayer()
  // On key press left, the player will play the runLeft animation.
  // If the code detects that the player should be moving left and right at the same time,
  // then the idleLeft animation will be played.
  k.onKeyPress("left", () => {
    player.play("runLeft")
    //This set movingLeft to true, storing that the player should now be moving left.
    movingLeft = true
    if (movingLeft === true && movingRight === true) {
      player.play("idleLeft")
    }
  })
  // Solange wie die Taste gedrückt wird, wird der Spieler in jedem Frame nach
  // links verschoben.
  k.onKeyDown("left", () => {
    player.move(k.LEFT.scale(player.speed))
  })
  // When the left key is released, the player will play the moving right animation,
  // if moveingRight is true.
  k.onKeyRelease("left", () => {
    if (movingRight === true) {
      player.play("runRight")
    } else {
      player.play("idleLeft")
    }
    //Because the key is now released, movingLeft is set to false.
    movingLeft = false
  })

  k.onKeyPress("right", () => {
    player.play("runRight")
    movingRight = true
    if (movingLeft === true && movingRight === true) {
      player.play("idleRight")
    }
  })

  k.onKeyDown("right", () => {
    player.move(k.RIGHT.scale(player.speed))
  })
  k.onKeyRelease("right", () => {
    if (movingLeft === true) {
      player.play("runLeft")
    } else {
      player.play("idleRight")
    }
    movingRight = false
  })

  k.onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump()
    }
  })

  k.onKeyPress("h", () => {
    slash()
  })

  onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
}

/**
 * Diese Funktion lädt die Tastenbelegung wie sie pro Level sein soll. Die
 * generelle Steuerung für ein RPG-Level ist immer etwa gleich, deshalb
 * laden wir sie hier in einer eigenen Funktion.
 *
 * Da wir uns hier anders bewegen können wie in einem Jump'n'Run, haben wir
 * extra eine weitere Funktion erstellt, wo all diese Funktionen drin sind, wie
 * zum Beispiel nach oben oder unten laufen.
 */
export function loadKeyboardRPG() {
  const player = getPlayer()
  k.onKeyPress("left", () => {
    player.play("runLeft")
  })
  k.onKeyDown("left", () => {
    player.move(k.LEFT.scale(player.speed))
  })
  k.onKeyRelease("left", () => {
    player.play("idleLeft")
  })

  k.onKeyPress("right", () => {
    player.play("runRight")
  })
  k.onKeyDown("right", () => {
    player.move(k.RIGHT.scale(player.speed))
  })
  k.onKeyRelease("right", () => {
    player.play("idleRight")
  })

  k.onKeyPress("up", () => {
    player.play("runUp")
  })
  k.onKeyDown("up", () => {
    player.move(k.UP.scale(player.speed))
  })
  k.onKeyRelease("up", () => {
    player.play("idleUp")
  })

  k.onKeyPress("down", () => {
    player.play("runDown")
  })
  k.onKeyDown("down", () => {
    player.move(k.DOWN.scale(player.speed))
  })
  k.onKeyRelease("down", () => {
    player.play("idleDown")
  })
}
