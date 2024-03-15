import { getPlayer } from "./player.js"

export function rightSlash() {
  const player = getPlayer()
  // This will add a rectangle which is offset from the player's position by 20 on the x axis.
  // This will act as a hitbox for the slash.
  add([
    pos(player.pos.add(0, 5)),
    area({ shape: new Rect(vec2(0), 80, 20) }),
    lifespan(0.1),
    rect(80, 20),
    "slashHitBox",
  ])
  // When the rectangle collides with an npc, the npc will be destroyed.
  onCollide("npc", "slashHitBox", (npc) => {
    npc.destroy()
  })
}
export function leftSlash() {
  const player = getPlayer()
  // This will add a rectangle which is offset from the player's position by 20 on the x axis.
  // This will act as a hitbox for the slash.
  add([
    pos(player.pos.add(-50, 5)),
    area({ shape: new Rect(vec2(0), 80, 20) }),
    rect(80, 20),
    lifespan(0.1),
    "slashHitBox",
  ])
  // When the rectangle collides with an npc, the npc will be destroyed.
  onCollide("npc", "slashHitBox", (npc) => {
    npc.destroy()
  })
}
