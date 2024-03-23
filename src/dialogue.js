import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import { k } from "./game.js"
export let movement = true
export function dialogue() {
  const player = getPlayer()

  let dialogueState = 0

  const dialogue = ["Hey, how are you?", "I'm fine, thank you. And you?"]

  onCollide("player", "npc_1", () => {
    k.add([
      sprite("pressEnter", { anim: "idle" }),
      pos(TILESIZE * 19, TILESIZE * 10),
      z(2),
      anchor("right"),
      "enter",
      scale(2),
    ])
  })

  onCollideUpdate("player", "npc_1", () => {
    if (isKeyReleased("enter")) {
      movement = false
      destroyAll("dialogue")
      add([
        pos(k.camPos().x - TILESIZE * 8, k.camPos().y - TILESIZE * 4.5),
        z(2),
        color(0, 0, 0),
        text(dialogue[dialogueState], {
          size: 20, // 48 pixels tall
          width: TILESIZE * 16, // it'll wrap to next line when width exceeds this value
          font: "sans-serif", // specify any font you loaded or browser built-in
        }),
        "dialogue",
      ])
      add([
        rect(TILESIZE * 16 + 4, TILESIZE * 3 + 4),
        outline(1),
        color(210, 180, 140),
        opacity(0.8),
        pos(k.camPos().x - TILESIZE * 8, k.camPos().y - TILESIZE * 4.5),
        "dialogue",
      ])
      onCollideEnd("player", "npc_1", () => {
        destroyAll("dialogue")
        dialogueState = 0
      })

      dialogueState++

      if (dialogueState > dialogue.length) {
        destroyAll("dialogue")
        movement = true
        destroyAll("enter")
      }
    }
    onCollideEnd("player", "npc_1", () => {
      destroyAll("enter")
    })
  })
}
