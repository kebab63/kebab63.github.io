let points = 0;
let pointsPerClick = 1;

document.getElementById('clicker').addEventListener('click', () => {
    points += pointsPerClick;
    updatePointsDisplay();
});

document.getElementById('upgrade1').addEventListener('click', () => {
    if (points >= 10) {
        points -= 10;
        pointsPerClick += 1;
        updatePointsDisplay();
    }
});

document.getElementById('upgrade2').addEventListener('click', () => {
    if (points >= 50) {
        points -= 50;
        pointsPerClick += 5;
        updatePointsDisplay();
    }
});

function updatePointsDisplay() {
    document.getElementById('points').innerText = points;
}

let autoClickerActive = false;

document.getElementById('autoclicker').addEventListener('click', () => {
    if (points >= 100 && !autoClickerActive) {
        points -= 100;
        autoClickerActive = true;
        setInterval(() => {
            points += pointsPerClick;
            updatePointsDisplay();
        }, 1000); // Auto-click every second
        updatePointsDisplay();
    }
});
