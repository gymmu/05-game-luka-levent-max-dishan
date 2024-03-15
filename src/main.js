// Dieser import wird immer gebraucht wenn man etwas von Kaboom verwenden
// möchte. Das ist eigentlich in fast allen Dateien der Fall.
// Mit `k.function_name` kann dann die entsprechende Funktion von Kaboom
// aufgerufen werden.
import { k } from "./game.js"

// Wenn wir eine neue Scene laden möchten, müssen wir diese zuerst importieren.
import "./scenes/intro.js"
import "./scenes/level-02.js"
import "./scenes/level-03.js"

// Mit der `k.go` Funktion, können wir Kaboom sagen zu welcher Scene wir als
// nächstes gehen möchten. In diesem Fall laden wir die `intro` Scene.
k.go("intro")
