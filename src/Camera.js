import { getPlayer } from "./player.js"
import { k } from "./game.js"
import { TILESIZE } from "./globals.js"

let currentLevel = 1

export function cameraLogic() {
  const player = getPlayer()
  // When the player moves to the next level, the currentLevel will increase by 1.
  k.onCollide("player", "goal", () => {
    currentLevel = currentLevel + 1
  })
  k.onKeyRelease("0", () => {
    currentLevel = currentLevel + 1
  })

  // This will define how far north the camera can go.
  const north = 5.5

  // This will define how far west the camera can go.
  const west = 10

  // This will define how low the camera can go
  // The number is equivelant to the number of rows in level.txt
  let south = 0
  if (currentLevel === 1) {
    south = 15
  } else if (currentLevel === 2) {
    south = 13
  } else if (currentLevel === 3) {
    south = 15
  }
  // This centers the camera. The screen is 11 tiles tall.
  // South is later multiplied by the TileSize.
  south = south - 5.5

  // This will define how far right the camera can go
  // The values are the number of columns in the level.txt
  // Columns can be found at the bottom of the studio screen
  let east = 0
  if (currentLevel === 1) {
    east = 132
  } else if (currentLevel === 2) {
    east = 29
  } else if (currentLevel === 3) {
    east = 205
  }
  // This centers the camera. The screen is 20 tiles wide.
  // East is later multiplied by the TileSize.
  // This means that when the player is at the edge, we can center the camera by subtracting 10 from total columns.
  // I added 1 so you can click on the last column of a row to get a number.
  east = east - 11

  // This will allow us to specify if the player is in an RPG or not.
  // This is used so that the camera can go upwards forever in the Jump and Run.
  let inRPG = false
  if (currentLevel === (2 || 4)) {
    inRPG = true
  }
  if (currentLevel === (1 || 3)) {
    inRPG = false
  }

  // This will reset the level counter upon the player's HP reaching zero.
  player.on("death", async () => {
    if (player === undefined) {
      currentLevel = 1
    }
  })
  // This will reset the level counter upon the player's position going below 720.
  k.onUpdate(() => {
    if (player.pos.y > 720) {
      if (player === undefined) {
        currentLevel = 1
      }
    }
  })

  k.onKeyRelease("r", () => {
    currentLevel = 1
  })

  // The following functions will limit where the camera can go.
  function limitWest() {
    // The direction of movement you want constricted is multiplied by the TileSize.
    // If the direction of movement should be unrestricted on a certain axis, "player.pos.x/y" is used.
    k.camPos(TILESIZE * west, player.pos.y)
  }
  function limitSouth() {
    k.camPos(player.pos.x, TILESIZE * south)
  }
  function limitNorth() {
    k.camPos(player.pos.x, TILESIZE * north)
  }
  function limitEast() {
    k.camPos(TILESIZE * east, player.pos.y)
  }
  function limitSouthWest() {
    k.camPos(TILESIZE * west, TILESIZE * south)
  }
  function limitNorthWest() {
    k.camPos(TILESIZE * west, TILESIZE * north)
  }
  function limitNorthEast() {
    k.camPos(TILESIZE * east, TILESIZE * north)
  }
  function limitSouthEast() {
    k.camPos(TILESIZE * east, TILESIZE * south)
  }

  player.onUpdate(() => {
    // Increase this number once you have programmed maximum east and south value for a new map.
    if (currentLevel === 9) {
      k.camPos(15 * TILESIZE, 10 * TILESIZE)
      k.camScale(1)
      return
    } else if (currentLevel > 3) {
      k.camPos(player.pos)
      k.camScale(1.5)
      return
    }
    // The following functions will determine  if the player has reached the edge of the screen,
    // and then excute the respective function.
    else if (
      player.pos.y > TILESIZE * south &&
      player.pos.x < TILESIZE * west
    ) {
      limitSouthWest()
    } else if (
      player.pos.y < TILESIZE * north &&
      player.pos.x > TILESIZE * east &&
      inRPG === true
    ) {
      limitNorthEast()
    } else if (
      player.pos.y < TILESIZE * north &&
      player.pos.x < TILESIZE * west &&
      inRPG === true
    ) {
      limitNorthWest()
    } else if (
      player.pos.y > TILESIZE * south &&
      player.pos.x > TILESIZE * east
    ) {
      limitSouthEast()
    } else if (player.pos.x > TILESIZE * east) {
      limitEast()
    } else if (player.pos.y < TILESIZE * north && inRPG === true) {
      limitNorth()
    } else if (player.pos.y > TILESIZE * south) {
      limitSouth()
    } else if (player.pos.x < TILESIZE * west) {
      limitWest()
    } else {
      k.camPos(player.pos)
    }
    // This zooms the camera in
    k.camScale(1.5)
  })
}
