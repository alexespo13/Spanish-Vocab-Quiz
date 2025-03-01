// script.js
document.addEventListener("DOMContentLoaded", () => {
  // For index.html
  if (document.getElementById("loadDayButton")) {
    updateCurrentDayDisplay();
    document.getElementById("loadDayButton").addEventListener("click", loadDay);
    document.getElementById("nextDayButton").addEventListener("click", nextDay);
  }
  // For daily_quiz.html
  if (document.getElementById("startQuizButton")) {
    updateCurrentDayDisplay();
    document.getElementById("startQuizButton").addEventListener("click", startDailyQuiz);
  }
});

function getCurrentDay() {
  const today = new Date().getDayOfYear(); // Day of year (1-365)
  return today > 0 && today <= 365 ? today : 1; // Fallback to Day 1
}

function updateCurrentDayDisplay() {
  const currentDay = getCurrentDay();
  const dayElement = document.getElementById("current-day");
  if (dayElement) dayElement.textContent = currentDay;
  if (document.getElementById("words-list")) loadDay(); // Auto-load for index.html
}

function loadDay() {
  const currentDay = parseInt(document.getElementById("current-day").textContent);
  const dayWords = words.filter(item => item.day === currentDay);
  const dayPhrases = phrases.filter(item => item.day === currentDay);
  
  console.log("Loading Day:", currentDay, "Words:", dayWords, "Phrases:", dayPhrases);
  
  const wordsList = document.getElementById("words-list");
  const phrasesList = document.getElementById("phrases-list");
  
  wordsList.innerHTML = dayWords.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("");
  phrasesList.innerHTML = dayPhrases.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("");
}

function nextDay() {
  let currentDay = parseInt(document.getElementById("current-day").textContent);
  currentDay = (currentDay % 365) + 1;
  document.getElementById("current-day").textContent = currentDay;
  loadDay();
}

function startDailyQuiz() {
  const currentDay = parseInt(document.getElementById("current-day").textContent);
  const dayData = words.filter(item => item.day === currentDay).concat(phrases.filter(item => item.day === currentDay));
  const display = document.getElementById("quiz-container");
  
  console.log("Quiz Day:", currentDay, "Data:", dayData); // Debug
  
  display.innerHTML = dayData.length > 0 
    ? dayData.map(item => `<p>${item.spanish} - ${item.English}</p>`).join("")
    : "No quiz data for today.";
}

// Date helper
Date.prototype.getDayOfYear = function() {
  const start = new Date(this.getFullYear(), 0, 0);
  const diff = this - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
