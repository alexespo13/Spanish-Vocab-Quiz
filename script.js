// script.js

// Helper functions
function getCurrentDay() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day > 0 && day <= 365 ? day : 1;
}

function loadDayWords(day) {
  return words.filter(item => item.day === day);
}

function loadDayPhrases(day) {
  return phrases.filter(item => item.day === day);
}

function loadRangeWords(startDay, endDay) {
  return words.filter(item => item.day >= startDay && item.day <= endDay);
}

function loadRangePhrases(startDay, endDay) {
  return phrases.filter(item => item.day >= startDay && item.day <= endDay);
}

// Common function to set current day display
function setCurrentDayDisplay() {
  const currentDay = getCurrentDay();
  const dayElement = document.getElementById("current-day");
  if (dayElement) {
    dayElement.textContent = currentDay;
  }
}

// Index page functions
function updateIndexPage() {
  const currentDay = getCurrentDay();
  document.getElementById("current-day").textContent = currentDay;
  loadDayContent(currentDay);
}

function loadDayContent(day) {
  const dayWords = loadDayWords(day);
  const dayPhrases = loadDayPhrases(day);
  const wordsList = document.getElementById("words-list");
  const phrasesList = document.getElementById("phrases-list");
  
  if (wordsList && phrasesList) {
    wordsList.innerHTML = dayWords.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("");
    phrasesList.innerHTML = dayPhrases.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("");
  }
}

function nextDay() {
  let currentDay = parseInt(document.getElementById("current-day").textContent);
  currentDay = (currentDay % 365) + 1;
  document.getElementById("current-day").textContent = currentDay;
  loadDayContent(currentDay);
}

// Quiz functions
function startDailyQuiz() {
  const currentDay = getCurrentDay();
  const dayWords = loadDayWords(currentDay);
  const dayPhrases = loadDayPhrases(currentDay);
  const quizContainer = document.getElementById("quiz-container");
  
  if (quizContainer) {
    quizContainer.innerHTML = `
      <h3>Daily Quiz - Day ${currentDay}</h3>
      <h4>Words</h4>
      <ul>${dayWords.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")}</ul>
      <h4>Phrases</h4>
      <ul>${dayPhrases.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")}</ul>
    `;
  }
}

function startWeeklyQuiz() {
  const currentDay = getCurrentDay();
  const startDay = Math.max(1, currentDay - 6);
  const endDay = currentDay;
  const rangeWords = loadRangeWords(startDay, endDay);
  const rangePhrases = loadRangePhrases(startDay, endDay);
  const quizContainer = document.getElementById("quiz-container");
  
  if (quizContainer) {
    quizContainer.innerHTML = `
      <h3>Weekly Quiz - Days ${startDay} to ${endDay}</h3>
      <h4>Words</h4>
      <ul>${rangeWords.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")}</ul>
      <h4>Phrases</h4>
      <ul>${rangePhrases.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")}</ul>
    `;
  }
}

function startMonthlyQuiz() {
  const currentDay = getCurrentDay();
  const startDay = Math.max(1, currentDay - 29);
  const endDay = currentDay;
  const rangeWords = loadRangeWords(startDay, endDay);
  const rangePhrases = loadRangePhrases(startDay, endDay);
  const quizContainer = document.getElementById("quiz-container");
  
  if (quizContainer) {
    quizContainer.innerHTML = `
      <h3>Monthly Quiz - Days ${startDay} to ${endDay}</h3>
      <h4>Words</h4>
      <ul>${rangeWords.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")}</ul>
      <h4>Phrases</h4>
      <ul>${rangePhrases.map(item => `<li>${item.spanish} - ${item.English}</li>`).join("")}</ul>
    `;
  }
}

// Progress page function
function showProgress() {
  const currentDay = getCurrentDay();
  const progressInfo = document.getElementById("progress-info");
  if (progressInfo) {
    progressInfo.innerHTML = `<p>You are on day ${currentDay} of 365.</p>`;
  }
}

// Event listeners and initialization
document.addEventListener("DOMContentLoaded", () => {
  setCurrentDayDisplay(); // Set current day on pages that have #current-day
  
  if (document.getElementById("words-list")) {
    updateIndexPage(); // Auto-load current day on index.html
  }
  
  if (document.getElementById("progress-info")) {
    showProgress();
  }
  
  const loadDayButton = document.getElementById("loadDayButton");
  if (loadDayButton) {
    loadDayButton.addEventListener("click", updateIndexPage);
  }
  
  const nextDayButton = document.getElementById("nextDayButton");
  if (nextDayButton) {
    nextDayButton.addEventListener("click", nextDay);
  }
  
  const startQuizButton = document.getElementById("startQuizButton");
  if (startQuizButton) {
    startQuizButton.addEventListener("click", startDailyQuiz);
  }
  
  const startWeeklyQuizButton = document.getElementById("startWeeklyQuizButton");
  if (startWeeklyQuizButton) {
    startWeeklyQuizButton.addEventListener("click", startWeeklyQuiz);
  }
  
  const startMonthlyQuizButton = document.getElementById("startMonthlyQuizButton");
  if (startMonthlyQuizButton) {
    startMonthlyQuizButton.addEventListener("click", startMonthlyQuiz);
  }
});
