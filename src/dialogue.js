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

  //this is the least effective way to do this.
  {
    const voiceline1 = play("voiceline1", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline2 = play("voiceline2", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline3 = play("voiceline3", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline4 = play("voiceline4", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline5 = play("voiceline5", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline6 = play("voiceline6", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline7 = play("voiceline7", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline8 = play("voiceline8", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline9 = play("voiceline9", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline10 = play("voiceline10", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline11 = play("voiceline11", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline12 = play("voiceline12", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline13 = play("voiceline13", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline14 = play("voiceline14", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline15 = play("voiceline15", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline16 = play("voiceline16", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline17 = play("voiceline17", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline18 = play("voiceline18", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline19 = play("voiceline19", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline20 = play("voiceline20", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline21 = play("voiceline21", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline22 = play("voiceline22", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline23 = play("voiceline23", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline24 = play("voiceline24", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline25 = play("voiceline25", {
      loop: false,
      volume: 1,
      paused: true,
    })

    const voiceline26 = play("voiceline26", {
      loop: false,
      volume: 1,
      paused: true,
    })
  }

  // This is used for cheats
  k.onKeyPress("7", () => {
    dialogueLearning = dialogueLearning + 1
  })

  // This will show a dialouge when the player picks up the flower.
  onCollide("player", "dialogueFlower", (player, dialogueFlower) => {
    // This disables the players movement while the dialouge is shown
    movement = false
    // This adds an enter button so the player knows what key to press to get rid of the dialouge
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
      text(
        "As you consume the flower you feel that you are better able to understand the language of the insects around you.",
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

    // This will increase the dialogue learning variable.
    // This variable is used later to select certain texts.
    dialogueLearning = dialogueLearning + 1
    // Due to the nature of the code, the dialouge is limited to a value of 3 or below.
    if (dialogueLearning > 3) {
      dialogueLearning = 3
    }
  })

  //This destroys all dialouges and enter buttons upon pressing enter.
  k.onKeyPress("enter", () => {
    destroyAll("dialogue")
    movement = true
    destroyAll("enter")
  })

  // All dialouges. Use the arrow underneath to open/close the dialouge.
  {
    onCollide("player", "npc_1", () => {
      // This variable is used to select which voiceline to use.
      dialogueVoiceLine = 1
      // The next set of if statements uses the dialogueLearning variable to select which text to show.
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
  // If the player has not picked up a flower, this text will show.
  onCollide("player", "npc", () => {
    if (dialogueLearning === -1) {
      dialogue = ["#######"]
    }
  })

  // Once the player collides with an NPC, the press enter button will show.
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
      {
        if (dialogueVoiceLine === 1 && dialogueState === 0) {
          voiceline1.seek(0)
          voiceline1.paused = false
        }
        if (dialogueVoiceLine === 1 && dialogueState === 1) {
          voiceline1.paused = true
          voiceline2.seek(0)
          voiceline2.paused = false
        }
        if (dialogueVoiceLine === 2 && dialogueState === 0) {
          voiceline3.seek(0)
          voiceline3.paused = false
        }
        if (dialogueVoiceLine === 2 && dialogueState === 1) {
          voiceline3.paused = true
          voiceline4.seek(0)
          voiceline4.paused = false
        }
        if (dialogueVoiceLine === 3 && dialogueState === 0) {
          voiceline5.seek(0)
          voiceline5.paused = false
        }
        if (dialogueVoiceLine === 3 && dialogueState === 1) {
          voiceline5.paused = true
          voiceline6.seek(0)
          voiceline6.paused = false
        }
        if (dialogueVoiceLine === 4 && dialogueState === 0) {
          voiceline7.seek(0)
          voiceline7.paused = false
        }
        if (dialogueVoiceLine === 4 && dialogueState === 1) {
          voiceline7.paused = true
          voiceline8.seek(0)
          voiceline8.paused = false
        }
        if (dialogueVoiceLine === 4 && dialogueState === 2) {
          voiceline8.paused = true
          voiceline9.seek(0)
          voiceline9.paused = false
        }
        if (dialogueVoiceLine === 5 && dialogueState === 0) {
          voiceline10.seek(0)
          voiceline10.paused = false
        }
        if (dialogueVoiceLine === 5 && dialogueState === 1) {
          voiceline10.paused = true
          voiceline11.seek(0)
          voiceline11.paused = false
        }
        if (dialogueVoiceLine === 5 && dialogueState === 2) {
          voiceline11.paused = true
          voiceline12.seek(0)
          voiceline12.paused = false
        }
        if (dialogueVoiceLine === 6 && dialogueState === 0) {
          voiceline13.seek(0)
          voiceline13.paused = false
        }
        if (dialogueVoiceLine === 6 && dialogueState === 1) {
          voiceline13.paused = true
          voiceline14.seek(0)
          voiceline14.paused = false
        }
        if (dialogueVoiceLine === 6 && dialogueState === 2) {
          voiceline14.paused = true
          voiceline15.seek(0)
          voiceline15.paused = false
        }
        if (dialogueVoiceLine === 7 && dialogueState === 0) {
          voiceline16.seek(0)
          voiceline16.paused = false
        }
        if (dialogueVoiceLine === 7 && dialogueState === 1) {
          voiceline16.paused = true
          voiceline17.seek(0)
          voiceline17.paused = false
        }
        if (dialogueVoiceLine === 7 && dialogueState === 2) {
          voiceline17.paused = true
          voiceline18.seek(0)
          voiceline18.paused = false
        }
        if (dialogueVoiceLine === 7 && dialogueState === 3) {
          voiceline18.paused = true
          voiceline19.seek(0)
          voiceline19.paused = false
        }
        if (dialogueVoiceLine === 7 && dialogueState === 4) {
          voiceline19.paused = true
          voiceline20.seek(0)
          voiceline20.paused = false
        }
        if (dialogueVoiceLine === 8 && dialogueState === 0) {
          voiceline21.seek(0)
          voiceline21.paused = false
        }
        if (dialogueVoiceLine === 8 && dialogueState === 1) {
          voiceline21.paused = true
          voiceline22.seek(0)
          voiceline22.paused = false
        }
        if (dialogueVoiceLine === 8 && dialogueState === 2) {
          voiceline22.paused = true
          voiceline23.seek(0)
          voiceline23.paused = false
        }
        if (dialogueVoiceLine === 9 && dialogueState === 0) {
          voiceline24.seek(0)
          voiceline24.paused = false
        }
        if (dialogueVoiceLine === 9 && dialogueState === 1) {
          voiceline24.paused = true
          voiceline25.seek(0)
          voiceline25.paused = false
        }
        if (dialogueVoiceLine === 9 && dialogueState === 2) {
          voiceline25.paused = true
          voiceline26.seek(0)
          voiceline26.paused = false
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
          //there is probably a way to do this better but couldn't find it
          voiceline2.paused = true
          voiceline4.paused = true
          voiceline6.paused = true
          voiceline8.paused = true
          voiceline9.paused = true
          voiceline11.paused = true
          voiceline12.paused = true
          voiceline14.paused = true
          voiceline15.paused = true
          voiceline16.paused = true
          voiceline17.paused = true
          voiceline18.paused = true
          voiceline19.paused = true
          voiceline20.paused = true
          voiceline22.paused = true
          voiceline23.paused = true
          voiceline25.paused = true
          voiceline26.paused = true
        }
      }
    }
    onCollideEnd("player", "npc", () => {
      destroyAll("enter")
    })
  })
}
