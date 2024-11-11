document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capture email and password from the form
    const email = document.getElementById('email').value; // Corrected ID
    const password = document.getElementById('password').value;

    // Retrieve resident data and access data from localStorage
    const residentData = JSON.parse(localStorage.getItem('residentData'));
    const accessData = JSON.parse(localStorage.getItem('accessData')) || [];

    // Check if the resident data exists and the credentials match
    if (!residentData || residentData.email !== email || residentData.password !== password) {
        alert("Invalid email or password. Please try again.");
        return;
    }

    // Check if the resident has been granted access
    const authorizedUser = accessData.find(user => user.email === email);

    if (!authorizedUser) {
        alert("Not yet onboarded to a residency.");
        return;
    }

    // Save the logged-in resident's information to localStorage
    localStorage.setItem('loggedInResident', JSON.stringify({
        firstName: residentData.firstName,
        lastName: residentData.lastName,
        email: residentData.email,
        floor: authorizedUser.floor
    }));

    // Redirect to the resident dashboard
    window.location.href = 'resident_dashboard.html';
});
