const localStorageKey = "chat_user_name";
let userName = localStorage.getItem(localStorageKey);

if (!userName) {
    userName = prompt("あなたの名前を入力してください:");
    if (!userName) {
        alert("ユーザー名が必要です。ページをリロードしてください。");
        window.location.reload();
    }
    localStorage.setItem(localStorageKey, userName);
}

const ws = new WebSocket("ws://localhost:8000/ws/chat");

ws.onopen = function() {
    ws.send(userName);
};

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("message-input");
const button = document.getElementById("send-button");
const changeUsernameButton = document.getElementById("change-username-button");
const newUsernameInput = document.getElementById("new-username-input");

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    
    if (data.type === "history") {
        data.messages.forEach(message => {
            const messageDiv = document.createElement("div");
            messageDiv.textContent = `${message.user}: ${message.message}`;
            messagesDiv.appendChild(messageDiv);
        });
    } else if (data.type === "message") {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = `${data.message.user}: ${data.message.message}`;
        messagesDiv.appendChild(messageDiv);
    }
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

button.onclick = function() {
    const message = input.value;
    if (message.trim() !== "") {
        ws.send(JSON.stringify({type: "message", text: message}));
        input.value = "";
    }
};

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        button.click();
    }
});

changeUsernameButton.onclick = function() {
    newUsernameInput.style.display = "block";
    newUsernameInput.focus();
};

newUsernameInput.addEventListener("blur", function() {
    const newUserName = newUsernameInput.value.trim();
    if (newUserName) {
        ws.send(JSON.stringify({type: "change-username", newUserName}));
        localStorage.setItem(localStorageKey, newUserName);
        userName = newUserName;
        newUsernameInput.value = "";
        newUsernameInput.style.display = "none";
    }
});
