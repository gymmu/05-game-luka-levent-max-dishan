import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"

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
}
