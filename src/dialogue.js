import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"

export function dialogue() {
  const player = getPlayer()
  onCollide("player", "npc_1", (player) => {
    add([
      pos(player.pos.x - TILESIZE * 8, player.pos.y - TILESIZE * 5),
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
    ])
    add([
      rect(TILESIZE * 16 + 4, TILESIZE * 3 + 4),
      outline(1),
      color(210, 180, 140),
      pos(player.pos.x - TILESIZE * 8 - 2, player.pos.y - TILESIZE * 5 - 2),
    ])
    shake(5)
  })
}
