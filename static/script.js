// Select elements for adding study materials
const cardContainer = document.getElementById('card-container');
const addMaterialBtn = document.getElementById('add-material-btn');
const newMaterialInput = document.getElementById('new-material');
const fileInput = document.getElementById('file-upload');
const recentActivityList = document.getElementById('recent-activity-list');

// Function to update the chart with a random score
function updateChart(newData) {
    progressChart.data.labels.push(`Week ${progressChart.data.labels.length + 1}`);
    progressChart.data.datasets[0].data.push(newData);
    progressChart.update();
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
            <a href="${fileUrl}" target="_blank" class="study-link">${materialTitle}</a>
        `;
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