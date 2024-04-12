import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import { k } from "./game.js"
let dialogueLearning = -1
export let movement = true
export function dialogue() {
  const player = getPlayer()

  let dialogueState = 0

  let dialogue = []

  let dialogueVoiceLine = 0

  k.onKeyPress("7", () => {
    dialogueLearning = dialogueLearning + 1
  })
  onCollide("player", "dialogueFlower", (player, dialogueFlower) => {
    movement = false
    k.add([
      sprite("pressEnter", { anim: "idle" }),
      pos(dialogueFlower.pos.x, dialogueFlower.pos.y),
      z(2),
      anchor("right"),
      "enter",
      scale(2),
    ])
    add([
      pos(k.camPos().x - TILESIZE * 8, k.camPos().y - TILESIZE * 4.5),
      z(2),
      color(0, 0, 0),
      text("hello world", {
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

    dialogueLearning = dialogueLearning + 1
    if (dialogueLearning > 3) {
      dialogueLearning = 3
    }
  })

  k.onKeyPress("enter", () => {
    destroyAll("dialogue")
    movement = true
    destroyAll("enter")
  })

  // All dialouges. Use the arrow underneath to open/close the dialouge.
  {
    onCollide("player", "npc_1", () => {
      dialogueVoiceLine = 1
      if (dialogueLearning === 3) {
        dialogue = [
          "Who are you and how did you find this place?",
          "Outsiders are not allowed to go past this point.",
        ]
      } else {
        dialogue = [
          "### ### ### ### how did ### find #### place?",
          "####### are ### allowed ## go past #### point.",
        ]
      }
    })
    onCollide("player", "npc_2", () => {
      dialogueVoiceLine = 2
      if (dialogueLearning === 3) {
        dialogue = [
          "We felt a sudden surge of evil energy from the dragons tomb yesterday.",
          "This place is not safe for you, leave now.",
        ]
      } else {
        dialogue = [
          "## #### # ###### surge of #### energy #### ### ##### tomb #######.",
          "#### ##### ## ### safe ### ###, ##### now.",
        ]
      }
    })
    onCollide("player", "npc_3", () => {
      dialogueVoiceLine = 3
      if (dialogueLearning === 3) {
        dialogue = [
          "We serve to guard the tomb of the dragon.",
          "It was sealed away 1000 years ago.",
        ]
      } else {
        dialogue = [
          "## ##### ## guard ### tomb ## ### ######.",
          "## ### sealed #### 1000 years ####.",
        ]
      }
    })
    onCollide("player", "npc_4", () => {
      dialogueVoiceLine = 4
      if (dialogueLearning === 3) {
        dialogue = [
          "Why are you here? The ants should have stopped you.",
          "Only ants, spiders, and ladybugs are allowed near the tomb.",
          "Turn back now.",
        ]
      } else if (dialogueLearning === 1) {
        dialogue = [
          "Why ### ### here? ### ants ###### ##### stopped ###.",
          "Only ants, ###### and ladybugs ### allowed #### ### ####",
          "#### back ###.",
        ]
      } else {
        dialogue = [
          "#### ### ### here? ### ants ###### ##### stopped ###.",
          "Only #### ###### and ##### ### allowed #### ### ####",
          "#### back ###.",
        ]
      }
    })
    onCollide("player", "npc_5", () => {
      dialogueVoiceLine = 5
      if (dialogueLearning === 3) {
        dialogue = [
          "I'm not well versed in the art of alchemy...",
          "But something feels wrong about you.",
          "Where do you come from and why are you here?",
        ]
      } else if (dialogueLearning === 1) {
        dialogue = [
          "### not #### versed in #### ### ## alchemy...",
          "### something ##### wrong ##### you.",
          "Where ### ## come from ### why are ### here?",
        ]
      } else {
        dialogue = [
          "#### not #### #### in #### art ## alchemy...",
          "### something #### wrong ##### ####",
          "Where ### ### come #### ### why ### ### ####",
        ]
      }
    })
    onCollide("player", "npc_6", () => {
      dialogueVoiceLine = 6
      if (dialogueLearning === 3) {
        dialogue = [
          "The dragon is a powerfull creature that destroyed half of the worlds population.",
          "It is now locked away in a tomb, guarded by a giant beetle.",
          "There is no reason for you to go beyond this point.",
        ]
      } else if (dialogueLearning === 1) {
        dialogue = [
          "### dragon ## a ###### ###### that ##### half ## the #### population.",
          "It ## ### locked #### in # tomb, guarded ## # giant #####.",
          "##### is no reason ### you ## ## beyond this #####",
        ]
      } else {
        dialogue = [
          "### ###### ## a ###### ###### that ##### half ## ## #### population.",
          "It ## ### ##### #### in # ####, guarded ## # #### #####.",
          "##### is ### reason ### ## ## ## beyond this #####",
        ]
      }
    })
    onCollide("player", "npc_7", () => {
      dialogueVoiceLine = 7
      if (dialogueLearning === 3) {
        dialogue = [
          "I feel an evil presence from you. ",
          "I feel the same when I visit the dragons tomb.",
          "I knew the dragon summoned something... ",
          "But he couldn't have summoned you... ",
          "Right?",
        ]
      } else if (dialogueLearning === 2) {
        dialogue = [
          "# feel #### evil presence #### you. ",
          "# feel ### same when # visit ### dragons tomb.",
          "# knew the dragon ##### something... ",
          "But ## couldn't have ##### you... ",
          "Right?",
        ]
      } else if (dialogueLearning === 1) {
        dialogue = [
          "# feel #### #### presence #### you. ",
          "# feel ### ### when # visit ### ##### tomb.",
          "# knew the ##### ##### something... ",
          "But ## ###### have ##### you... ",
          "Right?",
        ]
      } else {
        dialogue = [
          "# feel #### #### presence #### #### ",
          "# feel ### ### ### # visit ### ##### tomb.",
          "# knew ### ##### ##### something... ",
          "But ## ###### #### ##### you... ",
          "Right?",
        ]
      }
    })
    onCollide("player", "npc_8", () => {
      dialogueVoiceLine = 8
      if (dialogueLearning === 3) {
        dialogue = [
          "You've come far enough. ",
          "The dragon is too dangerous to release, why will you not listen to us?",
          "Any further and we will have to use alchemy in order to stop you.",
        ]
      } else if (dialogueLearning === 2) {
        dialogue = [
          "You've come ### enough. ",
          "### dragon ### too dangerous ## release, why #### ### not listen ## us?",
          "### further ### we will have to ### alchemy in order to #### you.",
        ]
      } else if (dialogueLearning === 1) {
        dialogue = [
          "##### come ### enough. ",
          "### ##### ### too dangerous ## release, why #### ### not listen ## ###",
          "### further ### ### will have ## ### alchemy ## order ## #### you.",
        ]
      } else {
        dialogue = [
          "##### #### ### enough. ",
          "### ##### ### too dangerous ## ##### why #### ### ### listen ## ###",
          "### further ### ### will ### ## ### alchemy ## #### ## #### you.",
        ]
      }
    })
    onCollide("player", "npc_9", () => {
      dialogueVoiceLine = 9
      if (dialogueLearning === 3) {
        dialogue = [
          "Us ladybugs have learned from the mistake of summoning the dragon.",
          "That burdon is now all of ours to bear.",
          "You've been warned enough, we will not hold back.",
        ]
      } else if (dialogueLearning === 2) {
        dialogue = [
          "Us ladybugs #### learned from ### mistake ## summoning ### dragon.",
          "#### burdon ## now all of ours to bear.",
          "##### been warned enough, ## will not hold back.",
        ]
      } else if (dialogueLearning === 1) {
        dialogue = [
          "## ladybugs #### learned from ### mistake ## summoning ### #####",
          "#### burdon ## ### ### ## ours to bear.",
          "##### ### warned enough, ## will not #### back.",
        ]
      } else {
        dialogue = [
          "## ladybugs #### ##### from ### mistake ## #### ### #####",
          "#### burdon ## ### ### ## ### to bear.",
          "##### ### warned ####, ## will ### #### back.",
        ]
      }
    })
  }

  onCollide("player", "npc", () => {
    if (dialogueLearning === -1) {
      dialogue = ["#######"]
    }
  })

  onCollide("player", "npc", (player, npc) => {
    k.add([
      sprite("pressEnter", { anim: "idle" }),
      pos(npc.pos.x, npc.pos.y),
      z(2),
      anchor("right"),
      "enter",
      scale(2),
    ])
  })

  onCollideUpdate("player", "npc", () => {
    if (isKeyReleased("enter")) {
      movement = false
      destroyAll("dialogue")
      if (dialogueVoiceLine === 1 && dialogueState === 0) {
        k.play("voiceline1")
      }
      if (dialogueVoiceLine === 1 && dialogueState === 1) {
        k.play("voiceline2")
      }
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
      onCollideEnd("player", "npc", () => {
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
    onCollideEnd("player", "npc", () => {
      destroyAll("enter")
    })
  })
}
