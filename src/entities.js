import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import {
  spiderLeftProjectile,
  ladybugLeftProjectile,
  ladybugSlash,
} from "./Combat.js"
import { getSpider, getEnemy, getLadybug } from "./gameObjects.js"
import { getProjectile } from "./Combat.js"

export function entityLogic() {
  //This code will run every frame
  const player = getPlayer()
  const enemy = getEnemy()
  k.onUpdate("ant", (ant) => {
    // This will stop the function of the ant after getting 16 tiles away from the player.
    // This is a simple way to stop it from running off the map when not close to the player.
    if (
      ant.pos.x + TILESIZE * 16 > player.pos.x &&
      ant.pos.x - TILESIZE * 16 < player.pos.x
    )
      if (player.pos.x > ant.pos.x) {
        // If the players x position is greater than the ant's postion, the ant will move left.
        // If not, it will move right
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
  let projectileCountdown = 60

  k.onUpdate(() => {
    //Codium fixed fixed this. I do not know what [if getSpider()] accomplishes. But it fixes the problem. Yay codium
    if (getSpider()) {
      const spider = getSpider()
      if (spider === undefined) return
      {
        if (projectileCountdown === 0) {
          spiderLeftProjectile()
          projectileCountdown = 60
        }

        if (
          spider.isGrounded() &&
          rand(20) > 19 &&
          player.pos.y < spider.pos.y
        ) {
          spider.jump()
        }
      }
    }
  })
  let ladybugprojectileCountdown = 120
  let ladybugSwordCountdown = 90
  k.onUpdate(() => {
    ladybugprojectileCountdown = ladybugprojectileCountdown - 1
    projectileCountdown = projectileCountdown - 1
    ladybugSwordCountdown = ladybugSwordCountdown - 1
  })
  k.onUpdate(() => {
    getLadybug().forEach((ladybug) => {
      if (ladybug === undefined) return
      if (ladybugprojectileCountdown === 0) {
        ladybugLeftProjectile()
        ladybugprojectileCountdown = 120
      }

      if (
        // These values make it so the player must be close to the ladybug for the ladybug to use its sword
        ladybug.pos.x + TILESIZE * 3 > player.pos.x &&
        ladybug.pos.x - TILESIZE * 3 < player.pos.x &&
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
            ladybugSwordCountdown = 90
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

  k.on("death", "enemy", (enemy) => {
    destroy(enemy)
    player.endScore += enemy.killScore
  })
}
