import { TILESIZE } from "./globals.js"
import { k } from "./game.js"

/**
 * Erstelle das Spielobjekt Spieler.
 * Hier werden die Eigenschaften des Spielers festgelegt. Der Spieler wird dann
 * im Level 1 erstellt, und in späteren Levels wieder geladen.
 *
 * Müssen Änderungen am Spieler gemacht werden, kann man das Spielerobjekt über
 * die Funktion `getPlayer()` holen.
 */
export default function createPlayer() {
  const player = k.add([
    k.sprite("hero", { anim: "idleRight" }),
    k.pos(0, 0),
    k.body(),
    k.area(),

    // Gibt dem Spieler Lebenspunkte und die möglichkeit über die Funktionen
    // `hurt` und `heal` mit dem Spieler zu interagieren.
    k.health(50),

    // Damit wird der Spieler nicht zerstört wenn die Szene gewechselt wird.
    // Der Spieler muss dann aber bei GameOver und ähnlichen Szenen von
    // Hand gelöscht werden.
    k.stay(),

    // Das `Tag` für den Spieler, damit man Ihn einfach über kaboom erreichen
    // kann. Es sollte keine anderen Objekte geben, die auch dieses `Tag`
    // haben.
    "player",

    // Hier können Eigenschaften für den Spieler festgehalten werden, diese
    // können dann im Rest des Spiels verwendet werden.
    {
      speed: TILESIZE * 5,
      dir: null,
      dead: false,
      max_hp: 100,
    },
  ])

  /* Immer wenn sich die Position des Spielers ändert, wird die Kamera so
   * geschoben, dass der Spieler in der Mitte ist.
   */
  let counter = 0
  // this will skip one frame after 63 frames have passed.
  // The 64th frame is usually the frame in which the camera glitches.
  player.onUpdate(() => {
    if (player.pos.y < TILESIZE * 9.5) {
      k.camPos(player.pos)
    } else {
      k.camPos(player.pos.x, TILESIZE * 9.5)
    }
    k.camScale(1.5)
  })
}
/**
 *  Hilfsfunktion um das Spielobjekt von `player` einfach zu bekommen.
 */
export function getPlayer() {
  return k.get("player")[0]
}
