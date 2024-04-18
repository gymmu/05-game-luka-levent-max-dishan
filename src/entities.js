import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import {
  spiderProjectile,
  ladybugProjectile,
  ladybugSlash,
  bossProjectile,
  bossSlash,
} from "./Combat.js"
import { getSpider, getEnemy, getLadybug, getBoss } from "./gameObjects.js"
import { getProjectile } from "./Combat.js"

// This specifies how long the phases of the boss are
let bossPhaseCountdown = 120
// This specifies how fast the boss can shoot projectiles
let bossProjCountdown = 0
// This phase allows the boss to use projectiles
let projectilePhase = true
// This phase makes the boss move faster and use a sword
let swordPhase = false
// This phase makes the boss retreat and not attack
let stunPhase = false
// This specifies how fast the boss can attack with its sword
let bossSwordCountdown = 0
// This specifies how long the stun phase is
let bossStun = 0
// This specifies the Projectile cooldown for the spider
let projectileCountdown = 0
let ladybugprojectileCountdown = 0
let ladybugSwordCountdown = 0

// This is the function for the movements and attacks of all enemies.
export function entityLogic() {
  k.onUpdate(() => {
    // This reduces most countdowns by 1 every frame
    ladybugprojectileCountdown = ladybugprojectileCountdown - 1
    projectileCountdown = projectileCountdown - 1
    ladybugSwordCountdown = ladybugSwordCountdown - 1
    bossProjCountdown = bossProjCountdown - 1
    bossSwordCountdown = bossSwordCountdown - 1
    bossPhaseCountdown = bossPhaseCountdown - 1
    bossStun = bossStun - 1
  })
  const player = getPlayer()

  k.onUpdate("boss", (boss) => {
    // If the players x position is greater than the boss's postion, the boss will move left.
    // If not, it will move right
    // The speed of the boss's movement will change based on the phase it's in.
    if (player.pos.x > boss.pos.x) {
      // This is used as a simple way to make the walking animation play.
      if (rand(20) > 19.3) {
        boss.play("idleRight")
      }
      if (swordPhase === true) {
        boss.move(120, 0)
      } else if (stunPhase === true) {
        boss.move(-20, 0)
      } else {
        boss.move(40, 0)
      }
    } else {
      if (rand(20) > 19.3) {
        boss.play("idleLeft")
      }
      if (swordPhase === true) {
        boss.move(-120, 0)
      } else if (stunPhase === true) {
        boss.move(20, 0)
      } else {
        boss.move(-40, 0)
      }
    }
    // This will randomly make the boss jump when touching the ground
    if (boss.isGrounded()) {
      if (rand(20) > 19.3) {
        boss.jump()
      }
    }
    // These if statements will change the phase of the boss
    // The rand() is used to add a little luck to the boss.
    // But it will never run if the bossPhaseCountdown is not less than 0
    if (bossPhaseCountdown <= 0 && projectilePhase === true && rand(150) < 2) {
      swordPhase = true
      projectilePhase = false
      bossPhaseCountdown = 300
    } else if (bossPhaseCountdown <= 0 && swordPhase === true) {
      swordPhase = false
      stunPhase = true
      bossPhaseCountdown = 150
    } else if (bossPhaseCountdown <= 0 && stunPhase === true && rand(150) < 2) {
      stunPhase = false
      projectilePhase = true
      bossPhaseCountdown = 300
    }
    // When in the projectile phase the boss will shoot projectiles every 45 frames.
    if (projectilePhase === true) {
      if (bossProjCountdown <= 0) {
        bossProjCountdown = 45
        bossProjectile()
      }
      // When in the projectile phase the boss will use its sword every 60 frames.
    } else if (swordPhase === true && bossSwordCountdown <= 0) {
      if (player.pos.x > boss.pos.x) {
        bossSwordCountdown = 60
        // The variable after the bossSlash is used to specify the direction of the sword.
        bossSlash(boss, false)
      } else {
        bossSlash(boss, true)
        bossSwordCountdown = 30
      }
    }
  })

  k.onUpdate("ant", (ant) => {
    // The following code will only run if the ant is within a certain distance of the player.
    // This is done so they don't walk off the map when the player cannot see the ant.
    // The rest of this code is a variation of the boss's code
    if (
      ant.pos.x + TILESIZE * 16 > player.pos.x &&
      ant.pos.x - TILESIZE * 16 < player.pos.x &&
      ant.pos.y + TILESIZE * 4 > player.pos.y &&
      ant.pos.y - TILESIZE * 4 < player.pos.y
    )
      if (player.pos.x > ant.pos.x) {
        ant.move(40, 0)
        if (rand(20) > 19.3) {
          ant.play("runRight")
        }
      } else {
        ant.move(-40, 0)
        if (rand(20) > 19.3) {
          ant.play("runLeft")
        }
      }
    if (ant.isGrounded() && rand(20) > 19.3) {
      ant.jump()
    }
  })

  // This is the same code, but the ant is not able to jump.
  k.onUpdate("noJumpAnt", (ant) => {
    if (
      ant.pos.x + TILESIZE * 16 > player.pos.x &&
      ant.pos.x - TILESIZE * 16 < player.pos.x
    )
      if (player.pos.x > ant.pos.x) {
        ant.move(40, 0)
        if (rand(20) > 19.3) {
          ant.play("runRight")
        }
      } else {
        ant.move(-40, 0)
        if (rand(20) > 19.3) {
          ant.play("runLeft")
        }
      }
  })

  // This makes the spider sometimes jump if the player is above it.
  k.onUpdate("spider", (spider) => {
    if (spider.isGrounded() && rand(20) > 19 && player.pos.y < spider.pos.y) {
      spider.jump()
    }
  })

  // This will execute the spiderProjectile function every 75 frames.
  k.onUpdate(() => {
    if (projectileCountdown <= 0) {
      spiderProjectile()
      projectileCountdown = 75
    }
  })

  //Ladybug AI
  // This is a combination of all the code leading up to this.
  k.onUpdate(() => {
    getLadybug().forEach((ladybug) => {
      if (ladybugprojectileCountdown <= 0) {
        ladybugProjectile()
        ladybugprojectileCountdown = 120
      }
      // These values make it so the player must be close to the ladybug for the ladybug to use its sword
      if (
        ladybug.pos.x + TILESIZE * 2.5 > player.pos.x &&
        ladybug.pos.x - TILESIZE * 2.5 < player.pos.x &&
        ladybug.pos.y + TILESIZE * 2 > player.pos.y &&
        ladybug.pos.y - TILESIZE * 2 < player.pos.y
      ) {
        if (player.pos.x < ladybug.pos.x) {
          if (ladybugSwordCountdown <= 0) {
            ladybugSlash(ladybug, true)
            ladybugSwordCountdown = 120
          }
        } else {
          if (ladybugSwordCountdown <= 0) {
            ladybugSlash(ladybug, false)
            ladybugSwordCountdown = 120
          }
        }
      }
    })
    // The following code is the same as the one before it,
    // but now the ladybug will also destroy projectiles that come close to it.
    getLadybug().forEach((ladybug) => {
      const projectile = getProjectile()[0]
      if (ladybug === undefined) return
      if (projectile === undefined) return
      if (
        // These values make it so a projectile must be close to the ladybug for the ladybug to use its sword
        ladybug.pos.x + TILESIZE * 2 > projectile.pos.x &&
        ladybug.pos.x - TILESIZE * 2 < projectile.pos.x &&
        ladybug.pos.y + TILESIZE * 1 > projectile.pos.y &&
        ladybug.pos.y - TILESIZE * 1 < projectile.pos.y
      ) {
        if (player.pos.x < ladybug.pos.x) {
          if (ladybugSwordCountdown <= 0) {
            ladybugSlash(ladybug, true)
            ladybugSwordCountdown = 120
            destroy(projectile)
          }
        } else {
          if (ladybugSwordCountdown <= 0) {
            ladybugSlash(ladybug, false)
            ladybugSwordCountdown = 120
            destroy(projectile)
          }
        }
      }
    })
  })

  //The codes below specifies what will happen when a specified hitbox comes into contact with an entity
  onCollide(
    "ladybugSlashHitBox",
    "projectile",
    (ladybugSlashHitBox, projectile) => {
      destroy(projectile)
    },
  )
  onCollide("spiderProjectile", "player", (spiderProjectile, player) => {
    // This plays the hit sound
    k.play("hit", { volume: 1 })
    // This will hurt the player by 10 HP
    player.hurt(10)
    // This causes the screen to shake
    shake(5)
    destroy(spiderProjectile)
  })

  onCollide("ladybugProjectile", "player", (ladybugProjectile, player) => {
    k.play("hit", { volume: 1 })
    player.hurt(10)
    shake(5)
    destroy(ladybugProjectile)
  })

  onCollide("player", "ladybugSlashHitBox", (player, ladybugSlashHitBox) => {
    player.hurt(15)
    k.play("slash", { volume: 0.1 })
    shake(10)
  })

  onCollide("enemy", "projectile", (enemy, projectile) => {
    k.play("hit", { volume: 1 })
    enemy.hurt(10)
    destroy(projectile)
  })

  onCollide("enemy", "slashHitBox", (enemy) => {
    enemy.hurt(10)
    k.play("slash", { volume: 0.1 })
  })

  // This retrieves an enemies score from their score in GameObjects and adds it to the players score upon death.
  k.on("death", "enemy", (enemy) => {
    destroy(enemy)
    player.endScore += enemy.killScore
  })

  // When the boss dies, the player get 5000 more score.
  k.on("death", "boss", (boss) => {
    k.go("finish")
    player.endScore += 5000
  })
}
