import { getPlayer } from "./player.js"
import { getSpider } from "./gameObjects.js"

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

export function leftProjectile() {
  const player = getPlayer()
  add([
    // a square is created that will move to the left at a rate of 230 per second
    pos(player.pos.add(0, 5)),
    rect(10, 10),
    area(),
    // it will disapear after 2 seconds
    lifespan(2),
    "projectile",
    move(0, -230),
  ])
  onCollide("npc", "projectile", (npc) => {
    npc.destroy()
  })
}

export function rightProjectile() {
  const player = getPlayer()
  add([
    pos(player.pos.add(0, 5)),
    rect(10, 10),
    area(),
    lifespan(2),
    "projectile",
    move(0, 230),
  ])
  onCollide("npc", "projectile", (npc) => {
    npc.destroy()
  })
}

export function spiderLeftProjectile() {
  const spider = getSpider()
  add([
    pos(spider.pos.add(0, 5)),
    rect(10, 10),
    area(),
    lifespan(2),
    "projectile",
    move(0, 230),
  ])
}

export function spiderRightProjectile() {
  const spider = getSpider()
  add([
    pos(spider.pos.add(0, 5)),
    rect(10, 10),
    area(),
    lifespan(2),
    "projectile",
    move(0, -230),
  ])
}
