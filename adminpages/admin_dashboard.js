document.addEventListener("DOMContentLoaded", function() {
    loadAuthorizedUsers();

    // Modal elements
    const modal = document.getElementById("userControlModal");
    const openModalButton = document.getElementById("openUserControl");
    const closeModalButton = document.getElementById("closeUserControl");

    // Open modal
    openModalButton.addEventListener("click", function() {
        modal.style.display = "flex";
    });

    // Close modal
    closeModalButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle Grant Access Form Submission
    document.getElementById('grantAccessForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const floor = document.getElementById('floor').value;

        // Retrieve existing access data from localStorage
        let accessData = JSON.parse(localStorage.getItem('accessData')) || [];

        // Check if the email is already in the accessData
        const existingUser = accessData.find(user => user.email === email);

        if (existingUser) {
            // Update the floor for the existing user
            existingUser.floor = floor;
        } else {
            // Add new user access
            accessData.push({ email, floor });
        }

        // Save updated access data to localStorage
        localStorage.setItem('accessData', JSON.stringify(accessData));

        // Reload the authorized users list
        loadAuthorizedUsers();
        
        // Clear form fields
        document.getElementById('email').value = '';
        document.getElementById('floor').value = '';
    });
});

// Function to load and display authorized users
function loadAuthorizedUsers() {
    const accessList = document.getElementById('accessList');
    accessList.innerHTML = '<h3>Authorized Users:</h3>'; // Reset the list

    const accessData = JSON.parse(localStorage.getItem('accessData')) || [];

    if (accessData.length === 0) {
        accessList.innerHTML += '<p>No users have been granted access yet.</p>';
        return;
    }

    accessData.forEach(user => {
        const userItem = document.createElement('p');
        userItem.textContent = `${user.email} - Floor: ${user.floor}`;
        accessList.appendChild(userItem);
    });
}
