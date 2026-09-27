
const progressFill = document.getElementById('progress-fill');
const questionCount = document.getElementById('quiz-count');
let question = document.getElementById('question');
const answerBtns = document.getElementById('answer-btns');
const nextBtn = document.getElementById('next-btn');

// quiz Questions

const questions = [
    {
        question: 'which keyword creates a variable that can be reassigned?',

        answers:[
            {
                text: 'const',
                correct: 'false'
            },
            {
                text: 'let',
                correct: true
            },
            {
                text:'function',
                correct: false
            },
            {
                text:'return',
                correct: false
            }

        ]
    },

    {
         question: 'Which method selects an HTML element using its ID?',

        answers:[
            {
                text: 'querySelectorAll()',
                correct: false
            },
            {
                text: 'createElement()',
                correct: false
            },
            {
                text:'innerHTML',
                correct: false
            },
            {
                text:'appendChild()',
                correct: false
            },
            {
                text: 'None of the above',
                correct: true
            }

        ]
    },
    {
     question: 'which data type stores multiple values together?',

        answers:[
            {
                text: 'Array',
                correct: true
            },
            {
                text: 'Number',
                correct: false
            },
            {
                text:'Boolean',
                correct: false
            },
            {
                text:'String',
                correct: false
            }

        ]
    },
    {
        question: 'which method adds a child element to a parent element?',

        answers:[
            {
                text: 'CreateElement()',
                correct: false
            },
            {
                text: 'getElementByID()',
                correct: false
            },
            {
                text:'appendChild()',
                correct: true
            },
            {
                text:'textContent',
                correct: false
            }

        ] 
    },
    {
         question: 'which javaScript feature allows us to write reusable blocks of code?',

        answers:[
            {
                text: 'Array',
                correct: false
            },
            {
                text: 'function',
                correct: true
            },
            {
                text:'Class',
                correct: false
            },
            {
                text:'String',
                correct: false
            }

        ]
    }
];

// Quiz state

let currentQuestionIndex = 0;
let score = 0;
let quizComplete = false;

 //display question
 function displayQuestion(){

    answerBtns.textContent = " ";

    const currentQuestion = questions[currentQuestionIndex];

    //convert question 0 to 1
    const currentQuestionNumber = currentQuestionIndex + 1;

    // total questions
    const totalQuestions = questions.length;

    //create quesiont count message
    const questionCountMessage = `Question ${currentQuestionNumber} of ${totalQuestions}`;

    //display count message and question
    questionCount.textContent = questionCountMessage;
    question.textContent = currentQuestion.question;

    //divide questionN by Numberofquestions
    const progressDecimal = currentQuestionNumber / totalQuestions;

    //convert decimal into percentage 
    const progressPercentage = progressDecimal * 100;

    //CSS progress
    const progressWidth = `${progressPercentage}%`;
    progressFill.style.width = progressWidth;

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const currentAnswer = currentQuestion.answers[i];
        
        const answerBtn = document.createElement("button");
        answerBtn.textContent = currentAnswer.text;
        answerBtn.className = "answer-btn";

       //check answer when cliked
        answerBtn.addEventListener("click", () =>{
            checkAnswer(currentAnswer, answerBtn);
        })

        answerBtns.appendChild(answerBtn)
    }
 }

 // check anser function
 function checkAnswer(selectedAnswer, selectedButton){
    if(selectedAnswer.correct === true){
        selectedButton.classList.add("correct");
        score += 1;
        console.log(score)
    }
    else{
        selectedButton.classList.add("incorrect");
    }

    const displayedAnswerBtns = answerBtns.children;
    const currentQuesion = questions[currentQuestionIndex]; 

    //get answer for current question
    const currentAnswers = currentQuesion.answers;

    for(let i = 0; i < displayedAnswerBtns.length ; i++){
        const displayedButton = displayedAnswerBtns[i];

        //get the answer connected to that button
        const currentAnswer = currentAnswers[i];

        //reveal the correct answer
        if(currentAnswer.correct === true){
            displayedButton.classList.add("correct");
            
        }

        displayedButton.disabled = true;
       
    }
    nextBtn.disabled = false;
}

displayQuestion();


 function moveToNextQuestion(){
    currentQuestionIndex +=1;
    nextBtn.disabled = true;

    const totalQuestion = questions.length;

    const remainingQuesion = currentQuestionIndex < totalQuestion;

    if(remainingQuesion === true)
    {
        displayQuestion();
    }
    else{
      quizComplete = true;
      showFinalScore();
    }
}
function showFinalScore(){
  answerBtns.textContent = "";

  const totalQuestions = questions.length;  

  const finalScoreMessage = `You scored ${score} out of ${totalQuestions}!`;

  questionCount.textContent = "QUIZ COMPLETED"
  question.textContent = finalScoreMessage; 
  progressFill.style.width = "100%";

  nextBtn.textContent = "Restart Quiz";
  nextBtn.disabled = false;
}

function restartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    quizComplete = false;
    nextBtn.textContent = "Next Question";
    nextBtn.disabled = true;

displayQuestion();
}

nextBtn.addEventListener("click", ()=>{
   
   if(quizComplete === true){
    restartQuiz();
   }
   else{
    moveToNextQuestion();
   };
})


displayQuestion();

