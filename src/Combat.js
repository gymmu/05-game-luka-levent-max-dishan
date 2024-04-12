import { getPlayer } from "./player.js"
import { getSpider, getEnemy } from "./gameObjects.js"
import { k } from "./game.js"
import { TILESIZE } from "./globals.js"

export function rightSlash() {
  const player = getPlayer()
  add([
    // This will add the sword sprite for the left half of the sword
    k.sprite("swordRight1"),
    // This will add the sword's position to the player's position
    // The numbers will change how much it is offset from the player
    pos(player.pos.add(6, 2)),
    // The sprite will last .1 seconds
    lifespan(0.1),
  ])
  // This adds the right half of the sword sprite. It does not have a hitbox.
  add([k.sprite("swordRight2"), pos(player.pos.add(38, 2)), lifespan(0.1)])
  add([
    pos(player.pos.add(19, 8)),
    //This will had the hitbox, which is invisible
    area({ shape: new Rect(vec2(0), 60, 20) }),
    // Remove the slashes on the following line to see the hitbox
    // rect(60, 20),
    lifespan(0.1),
    "slashHitBox",
  ])
}
export function leftSlash() {
  const player = getPlayer()
  // This code is the same, but in the other direction
  // However, the hitbox is added in a seperate add function
  add([k.sprite("swordLeft2"), pos(player.pos.add(-10, 2)), lifespan(0.1)])
  add([k.sprite("swordLeft1"), pos(player.pos.add(-42, 2)), lifespan(0.1)])
  add([
    pos(player.pos.add(-47, 8)),
    // rect(60, 20),
    area({ shape: new Rect(vec2(0), 60, 20) }),
    lifespan(0.1),
    "slashHitBox",
  ])
}

export function upwardSlash() {
  const player = getPlayer()
  // This code is the same, but in the other direction
  // However, the hitbox is added in a seperate add function
  add([
    k.sprite("swordLeft2"),
    pos(player.pos.add(TILESIZE, -8)),
    rotate(90),
    lifespan(0.1),
  ])
  add([
    k.sprite("swordLeft1"),
    pos(player.pos.add(TILESIZE, -8 - TILESIZE)),
    rotate(90),
    lifespan(0.1),
  ])
  add([
    pos(player.pos.add(6, TILESIZE * -1.25)),
    area({ shape: new Rect(vec2(0), 20, 50) }),
    // rect(20, 50),
    lifespan(0.1),
    "slashHitBox",
  ])
}

export function leftProjectile() {
  const player = getPlayer()
  add([
    // a square is created that will move to the left at a rate of 230 per second
    pos(player.pos.add(0, 5)),
    sprite("magicProjectileLeft", { anim: "idle" }),
    //rect(10, 10),
    area(),
    // it will disapear after 2 seconds
    lifespan(2),
    "projectile",
    move(0, -230),
  ])
}

export function rightProjectile() {
  const player = getPlayer()
  add([
    pos(player.pos.add(0, 5)),
    sprite("magicProjectileRight", { anim: "idle" }),
    //rect(10, 10),
    area(),
    lifespan(2),
    "projectile",
    move(0, 230),
  ])
}

export function getProjectile() {
  return k.get("projectile")
}

export function spiderLeftProjectile() {
  const player = getPlayer()

  // Generated the following line from codium
  // This will now add a projectile to all spiders instead of just one
  get("spider").forEach((spider) => {
    const dir = player.pos.sub(spider.pos).unit()
    dir.y = 0
    add([
      pos(spider.pos.add(0, 5)),
      sprite("silcRight"),
      //rect(10, 10),
      area(),
      lifespan(2),
      "spiderProjectile",
      move(dir, 230),
    ])
  })
}

export function ladybugLeftProjectile() {
  get("ladybug").forEach((ladybug) => {
    const player = getPlayer()
    const dir = player.pos.sub(ladybug.pos).unit()
    dir.y = 0
    add([
      pos(ladybug.pos.add(0, 5)),
      sprite("magicProjectileLeft", { anim: "idle" }),
      //rect(10, 10),
      area(),
      lifespan(2),
      "ladybugProjectile",
      move(dir, 230),
    ])
  })
}

export function bossProjectile() {
  get("boss").forEach((boss) => {
    const player = getPlayer()
    const dir = player.pos.sub(boss.pos).unit()
    add([
      pos(boss.pos.add(0, 5)),
      sprite("magicProjectileLeft", { anim: "idle" }),
      //rect(10, 10),
      area(),
      lifespan(2),
      "ladybugProjectile",
      move(dir, 230),
    ])
  })
}

export function ladybugSlash(ladybug, left = true) {
  const player = getPlayer()
  const dir = player.pos.sub(ladybug.pos).unit()
  // This code is the same, but in the other direction
  // However, the hitbox is added in a seperate add function
  if (left === true) {
    add([k.sprite("swordLeft2"), pos(ladybug.pos.add(-10, 2)), lifespan(0.1)])
    add([k.sprite("swordLeft1"), pos(ladybug.pos.add(-42, 2)), lifespan(0.1)])
    add([
      pos(ladybug.pos.add(-47, 8)),
      //rect(60, 20),
      area({ shape: new Rect(vec2(0), 60, 20) }),
      lifespan(0.1),
      "ladybugSlashHitBox",
    ])
  } else {
    add([k.sprite("swordRight2"), pos(ladybug.pos.add(38, 2)), lifespan(0.1)])
    add([k.sprite("swordRight1"), pos(ladybug.pos.add(6, 2)), lifespan(0.1)])
    add([
      pos(ladybug.pos.add(19, 8)),
      //This will had the hitbox, which is invisible
      area({ shape: new Rect(vec2(0), 60, 20) }),

      // Remove the slashes on the following line to see the hitbox
      // rect(60, 20),
      lifespan(0.1),
      "ladybugSlashHitBox",
    ])
  }
}
