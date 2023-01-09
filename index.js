import { io } from "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.4/socket.io.esm.min.js";
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.querySelector('#messages')
const socket = io();

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const {message, username} = e.target
  if (input.value) {
    socket.emit("chat", {message: message.value, username: username.value});
    message.value = "";
    username.value = "";
  }
});

socket.on("chat_update", ({ message, username }) => {
  messages.insertAdjacentHTML(
    "beforeend",
    `<li class="list-item new"><p>Nickname: ${username}</p><p> ${message}</p></li>`
    );
    window.scrollTo(0, document.body.scrollHeight)
});
