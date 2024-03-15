import { k } from "./game.js"
import { getPlayer } from "./player.js"
import {
  leftSlash,
  rightSlash,
  leftProjectile,
  rightProjectile,
} from "./Combat.js"

/**
 * Diese Funktion lädt die Tastenbelegung wie sie pro Level sein soll. Die
 * generelle Steuerung für ein Jump'n'Run-Level ist immer etwa gleich, deshalb
 * laden wir sie hier in einer eigenen Funktion.
 */

// These are used for keeping track if the player is moving or not.
let movingLeft = false
let movingRight = false
// These are used to keep track of where the player is facing.
// whenever an idle animation is played, "facingRight" and "facingLeft" are updated
let facingRight = true
let facingLeft = false
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
      facingLeft = true
      facingRight = false
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
      facingLeft = true
      facingRight = false
    }
    //Because the key is now released, movingLeft is set to false.
    movingLeft = false
  })

  k.onKeyPress("right", () => {
    player.play("runRight")
    movingRight = true
    if (movingLeft === true && movingRight === true) {
      player.play("idleRight")
      facingRight = true
      facingLeft = false
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
      facingRight = true
      facingLeft = false
    }
    movingRight = false
  })

  k.onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump()
    }
  })

  k.onKeyPress("h", () => {
    if (facingRight === true) {
      rightSlash()
    } else if (facingLeft === true) {
      leftSlash()
    }
  })

  k.onKeyPress("j", () => {
    if (facingRight === true) {
      rightProjectile()
    } else {
      leftProjectile()
    }
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
  let southCollision = false
  let westCollision = false
  let northCollision = false
  let eastCollision = false

  onUpdate(() => {
    add([
      // every frame this code will generate a rectangle that is slightly offset from the player
      // in this case, it is slightly below the player.
      // if this box collides with a wall, the southCollision variable will be set to true
      // when this is set to true, the player cannot move south
      // this makes it much harder to glitch through walls, and makes the camera more steady
      pos(player.pos.x + 6, player.pos.y + 20),
      area({ shape: new Rect(vec2(0), 20, 13) }),
      lifespan(0.1),
      "southCollisionBox",
    ])
    onCollide("southCollisionBox", "wall", () => {
      southCollision = true
      return
    })
    southCollision = false
  })

  onUpdate(() => {
    add([
      pos(player.pos.x, player.pos.y + 6),
      area({ shape: new Rect(vec2(0), 13, 20) }),
      lifespan(0.1),
      "westCollisionBox",
    ])
    onCollide("westCollisionBox", "wall", () => {
      westCollision = true
      return
    })
    westCollision = false
  })

  onUpdate(() => {
    add([
      pos(player.pos.x + 6, player.pos.y),
      area({ shape: new Rect(vec2(0), 20, 13) }),
      lifespan(0.1),
      "northCollisionBox",
    ])
    onCollide("northCollisionBox", "wall", () => {
      northCollision = true
      return
    })
    northCollision = false
  })

  onUpdate(() => {
    add([
      pos(player.pos.x + 20, player.pos.y + 6),
      area({ shape: new Rect(vec2(0), 13, 20) }),
      lifespan(0.1),
      "eastCollisionBox",
    ])
    onCollide("eastCollisionBox", "wall", () => {
      eastCollision = true
      return
    })
    eastCollision = false
  })

  const player = getPlayer()
  k.onKeyPress("left", () => {
    player.play("runLeft")
  })
  k.onKeyDown("left", () => {
    if (westCollision === false) {
      player.move(k.LEFT.scale(player.speed))
    }
  })
  k.onKeyRelease("left", () => {
    player.play("idleLeft")
  })

  k.onKeyPress("right", () => {
    player.play("runRight")
  })
  k.onKeyDown("right", () => {
    if (eastCollision === false) {
      player.move(k.RIGHT.scale(player.speed))
    }
  })
  k.onKeyRelease("right", () => {
    player.play("idleRight")
  })

  k.onKeyPress("up", () => {
    player.play("runUp")
  })
  k.onKeyDown("up", () => {
    if (northCollision === false) {
      player.move(k.UP.scale(player.speed))
    }
  })
  k.onKeyRelease("up", () => {
    player.play("idleUp")
  })

  k.onKeyPress("down", () => {
    player.play("runDown")
  })
  k.onKeyDown("down", () => {
    if (southCollision === false) {
      player.move(k.DOWN.scale(player.speed))
    }
  })
  k.onKeyRelease("down", () => {
    player.play("idleDown")
  })
}
