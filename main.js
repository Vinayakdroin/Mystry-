// Initialize Socket.io
const socket = io('http://localhost:3000'); // Change this URL to your server's URL if different

// Store current user information
let currentUser = null;

// Handle login
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        currentUser = username;
        socket.emit('login', username);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
    }
});

// Handle profile update
document.getElementById('update-profile-btn').addEventListener('click', () => {
    const profileName = document.getElementById('profile-name').value;
    if (profileName) {
        document.getElementById('profile-display').textContent = Profile Name: ${profileName};
        socket.emit('updateProfile', profileName);
    }
});

// Handle search for strangers
document.getElementById('search-btn').addEventListener('click', () => {
    const keyword = document.getElementById('keyword').value;
    if (keyword) {
        socket.emit('search', keyword);
    }
});

// Handle entering mystery mode
document.getElementById('mystery-btn').addEventListener('click', () => {
    socket.emit('enterMysteryMode');
    document.getElementById('action-buttons').style.display = 'block';
});

// Handle uploading media
document.getElementById('upload-media-btn').addEventListener('click', () => {
    const files = document.getElementById('media-upload').files;
    if (files.length > 0) {
        const formData = new FormData();
        for (const file of files) {
            formData.append('media', file);
        }
        fetch('/upload', { // Adjust the endpoint according to your server
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
              console.log('Upload successful:', data);
          }).catch(error => {
              console.error('Error uploading files:', error);
          });
    }
});

// Handle chat actions
document.getElementById('skip-btn').addEventListener('click', () => {
    socket.emit('skipChat');
    document.getElementById('chat-container').innerHTML = '';
});

document.getElementById('save-btn').addEventListener('click', () => {
    const savedName = prompt('Enter a name to save this chat:');
    if (savedName) {
        socket.emit('saveChat', { name: savedName });
        document.getElementById('saved-chats-list').innerHTML += <li>${savedName}</li>;
    }
});

// Handle incoming chat messages
socket.on('chatMessage', (message) => {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    chatContainer.appendChild(messageElement);
});

// Handle profile updates
socket.on('profileUpdated', (profile) => {
    document.getElementById('profile-display').textContent = Profile Name: ${profile.name};
});

// Handle new chat connections
socket.on('newChat', (chatData) => {
    document.getElementById('chat-container').innerHTML = <div>${chatData.message}</div>;
});

// Handle errors and other server messages
socket.on('error', (error) => {
    console.error('Server error:', error);
});
