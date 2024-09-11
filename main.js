No Name:
// Elements from HTML
const findMatchBtn = document.getElementById("find-match");
const keywordInput = document.getElementById("keyword-input");
const chatSection = document.querySelector(".chat-section");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const skipBtn = document.getElementById("skip-btn");
const saveBtn = document.getElementById("save-btn");
const saveSection = document.querySelector(".save-id-section");
const saveNameInput = document.getElementById("save-name-input");
const saveFinalBtn = document.getElementById("save-final-btn");
const profileSection = document.querySelector(".profile-section");
const revealIdentityBtn = document.getElementById("reveal-identity");

let currentMatch = null;
let savedConnections = [];

// Simulating a pool of users with interests
const userPool = [
  { id: 1, keywords: ["movies", "music"], name: "Stranger 1" },
  { id: 2, keywords: ["art", "photography"], name: "Stranger 2" },
  { id: 3, keywords: ["music", "art"], name: "Stranger 3" },
  { id: 4, keywords: ["travel", "hiking"], name: "Stranger 4" }
];

// Matching logic based on keywords
findMatchBtn.addEventListener("click", () => {
  const keywords = keywordInput.value.toLowerCase().split(",").map(kw => kw.trim());
  
  // Find a match based on shared keywords
  currentMatch = userPool.find(user => 
    user.keywords.some(kw => keywords.includes(kw))
  );

  if (currentMatch) {
    startChat(currentMatch);
  } else {
    alert("No match found. Try again with different keywords.");
  }
});

// Start chat with the matched user
function startChat(match) {
  chatSection.classList.remove("hidden");
  saveSection.classList.add("hidden");
  profileSection.classList.add("hidden");

  // Clear previous messages
  chatMessages.innerHTML = "";
  appendMessage("System", You are now chatting with ${match.name}.);

  // Reset input field
  chatInput.value = "";
}

// Append a message to the chat window
function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = ${sender}: ${message};
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;  // Auto-scroll to the latest message
}

// Sending message to the chat
sendBtn.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    appendMessage("You", message);
    simulateReply(currentMatch.name);  // Simulate the stranger's reply
    chatInput.value = "";
  }
});

// Simulate a reply from the matched user
function simulateReply(sender) {
  setTimeout(() => {
    const responses = [
      "That's interesting!",
      "Tell me more!",
      "I agree!",
      "Let's chat more!"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    appendMessage(sender, randomResponse);
  }, 1000);
}

// Skip the chat (reset and start new)
skipBtn.addEventListener("click", () => {
  alert("Chat skipped. Starting new chat...");
  chatSection.classList.add("hidden");
  currentMatch = null;
  keywordInput.value = "";  // Reset the keyword input
});

// Save the current chat
saveBtn.addEventListener("click", () => {
  saveSection.classList.remove("hidden");
  chatSection.classList.add("hidden");
});

// Finalize saving the match
saveFinalBtn.addEventListener("click", () => {
  const saveName = saveNameInput.value.trim();
  if (saveName && currentMatch) {
    savedConnections.push({
      id: currentMatch.id,
      name: saveName,
      originalName: currentMatch.name
    });
    alert(${currentMatch.name} saved as ${saveName}.);
    saveSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
  } else {
    alert("Please enter a name to save this connection.");
  }
});

// Reveal identity to the saved match
revealIdentityBtn.addEventListener("click", () => {
  alert("You have revealed your identity to the saved stranger!");
  // Show more profile content or navigate to the user's personal page
});

// Functionality to display profile after saving
function showProfile() {
  profileSection.classList.remove("hidden");
}

// On page load, hide certain sections initially
window.onload = () => {
  chatSection.classList.add("hidden");
  saveSection.classList.add("hidden");
  profileSection.classList.add("hidden");
};
