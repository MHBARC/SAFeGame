// Game state variables
let currentQuestion = 0;
let team1Score = 0;
let team2Score = 0;
let team1Name = "Agile Avengers";
let team2Name = "SAFe Superheroes";
let timerInterval = null;
let timeLeft = 30;
let timerPaused = false;
let selectedOption = null;

// Debug logging function
function logDebug(message) {
    console.log("[DEBUG] " + message);
}

// Initialize after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    logDebug("DOM fully loaded");
    
    // Hide game screens on initial load
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';
    
    // Hide scores initially
    hideScores();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update total questions count
    try {
        updateTotalQuestions();
    } catch (error) {
        logDebug("Error updating total questions: " + error.message);
    }
    
    // Direct attachment of start game click handler
    document.getElementById('start-game-btn').onclick = function() {
        logDebug("Start button clicked via direct onclick handler");
        startGame();
    };
});

// Hide scores in header for intro screen
function hideScores() {
    const scoresSection = document.getElementById('scores-section');
    if (scoresSection) {
        scoresSection.style.display = 'none';
    }
}

// Show scores in header for game screen
function showScores() {
    const scoresSection = document.getElementById('scores-section');
    if (scoresSection) {
        scoresSection.style.display = 'flex';
    }
}

// Update total questions count in UI
function updateTotalQuestions() {
    // Make sure gameQuestions is available
    if (!window.gameQuestions) {
        logDebug("Warning: gameQuestions not found - attempting to continue anyway");
        return;
    }
    
    const questions = window.gameQuestions;
    const totalQuestions = questions.length;
    logDebug("Total questions: " + totalQuestions);
    
    // Update in game screen
    const totalQuestionsElements = document.querySelectorAll('#total-questions');
    totalQuestionsElements.forEach(el => {
        if (el) el.textContent = totalQuestions;
    });
    
    // Update in results screen
    const totalQuestionsResultElement = document.getElementById('total-questions-result');
    if (totalQuestionsResultElement) {
        totalQuestionsResultElement.textContent = totalQuestions;
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Start game button
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        logDebug("Start button found, adding event listener");
        startBtn.addEventListener('click', function(e) {
            logDebug("Start button clicked via addEventListener");
            startGame();
        });
    } else {
        logDebug("ERROR: Start game button not found!");
    }
    
    // Timer controls
    const startTimerBtn = document.getElementById('start-timer-btn');
    if (startTimerBtn) {
        startTimerBtn.addEventListener('click', startTimer);
    }
    
    const stopTimerBtn = document.getElementById('stop-timer-btn');
    if (stopTimerBtn) {
        stopTimerBtn.addEventListener('click', stopTimer);
    }
    
    // Question navigation
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevQuestion);
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    // Team scoring buttons
    const team1Btn = document.getElementById('team1-btn');
    if (team1Btn) {
        team1Btn.addEventListener('click', function() {
            awardPoints(1);
        });
    }
    
    const team2Btn = document.getElementById('team2-btn');
    if (team2Btn) {
        team2Btn.addEventListener('click', function() {
            awardPoints(2);
        });
    }
    
    // Answer and game controls
    const showAnswerBtn = document.getElementById('show-answer-btn');
    if (showAnswerBtn) {
        showAnswerBtn.addEventListener('click', showAnswer);
    }
    
    const finishEarlyBtn = document.getElementById('finish-early-btn');
    if (finishEarlyBtn) {
        finishEarlyBtn.addEventListener('click', endGame);
    }
    
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartGame);
    }
}

// Start the game
function startGame() {
    logDebug("Starting game...");
    
    try {
        // Get team names from input fields
        team1Name = document.getElementById('team1-name').value || "Agile Avengers";
        team2Name = document.getElementById('team2-name').value || "SAFe Superheroes";
        
        logDebug("Team names: " + team1Name + " and " + team2Name);
        
        // Update team names in the UI
        document.getElementById('team1-display').textContent = team1Name;
        document.getElementById('team2-display').textContent = team2Name;
        document.getElementById('team1-btn-text').textContent = team1Name + " Correct (+10)";
        document.getElementById('team2-btn-text').textContent = team2Name + " Correct (+10)";
        
        // Show scores in header 
        showScores();
        
        // Hide intro screen, show game screen
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        document.getElementById('game-over').style.display = 'none';
        
        // Reset game state
        currentQuestion = 0;
        team1Score = 0;
        team2Score = 0;
        
        // Initialize the game
        updateQuestion();
        updateScore();
        
        // Disable previous button at start
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.disabled = true;
        }
        
        logDebug("Game started successfully");
    } catch (error) {
        logDebug("ERROR starting game: " + error.message);
        console.error(error);
    }
}

// Update question display to handle multiple choice questions
function updateQuestion() {
    try {
        // Get questions from the separated questions file
        const questions = window.gameQuestions;
        if (!questions) {
            logDebug("ERROR: gameQuestions not available in updateQuestion!");
            return;
        }
        
        const question = questions[currentQuestion];
        
        // Update question counter
        document.getElementById('current-question').textContent = currentQuestion + 1;
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('answer-container').style.display = 'none';
        document.getElementById('answer-text').innerHTML = question.answer;
        
        // Get DOM elements
        const visualArea = document.getElementById('question-visual');
        const contentArea = document.querySelector('.content-area');
        const controlsArea = document.querySelector('.controls-area');
        
        // Check if this is a multiple choice question
        if (question.type === 'multiple-choice') {
            // Create HTML for the multiple choice visual
            let optionsHtml = question.visual;
            
            // Add options to the visual
            optionsHtml += '<div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 15px;">';
            optionsHtml += '<div style="font-weight: 600; margin-bottom: 10px;">Options:</div>';
            optionsHtml += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">';
            
            // Add each option
            question.options.forEach((option, index) => {
                const letter = String.fromCharCode(65 + index); // A, B, C, D...
                optionsHtml += `<div style="background: #f5f5f5; padding: 10px; border-radius: 6px; border: 1px solid #e0e0e0;">
                    <span style="font-weight: 600; margin-right: 5px;">${letter}.</span> ${option}
                </div>`;
            });
            
            optionsHtml += '</div></div>';
            
            // Set the visual content
            visualArea.innerHTML = optionsHtml;
            contentArea.classList.remove('with-options');
            controlsArea.style.display = 'flex';
        } else {
            // Standard question
            visualArea.innerHTML = question.visual;
            contentArea.classList.remove('with-options');
            controlsArea.style.display = 'flex';
        }
        
        // Add difficulty badge
        const difficultyBadge = document.createElement('div');
        difficultyBadge.id = 'difficulty-badge';
        difficultyBadge.className = 'difficulty-tag';
        difficultyBadge.textContent = question.difficulty;
        visualArea.appendChild(difficultyBadge);
        
        // Reset timer
        resetTimer();
        
        // Update buttons state
        document.getElementById('prev-btn').disabled = currentQuestion === 0;
        document.getElementById('next-btn').disabled = false;
        document.getElementById('show-answer-btn').disabled = false;
        
        // For standard questions, enable team buttons
        if (question.type === 'standard' || !question.type) {
            document.getElementById('team1-btn').disabled = false;
            document.getElementById('team2-btn').disabled = false;
        } else {
            // For multiple choice, also enable team buttons
            document.getElementById('team1-btn').disabled = false;
            document.getElementById('team2-btn').disabled = false;
        }
        
        document.getElementById('start-timer-btn').disabled = false;
        
        // Update next button text and event
        updateNextButtonListener();
        
        logDebug("Updated to question " + (currentQuestion + 1));
    } catch (error) {
        logDebug("ERROR updating question: " + error.message);
        console.error(error);
    }
}

// Setup for standard question
function setupStandardQuestion(question) {
    // Get DOM elements
    const visualArea = document.getElementById('question-visual');
    const contentArea = document.querySelector('.content-area');
    const controlsArea = document.querySelector('.controls-area');
    
    // Remove multiple choice class if present
    contentArea.classList.remove('with-options');
    
    // Set up visual area for standard question
    visualArea.className = 'visual-area';
    visualArea.innerHTML = question.visual;
    
    // Add difficulty badge
    const difficultyBadge = document.createElement('div');
    difficultyBadge.id = 'difficulty-badge';
    difficultyBadge.className = 'difficulty-tag';
    difficultyBadge.textContent = question.difficulty;
    visualArea.appendChild(difficultyBadge);
    
    // Show controls area
    controlsArea.style.display = 'flex';
    
    // Reset answer container
    document.getElementById('answer-container').style.display = 'none';
    document.getElementById('answer-text').innerHTML = question.answer;
    
    // Clear any multiple choice options
    const mcContainer = document.getElementById('multiple-choice-container');
    if (mcContainer) {
        mcContainer.style.display = 'none';
    }
}

// Setup for multiple choice question
function setupMultipleChoice(question) {
    // Get DOM elements
    const visualArea = document.getElementById('question-visual');
    const contentArea = document.querySelector('.content-area');
    const controlsArea = document.querySelector('.controls-area');
    
    // Add multiple choice class
    contentArea.classList.add('with-options');
    
    // Set up visual area for multiple choice
    visualArea.className = 'visual-area';
    visualArea.innerHTML = question.visual;
    
    // Add difficulty badge
    const difficultyBadge = document.createElement('div');
    difficultyBadge.id = 'difficulty-badge';
    difficultyBadge.className = 'difficulty-tag';
    difficultyBadge.textContent = question.difficulty;
    visualArea.appendChild(difficultyBadge);
    
    // Hide controls area for multiple choice
    controlsArea.style.display = 'none';
    
    // Get or create multiple choice container
    let mcContainer = document.getElementById('multiple-choice-container');
    if (!mcContainer) {
        mcContainer = document.createElement('div');
        mcContainer.id = 'multiple-choice-container';
        mcContainer.className = 'multiple-choice-container';
        contentArea.appendChild(mcContainer);
    }
    
    // Clear and show the multiple choice container
    mcContainer.innerHTML = '';
    mcContainer.style.display = 'block';
    
    // Add title
    const title = document.createElement('div');
    title.className = 'options-title';
    title.textContent = 'Select the correct answer:';
    mcContainer.appendChild(title);
    
    // Create options grid
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'options-grid';
    mcContainer.appendChild(optionsGrid);
    
    // Add options
    question.options.forEach((option, index) => {
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        optionItem.textContent = option;
        optionItem.dataset.index = index;
        
        // Add click event
        optionItem.addEventListener('click', function() {
            selectOption(this);
        });
        
        optionsGrid.appendChild(optionItem);
    });
    
    // Add answer container for multiple choice
    const answerContainer = document.createElement('div');
    answerContainer.className = 'answer-box';
    answerContainer.id = 'mc-answer-container';
    answerContainer.style.display = 'none';
    
    const answerTitle = document.createElement('div');
    answerTitle.className = 'answer-title';
    answerTitle.textContent = 'Answer:';
    
    const answerText = document.createElement('div');
    answerText.id = 'mc-answer-text';
    answerText.innerHTML = question.answer;
    
    answerContainer.appendChild(answerTitle);
    answerContainer.appendChild(answerText);
    mcContainer.appendChild(answerContainer);
    
    // Reset standard answer container
    document.getElementById('answer-container').style.display = 'none';
}

// Handle option selection for multiple choice
function selectOption(optionElement) {
    // Get current question
    const questions = window.gameQuestions;
    const question = questions[currentQuestion];
    
    // Get all options and remove selected class
    const allOptions = document.querySelectorAll('.option-item');
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.classList.remove('correct');
        opt.classList.remove('incorrect');
    });
    
    // Add selected class to the clicked option
    optionElement.classList.add('selected');
    
    // Store selected option index
    selectedOption = parseInt(optionElement.dataset.index);
    
    // Show if the selected option is correct or incorrect
    if (selectedOption === question.correctOption) {
        optionElement.classList.add('correct');
        
        // Award points to Team 1 (or implement a turn-based system)
        team1Score += 10;
        updateScore();
    } else {
        optionElement.classList.add('incorrect');
        
        // Show the correct answer
        const correctOption = document.querySelector(`.option-item[data-index="${question.correctOption}"]`);
        if (correctOption) {
            correctOption.classList.add('correct');
        }
    }
    
    // Show the answer explanation for multiple choice
    document.getElementById('mc-answer-container').style.display = 'block';
    
    // Disable further selection by removing event listeners
    allOptions.forEach(opt => {
        const newOpt = opt.cloneNode(true);
        opt.parentNode.replaceChild(newOpt, opt);
    });
}

// Show answer
function showAnswer() {
    const questions = window.gameQuestions;
    const question = questions[currentQuestion];
    
    document.getElementById('answer-container').style.display = 'block';
    document.getElementById('show-answer-btn').disabled = true;
}

// Update the next button behavior
function updateNextButtonListener() {
    // Get questions from the separated questions file
    const questions = window.gameQuestions;
    
    // Get the next button
    const nextBtn = document.getElementById('next-btn');
    
    // Clone the button to remove all event listeners
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    // Add the appropriate event listener
    if (currentQuestion === questions.length - 1) {
        newNextBtn.innerHTML = '<span>Finish Game</span> <i class="fas fa-flag-checkered btn-icon"></i>';
        newNextBtn.addEventListener('click', endGame);
    } else {
        newNextBtn.innerHTML = '<span>Next Question</span> <i class="fas fa-arrow-right btn-icon"></i>';
        newNextBtn.addEventListener('click', nextQuestion);
    }
}

// Timer functions
function startTimer() {
    // If timer was paused, resume from current time
    if (timerPaused) {
        timerPaused = false;
        document.getElementById('start-timer-btn').innerHTML = '<i class="fas fa-play btn-icon"></i> Start';
        document.getElementById('start-timer-btn').disabled = true;
        
        // Continue countdown from current time
        timerInterval = setInterval(updateTimer, 1000);
        return;
    }
    
    // Otherwise, reset and start fresh
    resetTimer();
    
    // Disable start button
    document.getElementById('start-timer-btn').disabled = true;
    
    // Start countdown
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft + 's';
    
    // Update progress bar
    const progressPercentage = (timeLeft / 30) * 100;
    document.getElementById('timer-progress').style.width = progressPercentage + '%';
    
    // Change color when time is running out
    if (timeLeft <= 10) {
        document.getElementById('timer').style.backgroundColor = '#ff9800'; // Orange
    }
    if (timeLeft <= 5) {
        document.getElementById('timer').style.backgroundColor = '#f44336'; // Red
    }
    
    if (timeLeft <= 0) {
        // Time's up
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('timer').textContent = 'Time\'s up!';
        document.getElementById('start-timer-btn').innerHTML = '<i class="fas fa-redo-alt btn-icon"></i> Resume';
        document.getElementById('start-timer-btn').disabled = false;
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerPaused = true;
        document.getElementById('start-timer-btn').innerHTML = '<i class="fas fa-redo-alt btn-icon"></i> Resume';
        document.getElementById('start-timer-btn').disabled = false;
    }
}

function resetTimer() {
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset timer display
    timeLeft = 30;
    timerPaused = false;
    document.getElementById('timer').textContent = '30s';
    document.getElementById('timer').style.backgroundColor = ''; // Reset to default (defined in CSS)
    document.getElementById('timer-progress').style.width = '100%';
    document.getElementById('start-timer-btn').innerHTML = '<i class="fas fa-play btn-icon"></i> Start';
    document.getElementById('start-timer-btn').disabled = false;
}

// Award points to team
function awardPoints(team) {
    if (team === 1) {
        team1Score += 10;
    } else {
        team2Score += 10;
    }
    updateScore();
    document.getElementById('team1-btn').disabled = true;
    document.getElementById('team2-btn').disabled = true;
    showAnswer();
}

// Update score display
function updateScore() {
    document.getElementById('team1-score').textContent = team1Score;
    document.getElementById('team2-score').textContent = team2Score;
}

// Navigate to next question 
function nextQuestion() {
    // Get questions from the separated questions file
    const questions = window.gameQuestions;
    
    // Clear timer before moving to next question
    resetTimer();
    
    // Increment current question
    currentQuestion++;
    
    // Make sure we don't exceed the total number of questions
    if (currentQuestion >= questions.length) {
        currentQuestion = questions.length - 1;
    }
    
    // Update the display
    updateQuestion();
}

// Navigate to previous question
function prevQuestion() {
    // Clear timer before moving to previous question
    resetTimer();
    
    // Decrement current question
    currentQuestion--;
    
    // Make sure we don't go below 0
    if (currentQuestion < 0) {
        currentQuestion = 0;
    }
    
    // Update the display
    updateQuestion();
}

// End the game
function endGame() {
    // Clear any running timer
    resetTimer();
    
    // Hide game screen, show results screen
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
    
    // Update stats on results screen
    document.getElementById('team1-stats').innerHTML = 
        `<span class="result-label">${team1Name} Score:</span><span>${team1Score}</span>`;
    document.getElementById('team2-stats').innerHTML = 
        `<span class="result-label">${team2Name} Score:</span><span>${team2Score}</span>`;
    
    // Determine winner
    let winnerText = '';
    if (team1Score > team2Score) {
        winnerText = `${team1Name} Wins!`;
    } else if (team2Score > team1Score) {
        winnerText = `${team2Name} Wins!`;
    } else {
        winnerText = "It's a Tie!";
    }
    document.getElementById('winner-text').textContent = winnerText;
    
    logDebug("Game ended. Final scores: " + team1Name + ": " + team1Score + ", " + team2Name + ": " + team2Score);
}

// Restart game
function restartGame() {
    // Reset scores
    team1Score = 0;
    team2Score = 0;
    currentQuestion = 0;
    
    // Hide game over screen, show intro screen
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('intro-screen').style.display = 'block';
    
    // Hide scores in header
    hideScores();
    
    // Reset the team names in input fields to current values
    document.getElementById('team1-name').value = team1Name;
    document.getElementById('team2-name').value = team2Name;
    
    logDebug("Game restarted");
}