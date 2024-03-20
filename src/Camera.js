import { getPlayer } from "./player.js"
import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
let currentLevel = 1

export function cameraLogic() {
  const player = getPlayer()
  k.onCollide("player", "goal", () => {
    currentLevel = currentLevel + 1
  })
  let inRPG = false

  let south = 0
  if (currentLevel === 1) {
    south = 15
  } else if (currentLevel === 2) {
    south = 13
  } else if (currentLevel === 3) {
    south = 15
  }
  south = south - 5.5

  let east = 0
  if (currentLevel === 1) {
    east = 150
  } else if (currentLevel === 2) {
    east = 23.5
  } else if (currentLevel === 3) {
    east = 150
  }
  east = east - 5.5

  if (currentLevel === (2 || 4)) {
    inRPG = true
  }
  if (currentLevel === (1 || 3)) {
    inRPG = false
  }

  player.on("death", async () => {
    currentLevel = 0
  })
  k.onUpdate(() => {
    if (player.pos.y > 720) {
      currentLevel = 1
    }
  })

  function limitWest() {
    k.camPos(TILESIZE * 10, player.pos.y)
  }
  function limitSouth() {
    k.camPos(player.pos.x, TILESIZE * south)
  }
  function limitNorth() {
    k.camPos(player.pos.x, TILESIZE * 5.5)
  }
  function limitEast() {
    k.camPos(TILESIZE * east, player.pos.y)
  }
  function limitSouthWest() {
    k.camPos(TILESIZE * 10, TILESIZE * south)
  }
  function limitNorthWest() {
    k.camPos(TILESIZE * 10, TILESIZE * 5.5)
  }
  function limitNorthEast() {
    k.camPos(TILESIZE * east, TILESIZE * 5.5)
  }
  function limitSouthEast() {
    k.camPos(TILESIZE * east, TILESIZE * south)
  }

  player.onUpdate(() => {
    if (player.pos.y > TILESIZE * south && player.pos.x < TILESIZE * 10) {
      limitSouthWest()
    } else if (
      player.pos.y < TILESIZE * 5.5 &&
      player.pos.x > TILESIZE * east &&
      inRPG === true
    ) {
      limitNorthEast()
    } else if (
      player.pos.y < TILESIZE * 5.5 &&
      player.pos.x < TILESIZE * 10 &&
      inRPG === true
    ) {
      limitNorthWest()
    } else if (
      player.pos.y > TILESIZE * south &&
      player.pos.x > TILESIZE * east &&
      inRPG === true
    ) {
      limitSouthEast()
    } else if (player.pos.x > TILESIZE * east) {
      limitEast()
    } else if (player.pos.y < TILESIZE * 5.5 && inRPG === true) {
      limitNorth()
    } else if (player.pos.y > TILESIZE * south) {
      limitSouth()
    } else if (player.pos.x < TILESIZE * 10) {
      limitWest()
    } else {
      k.camPos(player.pos)
    }
    k.camScale(1.5)
  })
}
