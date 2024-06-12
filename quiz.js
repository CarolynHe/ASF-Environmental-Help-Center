//this would be the object shape for storing the questions  //https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp, https://codepen.io/Sulaimon-Olaniran/pen/zYKJLjK

const questions = [
    {
        question: "POV: After buying produce at the supermarket, you take home your groceries in a...",
        optionA: "Plastic bag",
        optionB: "Shopping cart",
        optionC: "Paper bag",
        optionD: "Reusable bag/tote",
        correctOption: "optionD"
    },

    {
        question: "How do you normally commute?",
        optionA: "Walking or biking",
        optionB: "Public transportation",
        optionC: "Personal vehicle (car)",
        optionD: "Aquatic transportation",
        correctOption: "optionA"
    },

    {
        question: "POV: You just got a shiny new car! It's a...",
        optionA: "Gas vehicle",
        optionB: "Electric/hybrid vehicle",
        optionC: "",
        optionD: "",
        correctOption: "optionB"
    },

    {
        question: "What does your diet look like?",
        optionA: "Special diet (pescatarian, keto, etc.)",
        optionB: "Equal opportunist (everything!)",
        optionC: "Plants (vegan or vegetarian)",
        optionD: "Carnivorous",
        correctOption: "optionC"
    },

    {
        question: "POV: You're really thirsty and need to buy water. What do you buy?",
        optionA: "A reusable waterbottle",
        optionB: "A case of plastic waterbottles",
        optionC: "A jug of water",
        optionD: "A case of sparkling water",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is your favorite household habit?",
        optionA: "Taking short showers",
        optionB: "Using energy-saving light-bulbs",
        optionC: "Thermostat set to 68 F or lower",
        optionD: "All of the above!",
        correctOption: "optionD"
    },

    {
        question: "Energy at your home is...",
        optionA: "100% coal, natural gas, etc.",
        optionB: "Some percentage is renewable",
        optionC: "100% renewable",
        optionD: "I'm not sure...",
        correctOption: "optionC"
    },

     {
        question: "POV: it's a sunny Saturday morning, so you decide to...",
        optionA: "Take a walk outside",
        optionB: "Drive to your friend's house",
        optionC: "",
        optionD: "",
        correctOption: "optionA"
    },

    {
        question: "POV: It's time for a shopping spree... Where do you gravitate towards?",
        optionA: "Thrift/second-hand stores",
        optionB: "Online retailers",
        optionC: "Fast fashion",
        optionD: "Wholesale suppliers",
        correctOption: "optionA"
    },

    {
        question: "POV: You're taking notes in school, and you're using...",
        optionA: "Pencil and paper",
        optionB: "A device/technology",
        optionC: "",
        optionD: "",
        correctOption: "optionB"
    },

    
    {
        question: "POV: Your clothing haul just arrived in the mail! Which of the following brands is it most likely to be from?",
        optionA: "Shein",
        optionB: "Urban Outfitters",
        optionC: "Reformation",
        optionD: "Zara",
        correctOption: "optionC"
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {

            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id

            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Check out our sustainability resources for help becoming more sustainable!"
        remarkColor = "white"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average sustainability; feel free to navigate to the Resources tab to improve your sustainability even more!"
        remarkColor = "white"
    }
    else if (playerScore >= 7) {
        remark = "Sustainability super star! How many resources do you recognize in the Resources tab?"
        remarkColor = "white"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}