document.addEventListener("DOMContentLoaded", function () {
    const chatLog = document.getElementById("chat-container");
    const userInput = document.getElementById("user-input");

    const questions = [
        "Milloin tapahtuma sattui?",
        "Mikä kampus?",
        "Kenelle sattui?",
        "Mitä tapahtui ja miten tilanne syntyi?",
        "Minkä vaaran tilanne aiheutti?",
        "Missä tilassa tilanne tapahtui?",
        "Onko asialle tehty jo jotain?",
        "Mitä asialla voisi tehdä, että näin ei tapahtuisi uudelleen?"
    ];

    let currentQuestionIndex = 0;
    let answers = [];

    function askQuestion() {
        if (currentQuestionIndex < questions.length) {
            addMessage(questions[currentQuestionIndex], "bot");
        } else {
            addMessage("Kiitos ilmoituksesta!", "bot");
            userInput.style.display = "none"; // Piilotetaan syöttökenttä lopuksi
        }
    }

    function addMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = text;
        chatLog.appendChild(messageElement);

        // Scrollataan uusi viesti näkyviin
        setTimeout(() => {
            messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
    }

    function handleUserResponse(response) {
        answers.push(response);
        currentQuestionIndex++;
        setTimeout(askQuestion, 700); // Pieni viive ennen seuraavaa kysymystä
    }

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const response = userInput.value.trim();
            if (response !== "") {
                addMessage(response, "user");
                userInput.value = "";
                handleUserResponse(response);
            }
        }
    });

    // Aloitetaan suoraan ensimmäisellä kysymyksellä
    setTimeout(askQuestion, 2000);
});

// Poistetaan intro-näyttö
setTimeout(() => {
    document.getElementById("intro-screen").style.display = "none";
}, 6000);
