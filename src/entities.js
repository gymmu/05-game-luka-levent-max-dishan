import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import { spiderLeftProjectile, spiderRightProjectile } from "./Combat.js"
import { getSpider, getEnemy } from "./gameObjects.js"

export function entityLogic() {
  //This code will run every frame
  const player = getPlayer()
  const enemy = getEnemy()
  k.onUpdate("ant", (ant) => {
    // If the players x position is greater than the ant's postion, the ant will move left.
    // If not, it will move right
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
  let projectileCountdown = 60
  k.onUpdate("spider", (spider) => {
    if (player.pos.x > spider.pos.x) {
      if (projectileCountdown === 0) {
        spiderLeftProjectile()
        projectileCountdown = 60
      }
      projectileCountdown = projectileCountdown - 1
    } else {
      if (projectileCountdown === 0) {
        spiderRightProjectile()
        projectileCountdown = 60
      }
      projectileCountdown = projectileCountdown - 1
    }
    if (spider.isGrounded() && rand(20) > 19 && player.pos.y < spider.pos.y) {
      spider.jump()
    }
  })
  onCollide("spiderProjectile", "player", (spiderProjectile, player) => {
    k.play("hit", { volume: 1 })
    player.hurt(10)
    shake(5)
    destroy(spiderProjectile)
  })
  k.on("death", "enemy", (enemy) => {
    destroy(enemy)
  })
}
