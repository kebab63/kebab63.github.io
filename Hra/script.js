let money = 0;
let businesses = [];

const moneyDisplay = document.getElementById('money');
const clickerButton = document.getElementById('clicker');
const businessesContainer = document.getElementById('businesses');
const restartButton = document.getElementById('restart');

function updateMoneyDisplay() {
    moneyDisplay.textContent = `Money: $${money}`;
}

function clicker() {
    money += 1;
    updateMoneyDisplay();
    saveGame();
}

function buyBusiness(business) {
    if (money >= business.baseCost && !business.isOwned) {
        money -= business.baseCost;
        business.isOwned = true;
        business.level = 1; // Set initial level
        updateMoneyDisplay();
        renderBusinesses();
        saveGame();
    }
}

function levelUpBusiness(business) {
    const upgradeCost = business.level * business.baseUpgradeCost;
    if (money >= upgradeCost && business.isOwned && business.level < business.maxLevel) {
        money -= upgradeCost;
        business.level += 1; // Increase level
        updateMoneyDisplay();
        renderBusinesses();
        saveGame();
    }
}

function renderBusinesses() {
    businessesContainer.innerHTML = '';
    businesses.forEach(business => {
        const businessDiv = document.createElement('div');
        businessDiv.classList.add('business');

        let businessStatus = '';
        if (business.isOwned) {
            businessStatus = `Level ${business.level} - Income: $${business.level * business.income}`;
        } else {
            businessStatus = `Cost: $${business.baseCost}`;
        }

        businessDiv.innerHTML = `
            <span>${business.name} (${businessStatus})</span>
        `;

        if (!business.isOwned) {
            const buyButton = document.createElement('button');
            buyButton.textContent = `Buy for $${business.baseCost}`;
            buyButton.addEventListener('click', () => buyBusiness(business));
            businessDiv.appendChild(buyButton);
        } else if (business.level < business.maxLevel) {
            const upgradeButton = document.createElement('button');
            const upgradeCost = business.level * business.baseUpgradeCost;
            upgradeButton.textContent = `Upgrade for $${upgradeCost}`;
            upgradeButton.addEventListener('click', () => levelUpBusiness(business));
            businessDiv.appendChild(upgradeButton);
        }

        businessesContainer.appendChild(businessDiv);
    });
}

function gameLoop() {
    businesses.forEach(business => {
        if (business.isOwned) {
            money += business.level * business.income;
        }
    });
    updateMoneyDisplay();
    saveGame();
    setTimeout(gameLoop, 1000);
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

function saveGame() {
    const gameData = {
        money,
        businesses
    };
    localStorage.setItem('businessTycoonSave', JSON.stringify(gameData));
}

function loadGame() {
    const savedGame = localStorage.getItem('businessTycoonSave');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        money = gameData.money;
        businesses = gameData.businesses;
        updateMoneyDisplay();
        renderBusinesses();
    } else {
        // Initialize businesses if no saved game found
        initializeBusinesses();
        renderBusinesses();
    }
}

function initializeBusinesses() {
    businesses = [
        { name: 'Lemonade Stand', baseCost: 10, isOwned: false, level: 0, baseUpgradeCost: 20, maxLevel: 5, income: 1 },
        { name: 'Ice Cream Truck', baseCost: 100, isOwned: false, level: 0, baseUpgradeCost: 200, maxLevel: 10, income: 5 },
        { name: 'Coffee Shop', baseCost: 1000, isOwned: false, level: 0, baseUpgradeCost: 500, maxLevel: 15, income: 10 }
    ];
}

function restartGame() {
    localStorage.removeItem('businessTycoonSave'); // Clear saved game data
    money = 0;
    businesses = []; // Clear businesses array
    initializeBusinesses(); // Reinitialize businesses
    updateMoneyDisplay();
    renderBusinesses();
}

// Event listeners
clickerButton.addEventListener('click', clicker);
restartButton.addEventListener('click', restartGame);

// Initial setup
loadGame();
gameLoop();
