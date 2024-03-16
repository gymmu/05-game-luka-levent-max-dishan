import { getPlayer } from "./player.js"
import { getSpider, getEnemy } from "./gameObjects.js"

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
  onCollide("enemy", "slashHitBox", (enemy) => {
    enemy.hurt(5)
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
  onCollide("enemy", "slashHitBox", (enemy) => {
    enemy.hurt(5)
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
  onCollide("enemy", "projectile", (enemy, projectile) => {
    enemy.hurt(10)
    destroy(projectile)
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
  onCollide("enemy", "projectile", (enemy, projectile) => {
    enemy.hurt(10)
    destroy(projectile)
  })
}

export function spiderLeftProjectile() {
  // Generated the following line from codium
  // This will now add a projectile to all spiders instead of just one
  get("spider").forEach((spider) => {
    add([
      pos(spider.pos.add(0, 5)),
      rect(10, 10),
      area(),
      lifespan(2),
      "spiderProjectile",
      move(0, 230),
    ])
  })
}

export function spiderRightProjectile() {
  get("spider").forEach((spider) => {
    add([
      pos(spider.pos.add(0, 5)),
      rect(10, 10),
      area(),
      lifespan(2),
      "spiderProjectile",
      move(0, -230),
    ])
  })
}
