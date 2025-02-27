// script.js
function getCurrentDay() {
  const storedDay = localStorage.getItem('currentDay');
  return storedDay ? parseInt(storedDay) : 1;
}

function setCurrentDay(day) {
  localStorage.setItem('currentDay', day);
  updateCurrentDayDisplay();
}

function updateCurrentDayDisplay() {
  const currentDay = getCurrentDay();
  const dayElement = document.getElementById('current-day');
  if (dayElement) dayElement.textContent = currentDay;
}

function nextDay() {
  let currentDay = getCurrentDay();
  if (currentDay < 365) {
    currentDay++;
    setCurrentDay(currentDay);
  } else {
    alert("You've reached the end of the year!");
  }
}

function loadDay() {
  const day = getCurrentDay();
  const words = data.words.filter(item => item.day == day);
  const phrases = data.phrases.filter(item => item.day == day);
  
  const wordsList = document.getElementById('words-list');
  wordsList.innerHTML = '';
  words.forEach(word => {
    const li = document.createElement('li');
    li.textContent = `${word.spanish} - ${word.english} (${word.part_of_speech})`;
    wordsList.appendChild(li);
  });
  
  const phrasesList = document.getElementById('phrases-list');
  phrasesList.innerHTML = '';
  phrases.forEach(phrase => {
    const li = document.createElement('li');
    li.textContent = `${phrase.spanish} - ${phrase.english}`;
    phrasesList.appendChild(li);
  });
}

function startDailyQuiz() {
  const day = getCurrentDay();
  const items = [...data.words.filter(item => item.day == day), ...data.phrases.filter(item => item.day == day)];
  generateQuiz(items, 'Daily', day);
}

function startWeeklyQuiz() {
  const day = getCurrentDay();
  const weekStart = Math.max(1, day - 6);
  const items = [...data.words, ...data.phrases].filter(item => item.day >= weekStart && item.day <= day);
  const selectedItems = items.slice(0, 10); // Select 10 items
  generateQuiz(selectedItems, 'Weekly', `Week of Day ${day}`);
}

function startMonthlyQuiz() {
  const day = getCurrentDay();
  const monthStart = Math.max(1, day - 29);
  const items = [...data.words, ...data.phrases].filter(item => item.day >= monthStart && item.day <= day);
  const selectedItems = items.slice(0, 20); // Select 20 items
  generateQuiz(selectedItems, 'Monthly', `Month of Day ${day}`);
}

function generateQuiz(items, type, period) {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';
  let score = 0;
  
  items.forEach((item, index) => {
    const question = document.createElement('div');
    question.innerHTML = `<p>${index + 1}. What is "${item.spanish}" in English?</p>`;
    const options = [item.english];
    while (options.length < 4) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      if (!options.includes(randomItem.english) && randomItem.english !== item.english) {
        options.push(randomItem.english);
      }
    }
    options.sort(() => Math.random() - 0.5);
    
    options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => {
        if (option === item.english) {
          score++;
          alert('Correct!');
        } else {
          alert(`Incorrect. The correct answer is: ${item.english}`);
        }
        button.disabled = true;
        if (index === items.length - 1 && Array.from(question.parentElement.children).every(q => q.querySelectorAll('button:not(:disabled)').length === 0)) {
          saveProgress(type, period, `${score}/${items.length}`);
          if (type === 'Daily') nextDay(); // Move to next day after daily quiz
        }
      };
      question.appendChild(button);
    });
    quizContainer.appendChild(question);
  });
}

function saveProgress(type, period, score) {
  const progress = JSON.parse(localStorage.getItem('progress')) || [];
  progress.push({ type, period, score });
  localStorage.setItem('progress', JSON.stringify(progress));
  alert(`Quiz completed! Score: ${score}`);
}

function loadProgress() {
  const progressBody = document.getElementById('progress-body');
  progressBody.innerHTML = '';
  const progress = JSON.parse(localStorage.getItem('progress')) || [];
  progress.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${entry.type}</td><td>${entry.period}</td><td>${entry.score}</td>`;
    progressBody.appendChild(row);
  });
}

if (window.location.pathname.endsWith('progress.html')) {
  loadProgress();
}
