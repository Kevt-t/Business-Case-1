// register.js

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const buildingName = document.getElementById('building-name').value;
    const type = document.getElementById('type').value;
    const floors = document.getElementById('floors').value;
    const units = document.getElementById('units').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create a user object to save in local storage
    const adminData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        buildingName: buildingName,
        type: type,
        floors: floors,
        units: units
    };

    // Save the admin data to local storage
    localStorage.setItem('adminData', JSON.stringify(adminData));

    // Redirect to the dashboard page
    window.location.href = 'admindashboard.html';
});
