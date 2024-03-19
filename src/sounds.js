import { k } from "./game.js"

export default function loadSounds() {
  k.loadSound("jump", "sounds/jump.wav")
  k.loadSound("slash", "sounds/sword.wav")
  k.loadSound("teleport", "sounds/teleport.wav")
  k.loadSound("death", "sounds/death.wav")
  k.loadSound("hit", "sounds/hit.wav")
  k.loadSound("heal", "sounds/heal.wav")
}
