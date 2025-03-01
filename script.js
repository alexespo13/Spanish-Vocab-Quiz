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
  const today = new Date().getDayOfYear();
  return today > 0 && today <= 365 ? today : 1; // Fallback to Day 1
}

function updateCurrentDayDisplay() {
  const currentDay = getCurrentDay();
  const dayElement = document.getElementById("current-day");
  if (dayElement) dayElement.textContent = currentDay;
}

function loadDay() {
  const currentDay = parseInt(document.getElementById("current-day").textContent);
  const dayWords = words.filter(item => item.day === currentDay);
  const dayPhrases = phrases.filter(item => item.day === currentDay);
  
  console.log("Load Day:", currentDay, "Words:", dayWords, "Phrases:", dayPhrases);
  
  const wordsList = document.getElementById("words-list");
  const phrasesList = document.getElementById("phrases-list");
  
  if (wordsList && phrasesList) {
    wordsList.innerHTML = dayWords.length > 0 
      ? dayWords.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")
      : "<li>No words for this day.</li>";
    phrasesList.innerHTML = dayPhrases.length > 0 
      ? dayPhrases.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")
      : "<li>No phrases for this day.</li>";
  }
}

function nextDay() {
  const dayElement = document.getElementById("current-day");
  if (dayElement) {
    let currentDay = parseInt(dayElement.textContent);
    currentDay = (currentDay % 365) + 1;
    dayElement.textContent = currentDay;
    loadDay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const startQuizButton = document.getElementById("startQuizButton");
  if (startQuizButton) {
    startQuizButton.addEventListener("click", startDailyQuiz);
  }
});

function startDailyQuiz() {
  const currentDay = getCurrentDay();
  console.log("Quiz Day:", currentDay);              // Check the day being used
  console.log("Words array length:", words.length);  // Verify words data is loaded
  console.log("Phrases array length:", phrases.length); // Verify phrases data is loaded
  
  const dayData = words.filter(item => item.day === currentDay).concat(phrases.filter(item => item.day === currentDay));
  console.log("Quiz Data:", dayData);                // See what data is fetched
  
  const display = document.getElementById("quiz-container");
  if (display) {
    console.log("Display element found");            // Confirm the container exists
    display.innerHTML = dayData.length > 0 
      ? dayData.map(item => `<p>${item.spanish} - ${item.English}</p>`).join("")
      : "<p>No quiz data for today.</p>";
  } else {
    console.log("Error: #quiz-container not found"); // Alert if the container is missing
  }
}

// Date helper
Date.prototype.getDayOfYear = function() {
  const start = new Date(this.getFullYear(), 0, 0);
  const diff = this - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
