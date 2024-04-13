import { getPlayer } from "./player.js"
import { k } from "./game.js"
import { TILESIZE } from "./globals.js"

export function rightSlash() {
  const player = getPlayer()
  add([
    // This will add the sword sprite for the left half of the sword. It does not have a hitbox
    k.sprite("swordRight1"),
    // This will add the sword's position to the player's position
    // The numbers will change how much it is offset from the player
    pos(player.pos.add(6, 2)),
    // The sprite will last .1 seconds
    lifespan(0.1),
  ])
  // This adds the right half of the sword sprite. It does not have a hitbox.
  add([k.sprite("swordRight2"), pos(player.pos.add(38, 2)), lifespan(0.1)])
  // This adds the hitbox, which is invisible
  add([
    pos(player.pos.add(19, 8)),
    area({ shape: new Rect(vec2(0), 60, 20) }),
    // Remove the slashes on the following line to see the hitbox
    // rect(60, 20),
    lifespan(0.1),
    "slashHitBox",
  ])
}

// This code is the same, but in the other direction
export function leftSlash() {
  const player = getPlayer()
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
// This code is the same, but in the upwards direction.
// The sprites and hitbox are rotated 90 degrees.
export function upwardSlash() {
  const player = getPlayer()
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
    pos(player.pos.add(0, 5)),
    // this will add the magic Projectile sprite
    sprite("magicProjectileLeft", { anim: "idle" }),
    area(),
    // It will disapear after 2 seconds
    lifespan(2),
    "projectile",
    // It will move at a rate of 230 unites a second
    move(0, -230),
  ])
}

export function rightProjectile() {
  const player = getPlayer()
  add([
    pos(player.pos.add(0, 5)),
    sprite("magicProjectileRight", { anim: "idle" }),
    area(),
    lifespan(2),
    "projectile",
    move(0, 230),
  ])
}

//This exports the projectile for use in other files.
export function getProjectile() {
  return k.get("projectile")
}

export function spiderProjectile() {
  const player = getPlayer()

  // This code will apply to every spider, if conditions in the entities.js code are satisified.
  get("spider").forEach((spider) => {
    // This variable will change based on each spider.
    // By doing this we can specify the direction of the projectile for individual spiders.
    // .unit will make every projectile a consistent speed.
    const dir = player.pos.sub(spider.pos).unit()
    // This constricts movement to 0 on the y axis
    dir.y = 0
    if (dir.x > 0) {
      add([
        pos(spider.pos.add(0, 5)),
        sprite("silcRight"),
        //rect(10, 10),
        area(),
        lifespan(2),
        "spiderProjectile",
        move(dir, 230),
      ])
    } else {
      add([
        pos(spider.pos.add(0, 5)),
        sprite("silcLeft"),
        //rect(10, 10),
        area(),
        lifespan(2),
        "spiderProjectile",
        move(dir, 230),
      ])
    }
  })
}

// This is the same code, but for the ladybugs
export function ladybugProjectile() {
  get("ladybug").forEach((ladybug) => {
    const player = getPlayer()
    const dir = player.pos.sub(ladybug.pos).unit()
    dir.y = 0
    if (dir.x > 0) {
      add([
        pos(ladybug.pos.add(0, 5)),
        sprite("magicProjectileRight", { anim: "idle" }),
        //rect(10, 10),
        area(),
        lifespan(2),
        "ladybugProjectile",
        move(dir, 230),
      ])
    } else {
      add([
        pos(ladybug.pos.add(0, 5)),
        sprite("magicProjectileLeft", { anim: "idle" }),
        //rect(10, 10),
        area(),
        lifespan(2),
        "ladybugProjectile",
        move(dir, 230),
      ])
    }
  })
}

// This is the same code, but the y direction is not constricted.
export function bossProjectile() {
  get("boss").forEach((boss) => {
    const player = getPlayer()
    const dir = player.pos.sub(boss.pos).unit()
    if (dir.x > 0) {
      boss.play("attackRangedRight")
      add([
        pos(boss.pos.add(0, 5)),
        sprite("magicProjectileRight", { anim: "idle" }),
        //rect(10, 10),
        area(),
        lifespan(5),
        "ladybugProjectile",
        move(dir, 230),
        scale(1.5),
      ])
    } else {
      boss.play("attackRangedLeft")
      add([
        pos(boss.pos.add(0, 5)),
        sprite("magicProjectileLeft", { anim: "idle" }),
        //rect(10, 10),
        area(),
        lifespan(5),
        "ladybugProjectile",
        move(dir, 230),
        scale(1.5),
      ])
    }
  })
}

// This code uses variables after the function name in order to specify directions later in the code.
// The scale is increased because the boss is bigger than normal enemies.
// Otherwise, this function is the same as the sword slash used by the player.
export function bossSlash(boss, left = true) {
  if (left === true) {
    boss.play("attackMeleeLeft")
    add([
      k.sprite("swordLeft2"),
      pos(boss.pos.add(-23, 2)),
      lifespan(0.1),
      scale(1.5),
    ])
    add([
      k.sprite("swordLeft1"),
      pos(boss.pos.add(-55, 2)),
      lifespan(0.1),
      scale(1.5),
    ])
    add([
      pos(boss.pos.add(-60, 8)),
      //rect(60, 50),
      area({ shape: new Rect(vec2(0), 60, 50) }),
      lifespan(0.1),
      "ladybugSlashHitBox",
      scale(1.5),
    ])
  } else {
    boss.play("attackMeleeRight")
    add([
      k.sprite("swordRight2"),
      pos(boss.pos.add(51, 2)),
      lifespan(0.1),
      scale(1.5),
    ])
    add([
      k.sprite("swordRight1"),
      pos(boss.pos.add(19, 2)),
      lifespan(0.1),
      scale(1.5),
    ])
    add([
      pos(boss.pos.add(32, 8)),
      area({ shape: new Rect(vec2(0), 60, 50) }),
      // rect(60, 50),
      lifespan(0.1),
      "ladybugSlashHitBox",
      scale(1.5),
    ])
  }
}

// This code is the same, but the size of the sword is smaller.
export function ladybugSlash(ladybug, left = true) {
  const player = getPlayer()
  const dir = player.pos.sub(ladybug.pos).unit()
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
      area({ shape: new Rect(vec2(0), 60, 20) }),
      lifespan(0.1),
      "ladybugSlashHitBox",
    ])
  }
}
