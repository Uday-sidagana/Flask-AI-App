// add_material.js

document.getElementById('add-material-submit-btn').addEventListener('click', function() {
    const materialTitle = document.getElementById('new-material-title').value;
    const imageInput = document.getElementById('new-image-upload');
  
    if (materialTitle && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // You can implement functionality here to save the new material
            // For now, we'll just display a message
            document.getElementById('message').innerHTML = `
                <div class="card">
                    <img src="${e.target.result}" alt="${materialTitle}" class="study-image">
                    <h2>${materialTitle}</h2>
                </div>
            `;
            // Clear inputs
            document.getElementById('new-material-title').value = '';
            imageInput.value = '';
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please provide a title and an image.');
    }
  });
  