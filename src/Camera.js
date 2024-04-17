import { getPlayer } from "./player.js"
import { k } from "./game.js"
import { TILESIZE } from "./globals.js"

let currentLevel = 1

export function cameraLogic() {
  const player = getPlayer()
  // When the player moves to the next level, the currentLevel will increase by 1.
  // This is used later to detect which level the player is on.
  k.onCollide("player", "goal", () => {
    currentLevel = currentLevel + 1
  })
  // This is used to track when the player uses a cheat code to increase the level they are on.
  k.onKeyPressRepeat("c", () => {
    k.onKeyRelease("0", () => {
      currentLevel = currentLevel + 1
    })
  })

  // This will define how far north the camera can go.
  // All directional variables are later multiplied by TILESIZE.
  // The screen is about 11 tiles tall on a 1.5 zoom scale.
  // This means that if we stop moving the camera 5.5 tiles before the top of the screen,
  // It will only show the map and not any blank space.
  // Because the northmost tile is always at the top of the txt file in RPG maps, this will stay at 5.5.
  const north = 5.5

  // This will define how far west the camera can go.
  // As long as the camera stays at a 1.5 scale, this will stay at 10 for the same reason as the north value.
  const west = 10

  // This will define how low the camera can go.
  // The number is equivelant to the number of rows in a level.txt.
  let south = 0
  if (currentLevel === 1) {
    south = 15
  } else if (currentLevel === 2) {
    south = 13
  } else if (currentLevel === 3) {
    south = 22
  } else if (currentLevel === 4) {
    south = 15
  } else if (currentLevel === 5) {
    south = 13
  } else if (currentLevel === 6) {
    south = 15
  } else if (currentLevel === 7) {
    south = 15
  } else if (currentLevel === 8) {
    south = 15
  }
  // The screen is about 11 tiles tall on a 1.5 zoom scale.
  // This means that if we stop moving the camera 5.5 tiles before the top of the screen, it will only show the map.
  south = south - 5.5

  // This will define how far east the camera can go
  // The values are the number of columns in the level.txt
  // Columns can be found at the bottom of the studio screen
  let east = 0
  if (currentLevel === 1) {
    east = 158
  } else if (currentLevel === 2) {
    east = 29
  } else if (currentLevel === 3) {
    east = 183
  } else if (currentLevel === 4) {
    east = 124
  } else if (currentLevel === 5) {
    east = 29
  } else if (currentLevel === 6) {
    east = 152
  } else if (currentLevel === 7) {
    east = 29
  } else if (currentLevel === 8) {
    east = 165
  }
  // This centers the camera. The screen is about 20 tiles wide at a 1.5 zoom scale.
  // This means that we should stop moving the camera east 10 tiles before the right side of the screen.
  // An additional 1 is subtracted so you can easily click on the last value in a row to get the column value for east.
  east = east - 10 - 1

  // This will allow us to specify if the player is in an RPG or not.
  // This is used so that the camera can go upwards forever in the Jump and Run.
  let inRPG = false

  function limitWest() {
    // The direction of movement to be constricted is multiplied by the TileSize.
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
    // Here it is specified which levels are RPG levels.
    // In these levels north is retricted.
    if (currentLevel === 2 || currentLevel === 5 || currentLevel === 7) {
      inRPG = true
    }
    // Here it is specified which levels are Jump and Run levels.
    if (
      currentLevel === 1 ||
      currentLevel === 3 ||
      currentLevel === 4 ||
      currentLevel === 6 ||
      currentLevel === 8
    ) {
      inRPG = false
    }

    // Below is the code which determines which camera function to use for the current frame.

    // If the player is on the boss level then the camera will be stationary.
    if (currentLevel === 9) {
      k.camPos(15.5 * TILESIZE, 8.5 * TILESIZE)
      k.camScale(1.07)
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
