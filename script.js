// script.js
// Ensure these run after DOM and data.js are loaded
document.addEventListener("DOMContentLoaded", () => {
  updateCurrentDayDisplay(); // Initial display
  document.getElementById("loadDayButton").addEventListener("click", loadDay); // Use ID instead of onclick inline
  document.getElementById("nextDayButton").addEventListener("click", nextDay);
});

function getCurrentDay() {
  const today = new Date().getDayOfYear(); // Day of year (1-365)
  return today > 0 && today <= 365 ? today : 1; // Fallback to Day 1 if out of range
}

function updateCurrentDayDisplay() {
  const currentDay = getCurrentDay();
  document.getElementById("current-day").textContent = currentDay;
  loadDay(); // Auto-load current day on page load
}

function loadDay() {
  const currentDay = parseInt(document.getElementById("current-day").textContent);
  const dayWords = words.filter(item => item.day === currentDay);
  const dayPhrases = phrases.filter(item => item.day === currentDay);
  
  console.log("Loading Day:", currentDay, "Words:", dayWords, "Phrases:", dayPhrases); // Debug
  
  const wordsList = document.getElementById("words-list");
  const phrasesList = document.getElementById("phrases-list");
  
  wordsList.innerHTML = dayWords.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("");
  phrasesList.innerHTML = dayPhrases.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("");
}

function nextDay() {
  let currentDay = parseInt(document.getElementById("current-day").textContent);
  currentDay = (currentDay % 365) + 1; // Cycle from 365 back to 1
  document.getElementById("current-day").textContent = currentDay;
  loadDay(); // Load new day’s content
}

// Date helper
Date.prototype.getDayOfYear = function() {
  const start = new Date(this.getFullYear(), 0, 0);
  const diff = this - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
