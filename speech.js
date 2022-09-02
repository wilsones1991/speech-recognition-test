const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const names = ["Ariana", "Krylle", "Bobby", "Adam", "Anthony"]

const grammar = `#JSGF V1.0; grammar names; public <name> = ${names.join(
  " | "
)};`

const recognition = new SpeechRecognition()
const speechRecognitionList = new SpeechGrammarList()

speechRecognitionList.addFromString(grammar, 1)

recognition.grammars = speechRecognitionList
recognition.continuous = false
recognition.lang = "en-US"
recognition.interimResults = false
recognition.maxAlternatives = 1

const diagnostic = document.querySelector(".output")
const hints = document.querySelector(".hints")

document.body.onclick = () => {
  recognition.start()
  console.log("Ready to receive a name command.")
}

recognition.onresult = (event) => {
  const name = event.results[0][0].transcript
  diagnostic.textContent = `Result received: ${name}.`
  console.log(`Confidence: ${event.results[0][0].confidence}`)
}

recognition.onspeechend = () => {
  recognition.stop()
}

recognition.onnomatch = (event) => {
  diagnostic.textContent = "I didn't recognize that name."
}

recognition.onerror = (event) => {
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`
}
