// chart.js

const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'line', // Line chart to represent progress over time
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // X-axis labels
        datasets: [
            {
                label: 'HTML Progress',
                data: [80, 85, 87, 90, 95], // Sample progress for HTML
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Pink translucent fill
                borderColor: 'rgba(255, 99, 132, 1)', // Solid pink border
                borderWidth: 2, // Border thickness
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Pink point color
                fill: true, // Fill below the line
            },
            {
                label: 'CSS Progress',
                data: [70, 78, 82, 87, 92], // Sample progress for CSS
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue translucent fill
                borderColor: 'rgba(54, 162, 235, 1)', // Solid blue border
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Blue point color
                fill: true,
            },
            {
                label: 'JavaScript Progress',
                data: [60, 68, 75, 83, 90], // Sample progress for JavaScript
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Green translucent fill
                borderColor: 'rgba(75, 192, 192, 1)', // Solid green border
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Green point color
                fill: true,
            },
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true, // Start Y-axis at 0
                title: {
                    display: true,
                    text: 'Scores', // Label for Y-axis
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Weeks', // Label for X-axis
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                enabled: true, // Enable tooltips on hover
                backgroundColor: '#000', // Black background for tooltips
                titleFont: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        animation: {
            duration: 1500, // Duration of the animation (1.5 seconds)
            easing: 'easeInOutBounce', // Animation easing
        }
    }
});

// Select elements for adding study materials
const cardContainer = document.getElementById('card-container');
const addMaterialBtn = document.getElementById('add-material-btn');
const newMaterialInput = document.getElementById('new-material');
const imageInput = document.getElementById('image-upload');

// Function to update the chart
function updateChart(newData) {
    progressChart.data.labels.push(`Week ${progressChart.data.labels.length + 1}`);
    progressChart.data.datasets[0].data.push(newData); // Assuming you want to update only HTML progress for demo
    progressChart.update(); // Refresh the chart
}

// Function to add a new study material card
function addStudyMaterial() {
    const materialTitle = newMaterialInput.value.trim();
    if (materialTitle && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.innerHTML = `
                <img src="${e.target.result}" alt="${materialTitle}" class="study-image">
                <a href="#">${materialTitle}</a>
            `;
            cardContainer.appendChild(newCard);
            
            // Update chart with random score (for demonstration)
            const newScore = Math.floor(Math.random() * 100); // Random score between 0-100
            updateChart(newScore);

            // Clear the inputs
            newMaterialInput.value = '';
            imageInput.value = '';
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please provide a title and an image.');
    }
}

// Event listener for adding new material
addMaterialBtn.addEventListener('click', addStudyMaterial);

