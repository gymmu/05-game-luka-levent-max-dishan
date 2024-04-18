import { k } from "./game.js"
import { getPlayer } from "./player.js"
import {
  leftSlash,
  rightSlash,
  leftProjectile,
  rightProjectile,
  upwardSlash,
} from "./Combat.js"
import { movement } from "./dialogue.js"

/**
 * Diese Funktion lädt die Tastenbelegung wie sie pro Level sein soll. Die
 * generelle Steuerung für ein Jump'n'Run-Level ist immer etwa gleich, deshalb
 * laden wir sie hier in einer eigenen Funktion.
 */

// These are used for keeping track which direction the player is moving in.
let movingLeft = false
let movingRight = false
// These are used to keep track of where the player is facing.
let facingRight = true
let facingLeft = false
export function loadKeyboardJumpAndRun() {
  const player = getPlayer()

  k.onKeyPress("a", () => {
    // On key press left, the player will play the runLeft animation.
    player.play("runLeft")
    //This sets movingLeft to true, storing that the player should now be moving left.
    movingLeft = true
    // If the player is moving left, then it should not be facing right.
    facingRight = false
    // IF the player is moving left, it should now also be facing left.
    facingLeft = true
    // If the player is holding down the "d" key, then movingRight will still be true.
    // Because pressing both keys at the same time creates no moving, an idle animation is played.
    if (movingLeft === true && movingRight === true) {
      player.play("idleLeft")
      facingLeft = true
      facingRight = false
    }
  })
  // Solange wie die Taste gedrückt wird, wird der Spieler in jedem Frame nach
  // links verschoben.
  k.onKeyDown("a", () => {
    player.move(k.LEFT.scale(player.speed))
  })

  k.onKeyRelease("a", () => {
    // If the player is holding down the "d" key when releasing "a", then the player should move right.
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

  // This has the same logic as the "a" key function.
  k.onKeyPress("d", () => {
    player.play("runRight")
    movingRight = true
    facingRight = true
    facingLeft = false
    if (movingLeft === true && movingRight === true) {
      player.play("idleRight")
      facingRight = true
      facingLeft = false
    }
  })

  k.onKeyDown("d", () => {
    player.move(k.RIGHT.scale(player.speed))
  })
  k.onKeyRelease("d", () => {
    if (movingLeft === true) {
      player.play("runLeft")
    } else {
      player.play("idleRight")
      facingRight = true
      facingLeft = false
    }
    movingRight = false
  })

  // If the player is grounded then it is able to jump.
  k.onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump()
      k.play("jump", { volume: 0.3 })
    }
  })

  // These are developer cheats that can be used to test the game.
  k.onKeyPressRepeat("c", () => {
    k.onKeyPress("8", () => {
      player.heal(100)
    })
  })
  k.onKeyPressRepeat("c", () => {
    k.onKeyPress("9", () => {
      player.heal(100000000)
    })
  })

  // This is used to allow the player to use the upward slash.
  let lookingUp = false
  k.onKeyPress("w", () => {
    lookingUp = true
  })

  k.onKeyRelease("w", () => {
    lookingUp = false
  })

  // Used codium to generate a code limiting the amount of attacks per second.
  let lastAttackTime = 0
  k.onKeyPress("h", () => {
    // This will fetch the current time in milliseconds
    const currentTime = Date.now()
    // If the current time in milliseconds has a difference of more than 500 milliseconds than lastAttackTime, the player can attack
    //if the player hasn't unlocked the sword yet, he can't use the sword
    if (currentTime - lastAttackTime > 500 && player.swordUnlocked === true) {
      // This will set lastAttackTime to the current time

      lastAttackTime = currentTime

      if (lookingUp === true) {
        upwardSlash()
      } else if (facingLeft === true) {
        leftSlash()
      } else if (facingRight === true) {
        rightSlash()
      }
    }
  })

  let lastProjectileTime = 0
  k.onKeyPress("j", () => {
    const currentTime = Date.now()
    //if the player hasn't unlocked the projectile yet, he can't use the projectile
    if (
      currentTime - lastProjectileTime > 1000 &&
      player.projectileUnlocked === true
    ) {
      k.play("magic", { volume: 0.2 })
      lastProjectileTime = currentTime
      if (facingRight === true) {
        rightProjectile()
      } else {
        leftProjectile()
      }
    }
  })

  // This makes the game fullscreen.
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
    // every frame this code will generate a rectangle that is slightly offset from the player
    // in this case, it is slightly below the player.
    // if this box collides with a wall, the southCollision variable will be set to true
    // when this is set to true, the player cannot move south
    // this makes it much harder to glitch through walls, and makes the camera more steady
    // However, I believe a part of this code will cause the game to lag under certain circumstances
    // Such as: Playing an RPG level for a long time, or switching windows and coming back to the game later.
    add([
      pos(player.pos.x + 6, player.pos.y + 20),
      area({ shape: new Rect(vec2(0), 20, 13) }),
      lifespan(0.1),
      "southCollisionBox",
    ])
    // Upon colliding with a wall, the southCollision variable will be set to true
    onCollide("southCollisionBox", "wall", () => {
      southCollision = true
      return
    })
    // If the southCollision hitbox is not colliding with a wall, the southCollision variable will be set to false
    southCollision = false
  })

  // The following three functions are for the other 3 directions of collisions
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
  k.onKeyPress("a", () => {
    player.play("runLeft")
  })
  k.onKeyDown("a", () => {
    // If the westCollision is true, the player will not move west anymore
    // However, the animation of westward movement will still play.
    if (westCollision === false && movement === true) {
      player.move(k.LEFT.scale(player.speed))
    }
  })
  k.onKeyRelease("a", () => {
    player.play("idleLeft")
  })

  k.onKeyPressRepeat("c", () => {
    k.onKeyPress("8", () => {
      player.heal(100)
    })
  })
  k.onKeyPressRepeat("c", () => {
    k.onKeyPress("9", () => {
      player.heal(100)
    })
  })

  k.onKeyPress("d", () => {
    player.play("runRight")
  })
  k.onKeyDown("d", () => {
    if (eastCollision === false && movement === true) {
      if (movement === true) player.move(k.RIGHT.scale(player.speed))
    }
  })
  k.onKeyRelease("d", () => {
    player.play("idleRight")
  })

  k.onKeyPress("w", () => {
    player.play("runUp")
  })
  k.onKeyDown("w", () => {
    if (northCollision === false && movement === true) {
      player.move(k.UP.scale(player.speed))
    }
  })
  k.onKeyRelease("w", () => {
    player.play("idleUp")
  })

  k.onKeyPress("s", () => {
    player.play("runDown")
  })
  k.onKeyDown("s", () => {
    if (southCollision === false && movement === true) {
      player.move(k.DOWN.scale(player.speed))
    }
  })
  k.onKeyRelease("s", () => {
    player.play("idleDown")
  })

  onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
}
