const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = '01';
const fontSize = 16;
let columns = canvas.width / fontSize;
const drops = [];

// Set text color based on the current page
let matrixTextColor = '#0F0'; // Default green
if (window.location.pathname.includes('admin_signin.html') || window.location.pathname.includes('admin_signup.html')) {
    matrixTextColor = '#00F'; // Blue for admin sign-in page
}

// Initialize drops
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = matrixTextColor; // Use the conditional color
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 50);

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
