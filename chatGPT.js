const apiKey = 'sk-LnviQucoTwlXVY7fmR-VC1T3sL8oJBlcvYq8CJ-ABKT3BlbkFJXpvtyKbr6LBH5NrB_otg2JvQlRv9S6guikAdUU770A'; // Replace with your actual API key
const endpoint = 'https://api.openai.com/v1/chat/completions';

let conversationHistory = [];

const enter = document.getElementById("submit");
const inputField = document.getElementById("question");

enter.addEventListener("click", function() {
    load();
    showQuestion();
    getResponse();
    document.getElementById("question").value = "";
});

inputField.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
    load();
    showQuestion();
    getResponse();
    document.getElementById("question").value = "";
    }
});


function getResponse() {

    addMessage("user", document.getElementById("question").value);
    const data = {
        model: "gpt-3.5-turbo", // You can also use "gpt-3.5-turbo"
        messages: [
            { role: "system", content: "You are a helpful assistant with school work. Ensure to apply guidance in your assistance" },
            ...conversationHistory
        ]
    };
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        addMessage("assistant", data.choices[0].message.content);

        let text = document.createElement('div');
        text.classList.add('text');
        text.textContent = data.choices[0].message.content;
        document.getElementById("display").appendChild(text);
        //document.getElementById("display").innerText += data.choices[0].message.content;

        document.getElementById("loading").innerText = "\u00A0";
    })
    .catch(error => {
        console.error(error);
    });
}

function load() {
    document.getElementById("loading").innerText = "Loading...";
}

function showQuestion() {
    let input = document.getElementById("question").value;
    let text = document.createElement('div');
    text.classList.add('input');
    text.textContent = input;
    document.getElementById("display").appendChild(text);
}

function addMessage(role, content) {
    conversationHistory.push({ role: role, content: content });
}
