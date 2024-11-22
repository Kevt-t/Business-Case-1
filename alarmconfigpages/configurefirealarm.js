// Floor pagination variables
const floorsPerPage = 5;
let currentPage = 0;
let totalFloors = 0;
let selectedFloor = 1; // Default selected floor

// Initialize floor buttons and fetch total floors from localStorage
function initFloors() {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (adminData && adminData.floors) {
        totalFloors = parseInt(adminData.floors, 10);
    } else {
        console.error("Admin data not found or floors property missing");
        return;
    }
    renderFloors();
}

//Change view of configurable floors
function scrollFloors(direction) {
    const maxPage = Math.ceil(totalFloors / floorsPerPage) - 1;
    currentPage = Math.max(0, Math.min(maxPage, currentPage + direction));
    renderFloors();
}



// Render floors based on current page
function renderFloors() {
    const floorContainer = document.getElementById("floor-container");
    floorContainer.innerHTML = "";

    const startFloor = currentPage * floorsPerPage + 1;
    const endFloor = Math.min(startFloor + floorsPerPage - 1, totalFloors);

    for (let i = startFloor; i <= endFloor; i++) {
        const floorButton = document.createElement("button");
        floorButton.classList.add("floor-button");
        floorButton.textContent = i;
        floorButton.onclick = () => selectFloor(i);

        

        // Retrieve the alarm data for this floor
        const alarmData = JSON.parse(localStorage.getItem(`alarmDataFloor${i}`));

        // Determine the color of the floor button based on the alarm status
        if (alarmData) {
            if (alarmData.toggleStatus === "On") {
                // Check if the alarm is functioning (this can be a mock status)
                if (alarmData.isFunctioning !== false) {
                    floorButton.style.backgroundColor = "green"; // Alarm is on and functioning
                } else {
                    floorButton.style.backgroundColor = "red"; // Alarm is on but not functioning
                }
            } else {
                floorButton.style.backgroundColor = "lightyellow"; // Alarm is off
            }
        } else {
            floorButton.style.backgroundColor = "lightyellow"; // No alarm configured
        }

        floorContainer.appendChild(floorButton);
    }
}

// Select a floor and check if an alarm is already configured
function selectFloor(floorNumber) {
    selectedFloor = floorNumber;
    document.querySelectorAll(".floor-button").forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");

    // Check if an alarm configuration exists for this floor
    const alarmData = JSON.parse(localStorage.getItem(`alarmDataFloor${selectedFloor}`));
    if (alarmData) {
        // Show configuration form with existing data
        document.getElementById('initial-form').style.display = 'none';
        document.getElementById('config-form').style.display = 'block';
        document.getElementById('device-id').textContent = alarmData.sensorId;
        document.getElementById('toggle').checked = alarmData.toggleStatus === "On";

        // Update the status text
        updateStatusText(alarmData.toggleStatus === "On");
    } else {
        // Show initial form to add a new alarm
        document.getElementById('initial-form').style.display = 'block';
        document.getElementById('config-form').style.display = 'none';
    }
}

// Update the status text based on the toggle status
function updateStatusText(isOn) {
    const statusText = document.getElementById('status');
    statusText.textContent = isOn ? "Active" : "Off";
}

// Validate input and save alarm data for the selected floor
function validateInput() {
    const sensorId = document.getElementById('sensorId').value;
    const pin = document.getElementById('pin').value;

    if (sensorId && pin) {
        // Save alarm data for the selected floor
        const alarmData = {
            sensorId: sensorId,
            pin: pin,
            toggleStatus: "On", // Default status
            isFunctioning: true // Default to functioning
        };
        localStorage.setItem(`alarmDataFloor${selectedFloor}`, JSON.stringify(alarmData));

        // Transition to the configuration form
        document.getElementById('initial-form').style.display = 'none';
        document.getElementById('config-form').style.display = 'block';
        document.getElementById('device-id').textContent = sensorId;

        // Update the status text to "Active"
        updateStatusText(true);
    } else {
        alert("Please enter both Sensor ID and PIN.");
    }
}

// Save preferences for the selected floor
function savePreferences() {
    const toggleStatus = document.getElementById('toggle').checked ? "On" : "Off";
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const delay = document.getElementById('delay').value;

    // Update alarm data for the selected floor
    const alarmData = JSON.parse(localStorage.getItem(`alarmDataFloor${selectedFloor}`)) || {};
    alarmData.toggleStatus = toggleStatus;
    alarmData.startTime = startTime;
    alarmData.endTime = endTime;
    alarmData.delay = delay;

    localStorage.setItem(`alarmDataFloor${selectedFloor}`, JSON.stringify(alarmData));

    // Update the status text based on the new toggle status
    updateStatusText(toggleStatus === "On");

    alert(`Preferences Saved:\nToggle: ${toggleStatus}\nSchedule: ${startTime} - ${endTime}\nDelay: ${delay}`);
    renderFloors(); // Re-render floors to update colors
}

// Add event listener to update status when the toggle changes
document.getElementById('toggle').addEventListener('change', function() {
    updateStatusText(this.checked);
});

// Initialize floors on page load
document.addEventListener("DOMContentLoaded", initFloors);
