import kaboom from "kaboom"
import { entityLogic } from "./entities.js"
import { dialogue } from "./dialogue.js"
import { cameraLogic } from "./Camera.js"
import { resetNPC } from "./gameObjects.js"
import { getBoss } from "./gameObjects.js"

/**
 *  Hier werden Funktionen aus den eigenen Datein eingebunden.
 * Die Dateien liegen jeweils im `src` Verzeichnis. Funktionen die in anderen
 * Dateien definiert werden, und hier verwendet werden, müssen das
 * Schlüsselwort `export` haben. Werden mehrere Funktionen exportiert, braucht
 * es die `{}`-Klammern. Wird nur eine einzige Funktion exportiert, kann man
 * diese mit dem Schlüsselwort `default` kennzeichnen, und dann kann die
 * Funktion auch ohne `{}`-Klammer importiert werden.
 */
import loadSprites from "./sprites.js"

import loadSounds from "./sounds.js"

/**
 * Wir können auch einzelne Variablen importieren.
 * Das können wir verwenden um globale Konstanten zu definieren, die wir
 * dann in verschiedenen Datein brauchen können. Das eignet sich vor allem
 * für Dinge wie TILESIZE oder FPS. Diese möchten wir an einem Ort
 * haben, und schnell um ganzen Code ändern können.
 */
import { TILESIZE } from "./globals.js"

import { getPlayer } from "./player.js"

/**
 * Hier wird die GameEngine initialisiert. Wir können hier verschiedene Dinge
 * anpassen. Wichtig ist das wir kaboom sagen wo unser Spiel gezeichnet werden
 * soll, dafür geben wir das HTML-Canvas-Element an.
 * Ganz wichtig ist die Höhe und Breite von unserem Spiel, das müssen Sie so
 * anpassen, dass es für Sie stimmt. Am besten verwenden Sie hier ein
 * vielfaches von TILESIZE.
 */
export const k = kaboom({
  font: "sinko",
  background: [0, 0, 0],
  debug: true,
  height: TILESIZE * 16,
  width: TILESIZE * 30,
  canvas: document.getElementById("game-canvas"),
})

export let score = 0

/**
 * Diese Funktion ladet die Graphiken und Animationen die wir später im Spiel
 * verwenden möchten. Wir müssen diese Funktion noch vor allen anderen
 * aufrufen, damit die Graphiken auch verfügbar sind.
 */
loadSprites()

loadSounds()

/**
 * Diese Funktion erstellt die generelle Spiellogik die in allen Levels gilt.
 *
 * Die Funktion kann auch abgeändert werden, wenn nicht all diese Dinge in allen
 * Leveln gelten sollen. Wenn Logik aber in mehreren Levels verwendet wird, sollte
 * diese hier implementiert werden. Damit Änderungen nur an einer Stelle gemacht
 * werden müssen.
 */
export function addGeneralGameLogic() {
  const player = getPlayer()

  // Erstelle das UI-Element HP-Balken
  createHPBar()
  createBossHPBar()
  entityLogic()
  dialogue()
  cameraLogic()
  resetNPC()
  createScore()

  /** Wenn der Spieler mit einem Spielobjekt mit dem Tag `heal` kollidiert, wird
   * der Spieler um `healAmount` von dem Spielobjekt geheilt. Hat das
   * Spielobjekt `isConsumable`, wird das Spielobjekt gelöscht.
   */
  k.onCollide("heal", "player", (heal, player) => {
    player.heal(heal.healAmount)
    if (heal.isConsumable === true) {
      heal.destroy()
    }
  })

  k.onCollideUpdate("spike", "player", (spike, player) => {
    if (player.isInvincible === false) {
      player.hurt(10)
      k.play("hit", { volume: 1 })
      player.isInvincible = true

      setTimeout(() => {
        player.isInvincible = false
      }, 1000)
    }
  })

  k.onCollide("score", "player", (score, player) => {
    player.score += score.scoreAmount
    player.endScore += score.scoreAmount * 100
    if (score.isConsumable === true) {
      score.destroy()
    }
    k.play("coin", { volume: 1 })
  })

  k.onCollide("player", "swordGrounded", (player, swordGrounded) => {
    if (swordGrounded.isConsumable === true) {
      swordGrounded.destroy()
    }
    k.play("pickup", { volume: 1 })
    k.add([
      sprite("pressH", { anim: "idle" }),
      pos(player.pos.x + 1 * TILESIZE, player.pos.y),
      z(-1),
      anchor("right"),
      scale(2),
    ])
    player.swordUnlocked = true
  })

  k.onCollide("player", "projectileGrounded", (player, projectileGrounded) => {
    if (projectileGrounded.isConsumable === true) {
      projectileGrounded.destroy()
    }
    k.play("pickup", { volume: 1 })
    k.add([
      sprite("pressJ", { anim: "idle" }),
      pos(player.pos.x + 1 * TILESIZE, player.pos.y),
      z(-1),
      anchor("right"),
      scale(2),
    ])
    player.projectileUnlocked = true
  })

  /**
   * Wenn der Spieler mit einem Hindernis kollidiert, wird dem Spieler so viel
   * Schaden zugefügt, wie das Hindernis `dmgAmount` hat. Hat das Hindernis
   * `isConsumable`, wird das Hindernis gelöscht.
   */
  k.onCollide("obstacle", "player", (obstacle, player) => {
    k.play("hit", { volume: 0.5 })
    player.hurt(obstacle.dmgAmount)
    if (obstacle.isConsumable === true) {
      obstacle.destroy()
    }
  })

  /** Wenn der Spieler geheilt wird, dann wird seine Geschwindigkeit für 1
   * Sekunde verdoppelt. Danach wird die Geschwindigkeit wieder zurück
   * gesetzt.
   */
  player.on("heal", () => {
    k.play("heal", { volume: 0.3 })
  })
}

/**
 * Erstelle das UI-Element HP-Balken.
 */
function createHPBar() {
  const player = getPlayer()
  if (player == null) return

  const x = 50
  const y = 20
  const HP_BAR_WIDTH = 100
  const HP_BAR_HEIGHT = 10

  // Dies ist das UI-Element das den Rest der dazu gehört einpackt.
  const bar = k.add([k.pos(x, y), k.fixed(), k.z(10), "hp-bar"])

  bar.add([k.text("HP", { size: 20, font: "sans-serif" }), k.anchor("right")])

  bar.add([
    k.rect(HP_BAR_WIDTH, HP_BAR_HEIGHT),
    k.outline(4, k.GREEN.darken(100)),
    k.color(0, 0, 0),
    k.anchor("left"),
    k.pos(10, 0),
  ])

  // Dieser Teil zeigt den grünenden Balken an.
  bar.add([
    k.rect((player.hp() / player.max_hp) * HP_BAR_WIDTH, HP_BAR_HEIGHT),
    k.color(0, 255, 0),
    k.anchor("left"),
    k.pos(10, 0),
    {
      // Damit wird in jedem Frame überprüft ob der HP-Balken angepasst werden muss.
      update() {
        const player = getPlayer()
        this.width = (player.hp() / player.max_hp) * HP_BAR_WIDTH
      },
    },
  ])
}

function createBossHPBar() {
  const boss = getBoss()
  if (boss == null) return

  const x = 500
  const y = 40
  const HP_BAR_WIDTH = 600
  const HP_BAR_HEIGHT = 20

  // Dies ist das UI-Element das den Rest der dazu gehört einpackt.
  const bar = k.add([k.pos(x, y), k.fixed(), k.z(10), "hp-bar"])

  bar.add([k.text("HP", { size: 20, font: "sans-serif" }), k.anchor("right")])

  bar.add([
    k.rect(HP_BAR_WIDTH, HP_BAR_HEIGHT),
    k.outline(4, k.RED.darken(200)),
    k.color(0, 0, 0),
    k.anchor("center"),
    k.pos(10, 0),
  ])

  // Dieser Teil zeigt den grünenden Balken an.
  bar.add([
    k.rect((boss.hp() / boss.max_hp) * HP_BAR_WIDTH, HP_BAR_HEIGHT),
    k.color(130, 0, 0),
    k.anchor("center"),
    k.pos(10, 0),
    {
      // Damit wird in jedem Frame überprüft ob der HP-Balken angepasst werden muss.
      update() {
        const player = getBoss()
        this.width = (boss.hp() / boss.max_hp) * HP_BAR_WIDTH
      },
    },
  ])
}

function createScore() {
  const player = getPlayer()

  const scoreboard = k.add([k.pos(50, 50), k.fixed(), k.z(10), "scoreboard"])

  scoreboard.add([
    k.sprite("coin", { anim: "idle" }),
    k.scale(2.5),
    k.anchor("right"),
    k.pos(20, 0),
  ])

  scoreboard.add([
    k.text(player.score + "x", { size: 15, font: "sans-serif" }),
    k.scale(2),
    k.anchor("left"),
    k.pos(10, 0),
    {
      update() {
        this.text = player.score + "x"
      },
    },
  ])
}
