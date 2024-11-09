// Simulating a simple login check
const validCredentials = {
    username: "Ankush25",
    password: "Ankush25"

  };
  
  // Login form
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
  
    if (enteredUsername === validCredentials.username && enteredPassword === validCredentials.password) {
      // Redirect to dashboard (index.html)
      window.location.href = "index.html";
    } else {
      // Display error message
      errorMessage.textContent = "Invalid username or password. Please try again.";
    }
  });
  