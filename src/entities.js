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
let bossProjCountdown = 30
// This phase allows the boss to use projectiles
let projectilePhase = true
// This phase makes the boss move faster and use a sword
let swordPhase = false
// This phase makes the boss retreat and not attack
let stunPhase = false
// This specifies how fast the boss can attack with its sword
let bossSwordCountdown = 30
// This specifies how long the stun phase is
let bossStun = 120
// This specifies the Projectile cooldown for the spider
let projectileCountdown = 60
let ladybugprojectileCountdown = 120
let ladybugSwordCountdown = 90

// This reduces most countdowns by 1 every frame

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
    if (player.pos.x > boss.pos.x) {
      // These if statements will change the movement of the boss based on the phase it's in.
      if (swordPhase === true) {
        boss.move(80, 0)
      } else if (stunPhase === true) {
        boss.move(-20, 0)
      } else {
        boss.move(40, 0)
      }
    } else {
      if (swordPhase === true) {
        boss.move(-80, 0)
      } else if (stunPhase === true) {
        boss.move(20, 0)
      } else {
        boss.move(-40, 0)
      }
    }
    // This will randomly make the boss jump
    if (boss.isGrounded()) {
      if (rand(20) > 19.3) {
        boss.jump()
      }
    }
    // These if statements will change the phase of the boss
    // The rand() is used to add a little luck to the boss.
    // But it will never run if the bossPhaseCountdown is not less than 0
    if (bossPhaseCountdown <= 0 && projectilePhase === true && rand(120) < 2) {
      swordPhase = true
      projectilePhase = false
      bossPhaseCountdown = 300
    } else if (bossPhaseCountdown <= 0 && swordPhase === true) {
      swordPhase = false
      stunPhase = true
      bossPhaseCountdown = 150
    } else if (bossPhaseCountdown <= 0 && stunPhase === true && rand(120) < 2) {
      stunPhase = false
      projectilePhase = true
      bossPhaseCountdown = 300
    }
    if (projectilePhase === true) {
      if (bossProjCountdown <= 0) {
        bossProjCountdown = 30
        bossProjectile()
      }
    } else if (swordPhase === true && bossSwordCountdown <= 0) {
      if (player.pos.x > boss.pos.x) {
        bossSwordCountdown = 60
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
      ant.pos.x - TILESIZE * 16 < player.pos.x
    )
      if (player.pos.x > ant.pos.x) {
        ant.move(40, 0)
        if (rand(20) > 19.3) {
          loop(360, () => {
            ant.play("runRight")
          })
        }
      } else {
        ant.move(-40, 0)
        if (rand(20) > 19.3) {
          loop(360, () => {
            ant.play("runLeft")
          })
        }
      }
    if (ant.isGrounded() && rand(20) > 19.3) {
      loop(360, () => {
        ant.jump()
      })
    }
  })

  //Spider AI
  k.onUpdate(() => {
    //Codium fixed fixed this. I do not know what [if getSpider()] accomplishes. But it fixes the problem. Yay codium
    if (getSpider()) {
      const spider = getSpider()
      if (spider === undefined) return
      if (projectileCountdown === 0) {
        spiderProjectile()
        projectileCountdown = 60
      }
      if (spider.isGrounded() && rand(20) > 19 && player.pos.y < spider.pos.y) {
        spider.jump()
      }
    }
  })

  //Ladybug AI
  k.onUpdate(() => {
    getLadybug().forEach((ladybug) => {
      if (ladybug === undefined) return
      if (ladybugprojectileCountdown === 0) {
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
            ladybugSwordCountdown = 90
          }
        } else {
          if (ladybugSwordCountdown <= 0) {
            ladybugSlash(ladybug, false)
            ladybugSwordCountdown = 90
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
            ladybugSwordCountdown = 60
            destroy(projectile)
          }
        } else {
          if (ladybugSwordCountdown <= 0) {
            ladybugSlash(ladybug, false)
            ladybugSwordCountdown = 90
            destroy(projectile)
          }
        }
      }
    })
  })

  //The codes below specifies what will happen when a hitbox comes into contact with an entity
  onCollide(
    "ladybugSlashHitBox",
    "projectile",
    (ladybugSlashHitBox, projectile) => {
      destroy(projectile)
    },
  )
  onCollide("spiderProjectile", "player", (spiderProjectile, player) => {
    k.play("hit", { volume: 1 })
    player.hurt(10)
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
    k.play("slash", { volume: 0.3 })
    shake(10)
  })

  onCollide("enemy", "projectile", (enemy, projectile) => {
    k.play("hit", { volume: 1 })
    enemy.hurt(10)
    destroy(projectile)
  })

  onCollide("enemy", "slashHitBox", (enemy) => {
    enemy.hurt(10)
    k.play("slash", { volume: 0.3 })
  })

  k.on("death", "enemy", (enemy) => {
    destroy(enemy)
    player.endScore += enemy.killScore
  })
}
