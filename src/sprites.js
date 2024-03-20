import { TILESIZE as TS } from "./globals"
import { k } from "./game.js"

/**
 * Diese Funktion soll alle Spritesheets in das Spiel laden.
 *
 * Diese Funktion muss ganz am Anfang einmal ausgeführt werden, bevor dann
 * Spielobjekte mit diesen Sprites erstellt werden.
 *
 * Die Spritesheets könnten auch pro Level neu bzw. anders geladen werden,
 * damit können einfach andere Atmosphären im Spiel erzeugt werden.
 */
export default function loadSprites() {
  k.loadSpriteAtlas("sprites/char.png", {
    hero: {
      // Alles war hier kommt, gehört zum Sprite `hero`
      x: 0, // x-Koordinate des Pixels wo das Sprite beginnt.
      y: 0, // y-Koordinate des Pixels wo das Sprite beginnt.
      width: 3 * TS, // Die Breite des Sprites in Pixeln. Hier sind jeweils 3 Animationen nebeneinander, deshalb 3 * TILESIZE
      height: 4 * TS, // Die Höhe des Sprites in Pixeln. Hier sind die 4 Laufrichtungen untereinander, deshalb 4 * TILESIZE
      sliceX: 3, // In der x-Richtung sind es 3 Kacheln, so wird es gleichmässig aufgeteilt.
      sliceY: 4, // In der y-Richtung sind es 4 Kacheln, so wird es gleichmässig aufgeteilt.
      anims: {
        // Hier werden die verschiedenen Animationen definiert.
        runDown: { from: 0, to: 2, loop: true }, // Die Animation nach unten rennen, besteht aus den ersten 3 Kacheln. Die Animation soll sich wiederholen wenn sie durchlaufen ist.
        idleDown: 1, // Ist es nur eine Kachel, kann diese direkt angegeben werden.
        runLeft: { from: 3, to: 5, loop: true, speed: 10 }, // Die Geschwindigkeit der Animation kann auch verändert werden.
        idleLeft: 4,
        runRight: { from: 6, to: 8, loop: true },
        idleRight: 7,
        runUp: { from: 9, to: 11, loop: true, speed: 5 },
        idleUp: 10,
      },
    },
  })

  k.loadSpriteAtlas("sprites/npc1.png", {
    npc1: {
      // Alles war hier kommt, gehört zum Sprite `hero`
      x: 0, // x-Koordinate des Pixels wo das Sprite beginnt.
      y: 0, // y-Koordinate des Pixels wo das Sprite beginnt.
      width: 3 * TS, // Die Breite des Sprites in Pixeln. Hier sind jeweils 3 Animationen nebeneinander, deshalb 3 * TILESIZE
      height: 2 * TS, // Die Höhe des Sprites in Pixeln. Hier sind die 4 Laufrichtungen untereinander, deshalb 4 * TILESIZE
      sliceX: 3, // In der x-Richtung sind es 3 Kacheln, so wird es gleichmässig aufgeteilt.
      sliceY: 2, // In der y-Richtung sind es 4 Kacheln, so wird es gleichmässig aufgeteilt.
      anims: {
        // Hier werden die verschiedenen Animationen definiert.
        runLeft: { from: 0, to: 2, loop: true, speed: 10 }, // Die Geschwindigkeit der Animation kann auch verändert werden.
        idleLeft: 0,
        runRight: { from: 3, to: 5, loop: true, speed: 10 },
        idleRight: 3,
      },
    },
  })

  k.loadSpriteAtlas("sprites/spider.png", {
    spider: {
      // Alles war hier kommt, gehört zum Sprite `hero`
      x: 0, // x-Koordinate des Pixels wo das Sprite beginnt.
      y: 0, // y-Koordinate des Pixels wo das Sprite beginnt.
      width: 4 * TS, // Die Breite des Sprites in Pixeln. Hier sind jeweils 3 Animationen nebeneinander, deshalb 3 * TILESIZE
      height: 1 * TS, // Die Höhe des Sprites in Pixeln. Hier sind die 4 Laufrichtungen untereinander, deshalb 4 * TILESIZE
      sliceX: 4, // In der x-Richtung sind es 3 Kacheln, so wird es gleichmässig aufgeteilt.
      sliceY: 1, // In der y-Richtung sind es 4 Kacheln, so wird es gleichmässig aufgeteilt.
      anims: {
        // Hier werden die verschiedenen Animationen definiert.
        idle: { from: 0, to: 3, loop: true, speed: 5 }, // Die Geschwindigkeit der Animation kann auch verändert werden.
      },
    },
  })

  k.loadSpriteAtlas("sprites/ladybugEvil.png", {
    ladybugEvil: {
      x: 0,
      y: 0,
      width: 3 * TS,
      height: 1 * TS,
      sliceX: 3,
      sliceY: 1,
      anims: {
        idle: { from: 0, to: 2, loop: true, speed: 5 },
      },
    },
  })

  k.loadSpriteAtlas("sprites/ladybug.png", {
    ladybug: {
      x: 0,
      y: 0,
      width: 3 * TS,
      height: 1 * TS,
      sliceX: 3,
      sliceY: 1,
      anims: {
        idle: { from: 0, to: 2, loop: true, speed: 5 },
      },
    },
  })

  k.loadSpriteAtlas("sprites/door.png", {
    door: { x: 0 * TS, y: 0 * TS, width: TS, height: TS },
  })

  /**
   * Hier werden alle sprites für die statischen Spielobjekte geladen.
   */
  k.loadSpriteAtlas("sprites/ground.png", {
    grass: { x: 0, y: 0, width: TS, height: TS }, // Hier geben wir in Pixeln an, wo die Grafik für das Spielobjekt anfängt, und aufhört (oben-links bis unten-rechts).
    stone: { x: 1 * TS, y: 0, width: TS, height: TS }, // Wir verwenden hier TILESIZE, weil all unsere Grafiken im Moment genau 32x32 Pixel sind.
    mushroom: { x: 2 * TS, y: 0 * TS, width: TS, height: TS },
    flower: { x: 3 * TS, y: 0 * TS, width: TS, height: TS },
    trunk: { x: 0 * TS, y: 1 * TS, width: TS, height: TS },
    tree: { x: 1 * TS, y: 1 * TS, width: TS, height: TS },
    cave: { x: 2 * TS, y: 1 * TS, width: TS, height: TS },
    wall: { x: 3 * TS, y: 1 * TS, width: TS, height: TS },
  })

  k.loadSpriteAtlas("sprites/ground2.png", {
    bog_grass: { x: 0, y: 0, width: TS, height: TS }, // Hier geben wir in Pixeln an, wo die Grafik für das Spielobjekt anfängt, und aufhört (oben-links bis unten-rechts).
    bog_vines: { x: 0 * TS, y: 1 * TS, width: TS, height: TS }, // Wir verwenden hier TILESIZE, weil all unsere Grafiken im Moment genau 32x32 Pixel sind.
  })
  k.loadSpriteAtlas("sprites/background.png", {
    background: { x: 0, y: 0, width: 1920, height: 1080 }, // Hier geben wir in Pixeln an, wo die Grafik für das Spielobjekt anfängt, und aufhört (oben-links bis unten-rechts).
  })
  k.loadSpriteAtlas("sprites/game_menu.png", {
    game_menu: { x: 0, y: 0, width: 800, height: 600 }, // Hier geben wir in Pixeln an, wo die Grafik für das Spielobjekt anfängt, und aufhört (oben-links bis unten-rechts).
  })
  k.loadSpriteAtlas("sprites/swordRight.png", {
    swordRight1: { x: 0, y: 0, width: 32, height: 32 },
    swordRight2: { x: 32, y: 0, width: 32, height: 32 },
  })
  k.loadSpriteAtlas("sprites/swordLeft.png", {
    swordLeft1: { x: 0, y: 0, width: 32, height: 32 },
    swordLeft2: { x: 32, y: 0, width: 32, height: 32 },
  })
  k.loadSpriteAtlas("sprites/silcProjectile.png", {
    silcLeft: { x: 0, y: 0, width: 32, height: 32 },
  })
  k.loadSpriteAtlas("sprites/silcProjectile.png", {
    silcRight: { x: 0 * TS, y: 1 * TS, width: TS, height: TS },
  })
}
