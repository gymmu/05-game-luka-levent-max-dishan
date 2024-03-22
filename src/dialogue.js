import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import { k } from "./game.js"
export function dialogue() {
  const player = getPlayer()

  const dialogueState = 1

  onCollide("player", "npc_1", (player) => {
    k.add([
      sprite("pressEnter", { anim: "idle", speed: 0.5 }),
      pos(TILESIZE * 19, TILESIZE * 10),
      z(2),
      anchor("right"),
      "enter",
      scale(2),
    ])
  })

  onCollideUpdate("player", "npc_1", (player) => {
    if (isKeyPressed("enter") && dialogueState == 1) {
      destroyAll("dialogue")
      add([
        pos(k.camPos().x - TILESIZE * 8, k.camPos().y - TILESIZE * 4.5),
        z(2),
        color(0, 0, 0),
        text(
          "ohhesifhrdgorfoiwhegoiwweoifheoighesroigjeof;heargoiesjrhgireahgehgoiwhegiowhegoiwehgi",
          {
            size: 20, // 48 pixels tall
            width: TILESIZE * 16, // it'll wrap to next line when width exceeds this value
            font: "sans-serif", // specify any font you loaded or browser built-in
          },
        ),
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
      })
    }
    onCollideEnd("player", "npc_1", () => {
      destroyAll("enter")
    })
  })
}
