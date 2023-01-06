var startBtn = document.querySelector('#start');
var timeLeftSpan = document.querySelector('#timer')
var resultsH2 = document.querySelector("#timer")
var startScreen = document.querySelector('.start-screen')
var questionScreen = document.querySelector(".question-screen")
var finalScreen = document.querySelector(".final-screen")
var timeScreen = document.querySelector(".time-screen")
var questionEl = document.querySelector("#questions")
var answerEl = document.querySelector("#answers")
var feedbackEl = document.querySelector("#results")
var scoreEl = document.querySelector("#score")
var saveScoreBtn = document.querySelector("#save-score")
var countdownTimer;
var timeLeft = 30;
var isPlaying = false;

var scores = 0;
var highScores = JSON.parse(localStorage.getItem("highScores")) || []
saveScoreBtn.addEventListener("click", saveScore)
// create a start button for quiz/ start timer



startBtn.addEventListener('click', startGame);
function startGame() {
    questionScreen.classList.remove('hide')
    finalScreen.classList.remove('hide')
    timeScreen.classList.remove('hide')
    startScreen.classList.add('hide')
    isPlaying = true;
    countdownTimer = setInterval(function () {
        timeLeft--;
        resultsH2.textContent=timeLeft
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            isPlaying = false
            var timeSection = document.querySelector(".time-screen")
            timeSection.innerHTML="Times Up!"

        }



    }, 1000)
    getQuestion()
}
// questions presented for user with multiple choice answers

var questions = [
    {
        question: 'When were the earliest forms of bowling seen?',
        choices: ["1500 BC", "200 BC", "500 AD", "3200 BC"],
        answer: "3200 BC"
    },
    {
        question: "What is three consecutive strikes called?",
        choices: ["falcon", "turkey", "lil-chicken", "rooster"],
        answer: "Turkey"
    },
    {
        question: "Which former president had two bowling lanes built into the white house?",
        choices: ["Reagan", "Trump", "Truman", "JFK"],
        answer: "Truman"
    },
    {
        question: "Bowling was used as a religious ritual to cleanse people of sin in which country",
        choices: ["Spain", "Africa", "Germany", "Iceland"],
        answer: "Germany"
    },
    {
        question: "According to the US Bowling Congress, a ball can have __ holes as long as every hole has a use",
        choices: ["6", "12", "9", "4"],
        answer: "12"
    }
]
var questionindex = 0
function getQuestion() {
    var currentquestion = questions[questionindex]
    questionEl.textContent = currentquestion.question
    answerEl.innerHTML= ""
    for (let index = 0; index < currentquestion.choices.length; index++) {
        const element = currentquestion.choices[index];
        var button = document.createElement("button")
        button.textContent = element
        button.addEventListener("click", checkanwser)
        answerEl.append(button)

    }
}
function checkanwser(event) {
    event.preventDefault();
    var userAnswer = event.target.innerText;
    console.log(userAnswer)
    // tell user if their right or wrong
if (userAnswer===questions[questionindex].answer){
    feedbackEl.textContent="Correct!"
    // incorrect questions subtract time from timer. show "incorrect"
}else{
    console.log("wrong")
    timeLeft -=2
}
    // increase question index +1
    questionindex++
    // if q index is less than total numbers, show next question
   if (questionindex<questions.length){
        getQuestion()
   }else {
    console.log("end quiz")
    endQuiz()
   }


}
// game is over after all questions anwsered or time reaches 0
function endQuiz(){
    clearInterval(countdownTimer)
    scoreEl.textContent=timeLeft
}   
// score is shown
function saveScore(){
    var initials= document.querySelector("#initials").value
    console.log(initials)
    var score= {score:timeLeft,initials:initials}
    if (questionindex===questions.length){
    highScores.push(score)
    localStorage.setItem("highScores", JSON.stringify(highScores))
    console.log(highScores)
    displayHighscores()
    }
} 
// initials can be added and score saved
function displayHighscores(){
    var highScoresEl = document.querySelector("#high-scores")
    highScoresEl.innerHTML=""
    for (let index = 0; index < highScores.length; index++) {
        const element = highScores[index];
        var li= document.createElement("li")
        li.textContent= element.initials + ": " + element.score
        highScoresEl.append(li)
        
    }
} 
displayHighscores()
    
    
  
   

