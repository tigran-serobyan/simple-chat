let socket;
let myId;
let input = document.getElementById("input");
let messagesDiv = document.getElementById("messages");
function newMessage() {
    let message = input.value;
    input.value = "";
    if (message) {
        socket.emit("send", message);
    }
}

function all(messages) {
    if (messagesDiv.childNodes.length == 0) {
        for (let i in messages) {
            messagesDiv.innerHTML += `<span>${messages[i].sender}</span><div>${messages[i].message}</div>`
        }
    }
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function add(message) {
    if (message.sender == myId) {
        messagesDiv.innerHTML += `<span class="me">${message.sender}</span><div class="me">${message.message}</div>`
    } else {
        messagesDiv.innerHTML += `<span>${message.sender}</span><div>${message.message}</div>`
    }
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function main() {
    socket = io.connect();
    socket.on("connect", function (data) {
        myId = socket.id;
    });
    socket.on("all", all);
    socket.on("new", add);
}

window.onload = main;