// Select elements for adding study materials
const cardContainer = document.getElementById('card-container');
const addMaterialBtn = document.getElementById('add-material-btn');
const newMaterialInput = document.getElementById('new-material');
const fileInput = document.getElementById('file-upload');
const recentActivityList = document.getElementById('recent-activity-list');



// Element for updating the "Ongoing Courses" count
const ongoingCoursesCount = document.querySelector('.stats .stat-box:nth-child(2) h3');

// Function to increment the "Ongoing Courses" count
function incrementOngoingCourses() {
    let count = parseInt(ongoingCoursesCount.textContent);
    ongoingCoursesCount.textContent = ++count;
}

// Function to add a new study material card
function addStudyMaterial() {
    const materialTitle = newMaterialInput.value.trim();
    if (materialTitle && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileUrl = URL.createObjectURL(file); // Generate a URL for the uploaded file

        // Create a new card for the uploaded PDF
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = `
            <h4>${materialTitle}</h4>
            <a href="${fileUrl}" target="_blank" class="study-link">View Material</a>
        `;
        newCard.onclick = () => window.open(fileUrl, '_blank');  // Make the entire card clickable

        cardContainer.appendChild(newCard);

        // Update Recent Activity Section
        const newActivity = document.createElement('li');
        newActivity.textContent = `Added Study Material: ${materialTitle}`;
        recentActivityList.insertBefore(newActivity, recentActivityList.firstChild);

        // Update chart with a random score (for demonstration)
        const newScore = Math.floor(Math.random() * 100); // Random score between 0-100
        updateChart(newScore);

        // Clear input fields
        newMaterialInput.value = '';
        fileInput.value = '';
    } else {
        alert('Please provide a title and upload a PDF.');
    }
}



// Event listener for adding new material
addMaterialBtn.addEventListener('click', addStudyMaterial);


// Select chat icon and chatbot window
const chatIcon = document.getElementById('chat-icon');
const chatbot = document.getElementById('chatbot');

// Toggle chatbot visibility when the chat icon is clicked
chatIcon.addEventListener('click', () => {
  // Toggle the display of the chatbot
  if (chatbot.style.display === 'none' || chatbot.style.display === '') {
    chatbot.style.display = 'block';
  } else {
    chatbot.style.display = 'none';
  }
});


function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  const icon = document.getElementById("chatbot-icon");

  if (chatbot.style.display === "none" || chatbot.classList.contains("close-animation")) {
      chatbot.classList.remove("close-animation");
      chatbot.classList.add("open-animation");
      icon.style.transform = "rotate(360deg)";
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
