import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import { spiderLeftProjectile, spiderRightProjectile } from "./Combat.js"

export function entityLogic() {
  //This code will run every frame
  const player = getPlayer()
  k.onUpdate("npc", (npc) => {
    // If the players x position is greater than the Npc's postion, the npc will move left.
    // If not, it will move right
    if (player.pos.x > npc.pos.x) {
      npc.move(40, 0)
    } else {
      npc.move(-40, 0)
    }
    if (npc.isGrounded()) {
      k.loop(360, () => {
        npc.jump()
      })
    }
  })
  let projectileCountdown = 240
  k.onUpdate("spider", (spider) => {
    if (player.pos.x > spider.pos.x) {
      if (projectileCountdown === 0) {
        spiderLeftProjectile()
        projectileCountdown = 240
      }
      projectileCountdown = projectileCountdown - 1
    } else {
      if (projectileCountdown === 0) {
        spiderRightProjectile()
        projectileCountdown = 240
      }
      projectileCountdown = projectileCountdown - 1
    }
    if (spider.isGrounded() && rand(20) > 19.3) {
      loop(360, () => {
        spider.jump()
      })
    }
  })
}
