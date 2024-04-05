import { k } from "../game.js"
import "./level-01.js"
import "./level-02.js"
import "./level-03.js"
import "./level-04.js"
import "./level-05.js"
import "./level-06.js"
import createPlayer from "../player.js"
/**
 * Die Funktion `scene` kommt von Kaboom, und erstellt uns einen
 * abgeschlossenen Teil von unserem Spiel. Wir können das auch wie ein Level in
 * unserem Spiel betrachten. Es können aber auch Menu-Bildschirme und
 * GameOver-Bildschirme als Scenen erstellt werden.
 *
 * Eine Szene braucht immer einen Namen, und dann kommt eine Funktion. Diese
 * wird dann ausgeführt, wenn wir zu der Szene wechseln.
 *
 * Mit der Funktion `go("intro")` können wir zur Intro-Szene wechseln.
 */
k.scene("intro", () => {
  // Mit der `add`-Funktion können Objekte zu einer Szene hinzugefügt werden.
  // Wir geben dem Spielobjekt eine Liste von Funktionen an, die sagen wie
  // sich das Spielobjekt verhalten soll.
  // Hier sagen wir dem Objekt das es Text haben soll, und an welcher
  // Position der Text sein soll. Mit `anchor` können wir angeben wie das
  // Objekt verankert werden soll. Versuchen Sie mal was passiert wenn Sie
  // `anchor("botright)` verwenden.

  k.add([k.sprite("game_menu", { width: k.width(), height: k.height() })])

  k.add([
    k.text("Press SPACE to start", { size: 32, font: "sans-serif" }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ])

  // Mit dieser Funktion können wir auf Tastendrucke reagieren. Diese können
  // pro Szene anders angegeben werden. Hier wird mit `space` zur nächsten
  // Szene gewechselt. In der nächsten Szene können wir `space` dann auch zum
  // Springen verwenden.
  k.onKeyPress("f", (c) => {
    setFullscreen(!isFullscreen())
  })
  k.onKeyPress("space", () => {
    k.go("level-01")
  })
})
