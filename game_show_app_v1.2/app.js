const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start = document.getElementsByClassName("btn__reset")[0]
const keyrow= document.querySelector(".keyrow");

const overlay= document.getElementById('overlay');
const ul = phrase.getElementsByTagName('ul')[0];
const hearts= document.querySelectorAll(".tries");
let missed = 0;

// 4 CREATE A PHRASE
const phrases = [
'Be happy for others',
'Be greatful' ,
'Coding is fun',
"live love laugh ",
'Try your best'
];


// 3 Start Game reveals letters

start.addEventListener('click', () => {

    overlay.style.display='none';
  });

  // select random phrase from  array

  function getRandomPhraseAsArray(arr) {
    // get random phrase from 'phrases array  and split it into chars'
    for (let i = 0; i < arr.length; i++) {
        let randomLetter = arr[Math.floor(Math.random() * arr.length)] //
        return randomLetter.split('');
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);



//Create li , append to ul, give li className letters

function addPhraseToDisplay(array){

  array.forEach(function (currentLetter) {
    let li = document.createElement('li')
    li.textContent= currentLetter;
    console.log(li)
    console.log();
    if (currentLetter === " "){
      li.className = 'space'

    }else {
      li.className= 'letter';
    }
    ul.appendChild(li);
  });

  }

addPhraseToDisplay(phraseArray);




function replacePhraseToDisplay(array){

  phrase.innerHTML ='';
  let newUl= document.createElement('ul');
  array.forEach(function (currentUl){
    let li = document.createElement('li');
    li.textContent=currentUl
    if(currentUl === " "){
      li.className='space'

    }else{
      li.className='letter';
    }
    newUl.appendChild(li);



  });
   phrase.appendChild(newUl);
}


// letter function

function checkLetter(button){
  let textButton = button.textContent;
  let buttonMatch = null;
  const letters= document.getElementsByTagName('li');
  Array.from(letters).forEach(function(letter){
    if (button.textContent === letter.textContent.toLowerCase()){
      letter.classList.add('show');
      buttonMatch=textButton;
    }
  });

  return buttonMatch;

}
// reset the game

function reset (){
  start.textContent="Reset Game";
  start.addEventListener("click", ()=>{
  replacePhraseToDisplay(getRandomPhraseAsArray(phrases));
    missed=0;
    for(var i=0; i<hearts.length;i++){
      hearts[i].style.display="";
      const heartimage= hearts[i].querySelectorAll("img")[0];
      heartimage.src="images/liveHeart.png";
    }
  });
  return overlay.style.display
  }


// Click event butten
qwerty.addEventListener("click",(e)=>{
if (e.target.tagName== "BUTTON"){
  const button = e.target;
  checkLetter(button);
  if(checkLetter(button) == null){
    missed += 1;
    const heartimage= hearts[missed-1].querySelectorAll("img")[0];
    heartimage.src="images/lostHeart.png";
  }
  button.disabled=true;
}
checkWin();
});

function checkWin(){
let title = document.querySelectorAll(".title")[0];
var letterCount = document.querySelectorAll(".letter");
var showCount = document.querySelectorAll(".show");
letterCount = letterCount.length;
showCount = showCount.length;
    if(letterCount == showCount){
  overlay.style.display ="";
  overlay.className="win";
      title.textContent="You won!!"
  reset();
}
    if(missed>= 5) {
  overlay.style.display ="";
  overlay.className="lose";
   title.textContent = "OH NO, TRY AGAIN!!";
  reset();
  }
}
