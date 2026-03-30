const API_KEY = "YOUR_GEMINI_API_KEY";

function startListening() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "hi-IN";

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    document.getElementById("output").innerText = "You: " + text;
    sendToGemini(text);
  };

  recognition.start();
}

async function sendToGemini(userText) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    }
  );

  const data = await response.json();
  const reply = data.candidates[0].content.parts[0].text;

  document.getElementById("output").innerText += "\nAI: " + reply;

  speak(reply);
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  window.speechSynthesis.speak(speech);
}
