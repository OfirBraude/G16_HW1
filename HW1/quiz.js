const quizData = [
  {
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    correct: 1
  },
  {
    question: "In what year did the United States declare its independence?",
    options: ["1776", "1783", "1812", "1865"],
    correct: 0
  },
  {
    question: "What is the capital of the United States?",
    options: ["New York", "Los Angeles", "Washington, D.C.", "Chicago"],
    correct: 2
  },
  {
    question: "Who wrote the Star-Spangled Banner?",
    options: ["Francis Scott Key", "Betsy Ross", "Thomas Paine", "Paul Revere"],
    correct: 0
  },
  {
    question: "Which U.S. state is known as the 'Sunshine State'?",
    options: ["California", "Florida", "Hawaii", "Arizona"],
    correct: 1
  }
];

let currentQuestionIndex = 0; // Index to keep track of the current question
let score = 0; // Variable to keep track of the score

const quizContainer = document.getElementById('quiz-container'); // Container for the quiz
const resultContainer = document.getElementById('result-container'); // Container for the results
const body = document.body; // Reference to the body element for background color change

// Function to load the current question
function loadQuestion() {
  const questionData = quizData[currentQuestionIndex];
  quizContainer.innerHTML = ''; // Clear previous content

  const questionTitle = document.createElement('h2');
  questionTitle.classList.add('text-2xl', 'font-semibold', 'mb-4', 'text-gray-800');
  questionTitle.textContent = questionData.question;
  quizContainer.appendChild(questionTitle);

  // Create a button for each option
  questionData.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.classList.add('block', 'w-full', 'text-left', 'bg-blue-100', 'hover:bg-blue-200', 'p-2', 'mb-2', 'rounded', 'transition', 'duration-200');
    optionButton.textContent = option;
    optionButton.onclick = () => checkAnswer(index); // Check the answer when the button is clicked
    quizContainer.appendChild(optionButton);
  });
}

// Function to check the selected answer
function checkAnswer(answer) {
  const questionData = quizData[currentQuestionIndex];
  
  if (answer === questionData.correct) {
    score++; // Increase the score if the answer is correct
    body.classList.add('bg-green-500'); // Change background to green if correct
  } else {
    body.classList.add('bg-red-500'); // Change background to red if wrong
  }

  setTimeout(() => {
    body.classList.remove('bg-green-500', 'bg-red-500'); // Remove the background color change after a short delay
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < quizData.length) {
      loadQuestion(); // Load the next question
    } else {
      showResults(); // Show the results if there are no more questions
    }
  }, 1000); // 1 second delay
}

// Function to display the results
function showResults() {
  quizContainer.classList.add('hidden'); // Hide the quiz container
  resultContainer.classList.remove('hidden'); // Show the result container
  
  resultContainer.innerHTML = `
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Quiz Results</h2>
    <p class="mb-4 text-gray-600">You scored ${score} out of ${quizData.length}</p>
    <button id="restart-button" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200">Restart Quiz</button>
  `;

  document.getElementById('restart-button').addEventListener('click', restartQuiz); // Add event listener to restart the quiz
}

// Function to restart the quiz
function restartQuiz() {
  score = 0; // Reset the score
  currentQuestionIndex = 0; // Reset the question index
  resultContainer.classList.add('hidden'); // Hide the result container
  quizContainer.classList.remove('hidden'); // Show the quiz container
  loadQuestion(); // Load the first question
}

// Initialize the quiz by loading the first question
loadQuestion();
