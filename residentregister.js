document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve the registered resident's data from localStorage
    const residentData = JSON.parse(localStorage.getItem('residentData'));

    // Check if the email and password match
    if (!residentData || residentData.email !== email || residentData.password !== password) {
        alert("Invalid email or password. Please try again.");
        return;
    }

    // Check if the resident has been granted access
    const accessData = JSON.parse(localStorage.getItem('accessData')) || [];
    const authorizedUser = accessData.find(user => user.email === email);

    if (!authorizedUser) {
        alert("Not yet onboarded to a residency");
        return;
    }

    // Save the logged-in resident's data and allowed floor to localStorage
    localStorage.setItem('loggedInResident', JSON.stringify({
        email: authorizedUser.email,
        floor: authorizedUser.floor
    }));

    alert("Sign-in successful! Redirecting to your dashboard...");
    window.location.href = 'resident_dashboard.html'; // Redirect to the resident dashboard
});
