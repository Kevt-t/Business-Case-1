document.addEventListener("DOMContentLoaded", function() {
    const loggedInResident = JSON.parse(localStorage.getItem('residentData'));
    const accessData = JSON.parse(localStorage.getItem('accessData')) || [];

    // Check if the resident is logged in
    if (!loggedInResident) {
        alert("You are not logged in.");
        window.location.href = 'resident_signin.html';
        return;
    }

    // Find the resident's access details
    const authorizedUser = accessData.find(user => user.email === loggedInResident.email);

    if (!authorizedUser) {
        alert("Not yet onboarded to a residency.");
        window.location.href = 'resident_signin.html';
        return;
    }

    // Display the resident's floor and email
    document.getElementById('residentInfo').textContent = `Welcome, ${loggedInResident.firstName} ${loggedInResident.lastName}`;
    document.getElementById('floor-number').textContent = authorizedUser.floor;

    // Load alarms for the authorized floor
    loadAlarmsForFloor(authorizedUser.floor);
});

function loadAlarmsForFloor(floor) {
    // Load Fire Alarm status
    const fireAlarmData = JSON.parse(localStorage.getItem(`alarmDataFloor${floor}`));
    document.getElementById('fireAlarmStatus').textContent = fireAlarmData
        ? `Fire Alarm: ${fireAlarmData.toggleStatus === "On" ? "Active" : "Off"}`
        : "Fire Alarm: Not Configured";

    // Load Smoke Alarm status
    const smokeAlarmData = JSON.parse(localStorage.getItem(`smokeAlarmDataFloor${floor}`));
    document.getElementById('smokeAlarmStatus').textContent = smokeAlarmData
        ? `Smoke Alarm: ${smokeAlarmData.toggleStatus === "On" ? "Active" : "Off"}`
        : "Smoke Alarm: Not Configured";

    // Load Temperature Alarm status
    const temperatureAlarmData = JSON.parse(localStorage.getItem(`temperatureAlarmDataFloor${floor}`));
    document.getElementById('temperatureAlarmStatus').textContent = temperatureAlarmData
        ? `Temperature Alarm: ${temperatureAlarmData.toggleStatus === "On" ? "Active" : "Off"}`
        : "Temperature Alarm: Not Configured";
}
