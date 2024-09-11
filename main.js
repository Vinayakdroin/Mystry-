const socket = io('http://localhost:3000');

document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        socket.emit('login', username);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
    }
});

document.getElementById('search-btn').addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value;
    if (keyword) {
        socket.emit('search', keyword);
    }
});

document.getElementById('mystery-btn').addEventListener('click', () => {
    socket.emit('enterMysteryMode');
});

socket.on('chatMessage', (message) => {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
});
