// Get the canvas and context
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for the matrix animation
const matrixChars = '01';
const fontSize = 16;
let columns = canvas.width / fontSize;
const drops = [];

// Determine text color based on the current page
let matrixTextColor = '#0F0'; // Default green
if (window.location.pathname.includes('admin')) {
    matrixTextColor = '#00F'; // Blue for admin sign-in page
}

// Initialize drops
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Draw function for matrix animation
function draw() {
    // Fill the canvas with a translucent black background to create a trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the matrix text color based on the page
    ctx.fillStyle = matrixTextColor;
    ctx.font = `${fontSize}px monospace`;

    // Draw characters on the canvas
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop when it reaches the bottom randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Initial background fill to prevent flicker
ctx.fillStyle = '#000'; // Black background
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Start the animation
setInterval(draw, 50);

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;

    // Reset drops array to match new column count
    drops.length = 0;
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
});
