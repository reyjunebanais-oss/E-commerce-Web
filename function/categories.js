// 1. Fix the typos in getElementById and spelling errors
const modules = document.getElementById("modules"); 
const circuits = document.getElementById("circuits"); 
const connector = document.getElementById("connector"); // Fixed duplicate ID "modules"
const microcontroller = document.getElementById("microcontroller"); // Fixed typo
const passive = document.getElementById("passive"); 
const sensor = document.getElementById("sensor"); 
const semiconductor = document.getElementById("simiconductors"); // Fixed typo


// 2. Select all product cards (use querySelectorAll to get a list of all products)
const allCards = document.querySelectorAll(".card1"); 

// 3. Create a function to filter cards based on the chosen category
function filterCategory(categoryName) {
  allCards.forEach(card => {
    // Check if the card has a data attribute matching the category
    if (card.dataset.category === categoryName || categoryName === "all") {
      card.style.display = "block"; // Show matching card
    } else {
      card.style.display = "none";  // Hide non-matching card
    }
  });
}   

// 4. Add click event listeners to your category buttons
modules.addEventListener('click', () => filterCategory('modules'));
circuits.addEventListener('click', () => filterCategory('circuits'));
connector.addEventListener('click', () => filterCategory('connector'));
microcontroller.addEventListener('click', () => filterCategory('microcontroller'));
passive.addEventListener('click', () => filterCategory('passive'));
sensor.addEventListener('click', () => filterCategory('sensor'));
semiconductor.addEventListener('click', () => filterCategory('semiconductors'));
