import { getPlayer } from "./player.js"
import { getSpider, getEnemy } from "./gameObjects.js"
import { k } from "./game.js"

export function rightSlash() {
  const player = getPlayer()
  add([
    // This will add the sword sprite for the left half of the sword
    k.sprite("swordRight1"),
    // This will add the sword's position to the player's position
    // The numbers which follows will change how much it is offset from the player
    pos(player.pos.add(6, 2)),
    // This will generate an invisible rectangle which is used as a hitbox
    area({ shape: new Rect(vec2(0), 80, 20) }),
    // Both the sprite and the rectangle will last .1 seconds
    lifespan(0.1),
    "slashHitBox",
  ])
  // This adds the right half of the sword sprite. It does not have a hitbox.
  add([k.sprite("swordRight2"), pos(player.pos.add(38, 2)), lifespan(0.1)])

  // When the hitbox collides with an npc, the npc will be destroyed.
  onCollide("enemy", "slashHitBox", (enemy) => {
    enemy.hurt(5)
  })
}
export function leftSlash() {
  const player = getPlayer()
  // This is the same code, but it uses the left sprites and offsets everything in the opposite direction.
  add([
    k.sprite("swordLeft2"),
    pos(player.pos.add(-10, 2)),
    area({ shape: new Rect(vec2(0), 80, 20) }),
    lifespan(0.1),
    "slashHitBox",
  ])
  add([k.sprite("swordLeft1"), pos(player.pos.add(-42, 2)), lifespan(0.1)])
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
