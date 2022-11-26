const game=document.getElementById('game')
const scoreDisplay=document.getElementById('score')
const PlayersData = []
let rightAnswers = 0
let wrongAnswers = 0
let questionAnswered = 0
let playercount = 0

//questions and answers
const jeopardyCategories=[
    {
        genre: 'Music',
        questions:[
            {
                question: 'What is the stage name for Adija palmer?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Vybz Kartel',
                level: 'very easy',
            },
            {
                question: 'Who is considered as the king of Pop?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Micheal Jackson',
                level: 'easy',
            },
            {
                question: 'What famous 90\'s r&b group did beyonce come from?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Destiny\'s Child',
                level: 'medium',
            },
            {
                question: 'OutKast consisted of Andre 3000 and who??',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Big Boy',
                level: 'hard',
            },
            {
                question: 'What was the Fugges first album called?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Blunted On Reality',
                level: 'very hard',
            },
           
        ],
    },

    {
        genre: 'Local Politics',
        questions:[
            {
                question: 'Bruce Golding was apart of which politacl party?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'JLP',
                level: 'very easy',
            },
            {
                question: 'Who is the current leader of the opposition?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Mark Golding',
                level: 'easy',
            },
            {
                question: 'Who is the Current Minister of Finance ?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Nigel Clarke',
                level: 'medium',
            },
            {
                question: 'Who was the 6th Prime Minister ?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Pj Patterson',
                level: 'hard',
            },
            {
                question: 'How long was Donald Sangster’s time as Prime Minister?(Please spell out number)',
                answers:['jk rowling','jrr tolkien'],
                correct: 'One',
                level: 'very hard',
            },
           
        ],
    },

    {
        genre: 'Geography',
        questions:[
            {
                question: 'What is the capital of Cuba?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Havana',
                level: 'very easy',
            },
            {
                question: 'The Mount Rushmore is found in which country?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'United States',
                level: 'easy',
            },
            {
                question: 'Name the only country in Africa to start with the letter \'U\'?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Uganda',
                level: 'medium',
            },
            {
                question: 'What is the largest Mountain in Europe?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Mount Elbus',
                level: 'hard',
            },
            {
                question: 'Van lake is the largest lake in which country?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Turkey',
                level: 'very hard',
            },
           
        ],
    },

    {
        genre: 'Movies',
        questions:[
            {
                question: 'Who was the main villian in Avengers: End Game?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Thanos',
                level: 'very easy',
            },
            {
				question: 'What is the Last Name of the actor who played the role of T\'Chala?',
                answers:['jk rowling','jrr tolkien'],
				correct: 'Boseman',
                level: 'easy',
            },
            {
				question: 'The pairing of Samuel L Jackson and John Travolta is most famous for which movie?',
                answers:['jk rowling','jrr tolkien'],
				correct: 'Pulp Fiction',
                level: 'medium',
            },
            {
                question: 'Which famous talk show host starred in the movie \'The Color Purple\'?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Oprah Winfrey',
                level: 'hard',
            },
            {
                question: 'In the Lord of the Rings Trilogy, Which Ent carried Pippin and Merry through Fangorn Forest?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Treebeard',
                level: 'very hard',
            },
           
        ],
    },

    {
        genre: 'General Trivia',
        questions:[
            {
                question: 'What is the closest planet to the sun?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Mercury',
                level: 'very easy',
            },
            {
                question: 'What year was the first model of the iPhone released?',
                answers:['jk rowling','jrr tolkien'],
                correct: '2007',
                level: 'easy',
            },
            {
                question: 'What animals are pearls found in?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Oysters',
                level: 'medium',
            },
            {
                question: 'What french ballet term means \'in front\'?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Devant',
                level: 'hard',
            },
            {
                question: 'What country hosted the fifth World Cup?',
                answers:['jk rowling','jrr tolkien'],
                correct: 'Switzerland',
                level: 'very hard',
            },
           
        ],
    },
]

//global variables and array used throughout the code
let score=100//stores the score acumilated throughout the game
scoreDisplay.innerHTML=score
let clicked = []//array of click events
let count=0//keeps track of how many items are clicked. used to determine when the game is over
var interval//used to controle the timer
var question//used in forfeit to pass info to turnOver
var answer1//used in forfeit to pass info to turnOver
var answer2//used in forfeit to pass info to turnOver
var right//used in forfeit to pass info to turnOver
var value//used in forfeit to pass info to turnOver
var level//used in forfeit to pass info to turnOver
var genre//used in forfeit to pass info to turnOver
var double//used in doubleup function to  determin if score should be added to or subtracted from       
var amount//used in dailyDouble and doubleup to store an element
var submit//used in dailyDouble and doubleup to store an element

function addCategory(category){//adds categories and cards to the play area
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML=category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question=>{
        const card=document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if(question.level=== 'very easy'){
            card.innerHTML= 100
        }
        if(question.level=== 'easy'){
            card.innerHTML= 200
        }
        if(question.level=== 'medium'){
            card.innerHTML= 300
        }
        if(question.level=== 'hard'){
            card.innerHTML= 400
        }
        if(question.level=== 'very hard'){
            card.innerHTML= 500
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.getInnerHTML())
        card.setAttribute('data-level',question.level)
        card.setAttribute('data-genre', category.genre)

        //flip card and clock event listener
        card.addEventListener('click',flipCard)
        card.addEventListener('click',clock)
    })
}



//timer function for the game
function clock(){   
    const time=document.getElementById('time')
    var counter = 60;

    interval = setInterval(function() {
        counter--;
        // Display 'counter' wherever you want to display it.
        if (counter <= 0) {
            clearInterval(interval);
            $('#time').html("<h3>Time Expired Click Forfeit </h3>");

            showButton.disabled = false
            txtInput.disabled = true
            answer.disabled = true

            return;
        }else{
            $('#time').text(counter);
            time.innerHTML=("Timer: seconds remaining " + counter)
        }
    }, 1000);    
}

const showButton=document.createElement('button')
const txtInput=document.createElement('INPUT')
const answer=document.createElement('button')
txtInput.setAttribute("type", "text")

function flipCard(){//function reveals question and answers
    
    this.innerHTML=""
    this.style.lineHeight="30px"
    this.style.fontSize="15px"

    const textDisplay=document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML= this.getAttribute('data-question')

    txtInput.classList.add('text-input')
    answer.classList.add('answer')
    showButton.classList.add('show-button')

   // document.querySelector('#show-button').disabled = true
   //txtInput.innerHTML=this.getAttribute('data-answer-1')
    answer.innerHTML="Answer"
    showButton.innerHTML="forfeit"
    
    //button event listener
    //firstButton.addEventListener('click',checkAnswer)
    answer.addEventListener('click',checkAnswer)
    showButton.addEventListener('click',forfeit)

    this.append(textDisplay, txtInput, answer,showButton)

    //remove  event listener from cards not filped when 1 is fliped
    const allCards= Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click',flipCard))
    
    //stops timer from reseting when you click the text box or answer button
    txtInput.addEventListener("click", function(e){
        e.preventDefault();
        // Use stopImmediatePropagation to stop the element from passing this click to wrapping parents
        e.stopImmediatePropagation();
    });
    answer.addEventListener("click", function(e){
        e.preventDefault();
        // Use stopImmediatePropagation to stop the element from passing this click to wrapping parents
        e.stopImmediatePropagation();
    });

    showButton.disabled=true
    answer.disabled = false
    txtInput.disabled = false
  
    dailyDouble(this)
    clicked.push(this)

    //checks if the card is in the clicked array and iterates count
    if(clicked.includes(this)===true){
        count++
        console.log(count)
    }
}

//checks answers and disables card after it is clicked
function checkAnswer(){
	
	i = playercount - 1
    
    //add all cards in array and adds back event listner
    const allCards=Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card =>card.addEventListener('click',flipCard))
    
    const cardOfButton=this.parentElement
    var getanswer=cardOfButton.querySelector('input')
    console.log(getanswer.value)

    if(cardOfButton.getAttribute('data-correct')===getanswer.value){//check if answer is correct
        score=score+parseInt(cardOfButton.getAttribute('data-value'))//add score if correct
        scoreDisplay.innerHTML=score//display score 
        
        cardOfButton.classList.add('correct-answer')
        double=1

        //stops timer
        clearInterval(interval);
        $('#time').html("<h3>Question Answered</h3>"); 
        $('#seconds').html("");

        //remove everythin in card if correct leave points by removing child use timer so it is not instant
        setTimeout(()=>{
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            
            cardOfButton.innerHTML=cardOfButton.getAttribute('data-value')//display value if correct

        },100)
		PlayersData[i][8] += 1
		
    }else{
        score=score-parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML=score
        double=0

        //stops timer 
        cardOfButton.classList.add('wrong-answer')
        clearInterval(interval);
        $('#time').html("<h3>Question Answered</h3>");
        $('#seconds').html("");

        //remove everythin in card if correct leave points by removing child use timer so it is not instant
        setTimeout(()=>{
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML= "0" //display 0 if wrong

        },100) 
		PlayersData[i][9] += 1
    }

    //remove event listner when finish answer card so no longer usable
    cardOfButton.removeEventListener('click',flipCard)
    cardOfButton.removeEventListener('click',clock)

    getanswer.value=""

     //trigger final jepordy
     if(count==25){
        alert("you have compleated the game you can exit or play final jepordy")
        document.getElementById('final-jepordy').disabled=false
        clearInterval(interval);
        $('#time').html("<h3>You Beat The Game</h3>"); 
        $('#seconds').html("");
    }
	PlayersData[i][10] += 1
	showAll()
}

 //when time runs out this function is called 
function forfeit(){
   
    const allCards=Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card =>card.addEventListener('click',flipCard))

    const reset=this.parentElement

    score=score-parseInt(reset.getAttribute('data-value'))//add score if correct
        scoreDisplay.innerHTML=score//display score

        ans=confirm("would you like to know the answer") 
    if (ans== true){
        //if answer is reaveled question is disabled 
        reset.innerHTML=reset.getAttribute('data-correct')
        reset.classList.add('reviled')

        clearInterval(interval);
        $('#time').html("<h3>Question Forfeit</h3>"); 
        $('#seconds').html("");

    }
    reset.removeEventListener('click',flipCard)
    reset.removeEventListener('click',clock)

    if (ans==false){
        question=reset.getAttribute('data-question')
        answer1=reset.getAttribute('data-answer-1')
        answer2=reset.getAttribute('data-answer-2')
        right=reset.getAttribute('data-correct')
        value=reset.getAttribute('data-value')
        level=reset.getAttribute('data-level')
        genre=reset.getAttribute('data-genre')
        turnOver(reset)

        //remove element from clicked array
        if(clicked.includes(reset)===true){
            var remove = clicked.indexOf(reset)
            clicked.splice(remove, 1);
            count--
            console.log(count)
        }
    }
    
}

//return question to the board if answer is not revealed i.e. return its original state
function turnOver(info){

    const change=info

    change.style.fontSize="100px"
    change.style.textAlign= "center"
    change.style.margin= "5px"
    change.style.padding= "10px"
    change.style.lineHeight= "120px"

    clearInterval(interval)
        $('#time').html("<h3>Question Remains</h3>")
        $('#seconds').html("")
   
        let display=change

        display.setAttribute('data-question',question)
        display.setAttribute('data-answer-1', answer1)
        display.setAttribute('data-answer-2', answer2)
        display.setAttribute('data-correct', right)
        display.setAttribute('data-value', value)
        display.setAttribute('data-level',level)
        display.setAttribute('data-genre',genre)

        setTimeout(()=>{
            while (change.firstChild) {
                change.removeChild(change.lastChild)
            }
            
        if(display.getAttribute('data-level')=== 'very easy'){
            display.innerHTML= 100
        }
        if(display.getAttribute('data-level')=== 'easy'){
            display.innerHTML= 200
        }
        if(display.getAttribute('data-level')=== 'medium'){
            display.innerHTML= 300
        }
        if(display.getAttribute('data-level')=== 'hard'){
            display.innerHTML= 400
        }
        if(display.getAttribute('data-level')=== 'very hard'){
            display.innerHTML= 500
        }

        //flip card and clock event listener
        change.addEventListener('click',flipCard)
        change.addEventListener('click',clock)

        },10) 
}

//function that choses random cards for the daily double
function dailyDouble(triger){

    var info=triger
    const allCards=Array.from(document.querySelectorAll('.card'))
    var randomItem1 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem2 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem3 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem4 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem5 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem6 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem7 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem8 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem9 =allCards[Math.floor(Math.random()*allCards.length)];
    var randomItem10 =allCards[Math.floor(Math.random()*allCards.length)];

    if( info===randomItem1||info===randomItem2||
        info===randomItem3||info===randomItem4||
        info===randomItem5||info===randomItem6||
        info===randomItem7||info===randomItem8||
        info===randomItem9||info===randomItem10){
        
       amount= document.getElementById('double').disabled=false
       submit=document.getElementById('submit').disabled=false
      window.alert("you have trigered daily double enter the amount you wish to wager in the text area from 0 to max amount you have")

    }
}

//calculates daily double 
function doubleup(){

    amount= document.getElementById('double')
    submit=document.getElementById('submit')
    if(amount.value<0||amount.value>score){
        alert("Amount you entered is either less than zero or greater than the points in your posession")
        
    }else if(double===1){ 
        score=score+parseInt(amount.value)//add score if correct
        scoreDisplay.innerHTML=score//display score
      }else{
        score=score-parseInt(amount.value)//subtract score if wrong
        scoreDisplay.innerHTML=score//display score
      }
    
      //disables button and text input
      submit.disabled=true
      amount.disabled=true
}

//create a new jepordy game using 1 random genre and 1 question. The button to call this function is disabled untill 
//the game is finished
function finalJepordy(){
    //array of card variables 
    const finalCard=Array.from(document.querySelectorAll('.card'))

    //choses a randome genre and question
    var ranCard=finalCard[Math.floor(Math.random()*finalCard.length)];

    //removes finished game and adds the new game to the play area
    setTimeout(()=>{
        while (game.firstChild) {
            game.removeChild(game.lastChild)
        }
        game.style.fontSize="100px"
        game.style.textAlign= "center"
        game.style.margin= "5px"
        game.style.padding= "10px"
        game.style.lineHeight= "120px"
        
        const column = document.createElement('div')
        column.classList.add('genre-column')

        const genreTitle = document.createElement('div')
        genreTitle.classList.add('genre-title')
        genreTitle.innerHTML=ranCard.getAttribute('data-genre')

        column.appendChild(genreTitle)
        game.append(column)

        const card=document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if(ranCard.getAttribute('data-level')=== 'very easy'){
            card.innerHTML= 100
        }
        if(ranCard.getAttribute('data-level')=== 'easy'){
            card.innerHTML= 200
        }
        if(ranCard.getAttribute('data-level')=== 'medium'){
            card.innerHTML= 300
        }
        if(ranCard.getAttribute('data-level')=== 'hard'){
            card.innerHTML= 400
        }
        if(ranCard.getAttribute('data-level')=== 'very hard'){
            card.innerHTML= 500
        }

        card.setAttribute('data-question', ranCard.getAttribute('data-question'))
        card.setAttribute('data-answer-1', ranCard.getAttribute('data-answer-1'))
        card.setAttribute('data-answer-2', ranCard.getAttribute('data-answer-2'))
        card.setAttribute('data-correct', ranCard.getAttribute('data-correct'))
        card.setAttribute('data-value', ranCard.getAttribute('data-value'))
        card.setAttribute('data-level',ranCard.getAttribute('data-level'))
        card.setAttribute('data-genre',ranCard.getAttribute('data-genre'))

        //flip card and clock event listener
        card.addEventListener('click',flipCard)
        card.addEventListener('click',clock)
    
    },10)

}

//exit function
function exit(){
    setTimeout(()=>{
        while (game.firstChild) {
            game.removeChild(game.lastChild)
        }
        game.style.fontSize="150px"
        game.style.textAlign= "center"
        game.style.margin= "5px"
        game.style.padding= "10px"
        game.style.lineHeight= "120px"
        game.style.backgroundColor= "white"
        document.body.style.backgroundColor = 'white'
        game.style.color= "black"
        game.innerHTML="Game Over"
    },10)
}

let regbtn = document.getElementById("reg")
let dobinput = document.getElementById("dob")
let ageinput = document.getElementById("age")
let fname = document.getElementById("fname")
let emailinput = document.getElementById("email")
let lname = document.getElementById("lname")
let gender = document.getElementById("gender")
let street_address = document.getElementById("street")
let city = document.getElementById("town")
let country = document.getElementById("country")
let education_lvl = document.getElementById("edc_level")
let start_button = document.getElementById("start_btn")
let end_button = document.getElementById("end_btn")
let result_btn = document.getElementById("result")



start_button.disabled = true;
end_button.disabled = true;
result_btn.disabled = true;


dobinput.addEventListener("input", function(){
	let dob = new Date(dobinput.value);
	let month_diff = Date.now()- dob.getTime();
	let age_date = new Date(month_diff);
	let year = age_date.getFullYear();
	let age = Math.abs(1970 - year);
	ageinput.value = age;
});

start_btn.addEventListener("click", PlayGame);
regbtn.addEventListener("click", Register);

function Register(){
	if(ageinput.value < 12){
		alert("You are not eligable to play. You must be older that 12 years old.");
	}
	else if (fname.value.length < 3){
		alert("Your first name must be greater than 3 charchters");
	}
	else if (emailinput.value.endsWith("@SomeEmail.com") != true){
		alert("Your email is invalid");
	}
	else{
		PlayersData[playercount] = [fname.value, lname.value, dobinput.value, ageinput.value, emailinput.value, 
		gender.value,street_address.value+" "+city.value+" "+country.value, education_lvl.value, 0, 0, 0]
		Disable()
		playercount++
	}
}


function Disable(){
	var buttons = document.getElementsByClassName('form_data');
	for(var i = 0;i < buttons.length;i++){
	buttons[i].disabled=true;
	}
	start_button.disabled = false;
	end_button.disabled = false;
	result_btn.disabled = false;
}

function PlayGame(){
	jeopardyCategories.forEach(category=> addCategory(category))
	event.preventDefault()
}

function findPercentageScore(){
	i = playercount - 1
	document.getElementById("showpercentage").value = " "
	var percentage = (PlayersData[i+8]/PlayersData[i+10]) * 100
	document.getElementById("showpercentage").value = "Name: "+PlayersData[i][0]+" "+PlayersData[i][1]+" Town: "+city.value+" Date: "+new Date(Date.now())
	document.getElementById("showpercentage").value += " Correct Answers:"+PlayersData[i][8]+" WrongAnswers: "+PlayersData[i][9]
	document.getElementById("showpercentage").value += " Total Questions: "+ PlayersData[i][10]+" Score %: "+ percentage+"%"
	event.preventDefault()
}

function showAll(){
	document.getElementById("showpercentage").value = " "
	for (var i = 0; i < playercount; i += 8)
	{
		document.getElementById("showallplayers").value = "First Name: "+ PlayersData[i][0] +", Last Name: "+ PlayersData[i][1] +", DOB: " + PlayersData[i][2]
		document.getElementById("showallplayers").value += ", Age: "+ PlayersData[i][3] + ", Email: "+ PlayersData[i][4] +", Gender: "+ PlayersData[i][5]
		document.getElementById("showallplayers").value += ", Address: "+ PlayersData[i][6] + ", Right Answers: "+ PlayersData[i][8]
		document.getElementById("showallplayers").value += ", Wrong Answers: "+ PlayersData[i][9]+", Total Questions Answered: "+ PlayersData[i][10]
	}
}

end_btn.addEventListener("click", function(){
	Disable();
	exit();
	findPercentageScore()
	var buttons = document.getElementsByClassName('form_data');
	for(var i = 0;i < buttons.length;i++){
	buttons[i].disabled=false;
	buttons[i].value = " "
	}
	start_button.disabled = true;
	end_button.disabled = true;
	event.preventDefault();
})

function showFreq(){
	let malecount = 0
	let femalecount = 0
	let agerange1 = 0
	let agerange2 = 0
	let agerange3 = 0
	let agerange4 = 0
	for (i = 0; i < playercount; i++){
		 if (PlayersData[i][5] == "male"){
			 malecount++
		 }
		 else{
			 femalecount++
		 }
		 if(PlayersData[i][3] < 20){
			 agerange1++
		 }
		 else if(PlayersData[i][3] >= 20 && PlayersData[i][3] <= 39){
			 agerange2++
		 }
		  else if(PlayersData[i][3] >= 40 && PlayersData[i][3] <= 69){
			 agerange3++
		 }
		  else if(PlayersData[i][3] > 69){
			 agerange4++
		 }
		 
	}
	
	malepercentage = (malecount/playercount) * 100
	if(isNaN(malepercentage)){malepercentage = 0}
	femalepercentage = (femalecount/playercount) * 100
	if(isNaN(femalepercentage)){femalepercentage = 0}
	agerangepercentage1 = (agerange1/playercount) * 100
	if(isNaN(agerangepercentage1)){agerangepercentage1 = 0}
	agerangepercentage2 = (agerange2/playercount) * 100
	if(isNaN(agerangepercentage2)){agerangepercentage2 = 0}
	agerangepercentage3 = (agerange3/playercount) * 100
	if(isNaN(agerangepercentage3)){agerangepercentage3 = 0}
	agerangepercentage4 = (agerange4/playercount) * 100
	if(isNaN(agerangepercentage4)){agerangepercentage4 = 0}
	document.getElementById("malebar").innerHTML = "<img src=\"graph_bar.png\" width=\""+malepercentage+"\">"
	document.getElementById("femalebar").innerHTML = "<img src=\"graph_bar.png\" width=\""+femalepercentage+"\">"
	document.getElementById("agerange1").innerHTML = "<img src=\"graph_bar.png\" width=\""+agerangepercentage1+"\">"
	document.getElementById("agerange2").innerHTML = "<img src=\"graph_bar.png\" width=\""+agerangepercentage2+"\">"
	document.getElementById("agerange3").innerHTML = "<img src=\"graph_bar.png\" width=\""+agerangepercentage3+"\">"
	document.getElementById("agerange4").innerHTML = "<img src=\"graph_bar.png\" width=\""+agerangepercentage4+"\">"
	setInterval(function(){$("#showcharts").load(" #showcharts")},5000)
}

window.onload = setInterval(showFreq, 5000)

result_btn.addEventListener("click",findPercentageScore)
