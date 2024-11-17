// Selecting Elements
const cardContainer = document.getElementById('card-container');
const addMaterialBtn = document.getElementById('add-material-btn');
const newMaterialInput = document.getElementById('new-material');
const fileInput = document.getElementById('file-upload');
const recentActivityList = document.getElementById('recent-activity-list');
const ongoingCoursesCount = document.getElementById('ongoing-courses-count');
const chatIcon = document.getElementById('chatbot-icon');
const chatbot = document.getElementById('chatbot');

// Increment "Ongoing Courses" Count
function incrementOngoingCourses() {
    let count = parseInt(ongoingCoursesCount.textContent);
    ongoingCoursesCount.textContent = ++count;
}

// Add New Study Material Card
function addStudyMaterial() {
    const materialTitle = newMaterialInput.value.trim();
    if (materialTitle && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileUrl = URL.createObjectURL(file);

        // Create and Append New Material Card
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = `
            <h4>${materialTitle}</h4>
            <a href="${fileUrl}" target="_blank" class="study-link">View Material</a>
        `;
        newCard.onclick = () => window.open(fileUrl, '_blank');
        cardContainer.appendChild(newCard);

        // Log Activity
        const newActivity = document.createElement('li');
        newActivity.textContent = `Added Study Material: ${materialTitle}`;
        recentActivityList.insertBefore(newActivity, recentActivityList.firstChild);

        // Increment Ongoing Courses Count
        incrementOngoingCourses();

        // Reset Input Fields
        newMaterialInput.value = '';
        fileInput.value = '';
    } else {
        alert('Please provide a title and upload a PDF.');
    }
}

// Event Listener for Adding Study Material
addMaterialBtn.addEventListener('click', addStudyMaterial);

// Select chat icon and chatbot window


function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  const icon = document.getElementById("chatbot-icon");
  if (chatbot.style.display === "none" || chatbot.classList.contains("close-animation")) {
      chatbot.classList.remove("close-animation");
      chatbot.classList.add("open-animation");
      
      setTimeout(() => {
          chatbot.style.display = "flex";
      }, 400);
  } else {
      chatbot.classList.remove("open-animation");
      chatbot.classList.add("close-animation");
      icon.style.transform = "rotate(-360deg)";
      setTimeout(() => {
          chatbot.style.display = "none";
      }, 400);
  }
}
function sendMessage() {
  const chatInput = document.getElementById("chat-input-field");
  const chatMessages = document.getElementById("chat-messages");
  if (chatInput.value.trim() === "") return;
  // Display the user's message
  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.textContent = chatInput.value;
  chatMessages.appendChild(userMessage);
  // Send the message to the server via AJAX
  fetch("/chatbot", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ chat_text: chatInput.value })
  })
  .then(response => response.json())
  .then(data => {
      const botMessage = document.createElement("div");
      botMessage.className = "bot-message";
      botMessage.textContent = data.response || data.error;
      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;  // Auto-scroll to the latest message
  })
  .catch(error => {
      console.error("Error:", error);
  });
  chatInput.value = "";  // Clear input field
}