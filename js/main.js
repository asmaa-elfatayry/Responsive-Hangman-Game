// letters
const letters="abcdefghijklmnopqrstuvwxyz";
// make array
let letterArray=Array.from(letters);
// container of letters 
let containerLetters=document.querySelector('.letters');
// genrate letters
letterArray.forEach(letter=>{
    let span=document.createElement('span');
    // create  letter text node will put in prev span
    let myLetter=document.createTextNode(letter);
    // append letter to span
    span.appendChild(myLetter);
    // add class on span
    span.className="letter-box-style";
    // append span to main container =>letters
containerLetters.appendChild(span);
})

// create object of words and categories
const words={
    Languages:['Arabic','English','French','German','Italian','Turkish','Spanish'],
    Movies:['Up','Wonder','Soul','Toy Story','Shrek','Nemo','Coco','Luca','Encanto'],
    People:['Ahmed Zewail','Mohamed Salah','Steve Jobs','Abo Trika','Cleopatra','Albert Einstein'],
    Countries:['Egypt','Syria','Palestine','Yemen','Qatar','Canada','Brazil','China','India','Turkey'],
    Cartoon:['Spong Pop','Scooby Doo','Tom and Jerry','Popeye','Mickey Mouse','The Powerful Girls'],
    Programming:['JavaScript','go','fortran','paython','Mysql','php','java','pascal','ruby','C'],
    Hobbies:['Art','Cooking','Chatting','Acting','Diving','Fashion','Hacking','Gaming','Writing','Cleaning','Design','Photographer'],
    Games:['Minecraft','Mario','Candy Crush','Subway','Pou','Ludo','Fruit Ninja','Piano Game','Sudoku','Pubg']
}

// random property from 6
let allKeys=Object.keys(words);
// get random number of property
let randomPropNum=Math.floor(Math.random() * allKeys.length);// 0 1 2 3 4 5 6
// get random name of property //category
let randomPropName=allKeys[randomPropNum];
// get random value in property //category words
let randomPropVal=words[randomPropName];
//  random number of value of prop
let randomValNum=Math.floor(Math.random() * randomPropVal.length );//ex number of language 0<=num<7
// get the word from prop value //chossen word
let randomValue=randomPropVal[randomValNum];
// get all letter
let onlyLetter=randomValue.replace(" ",'');
let onlyLetterArray=onlyLetter.split("");
//console.log(onlyLetterArray)
//console.log(randomValue)

// category info we will show the name of category beside Word Form:
document.querySelector('.game-info span').innerHTML=randomPropName;
let correct=0;

// start letter guess section
// select
let letterGuessContainer=document.querySelector('.letter-guess');

// convert chossen word to array
let letterAndSpaces=Array.from(randomValue);

// create span depend on letters
letterAndSpaces.forEach(letter=>{
    // create span
    let mySpan =document.createElement('span');
    // if letter is space
    if(letter===' '){
        // add class
        mySpan.className='space';
    }
    // append span to guess letter container
    letterGuessContainer.appendChild(mySpan);
})

// select all guess span
let guessSpans=document.querySelectorAll('.letter-guess span');
console.log(guessSpans)
// wrong answer
let wrongAnswer=0;

// draw element
let theDraw=document.querySelector('.hangman-draw');


let cli=0;
// handle clicking on letters
document.addEventListener("click",(e)=>{

    // set states of guess letter true or false
let theStates=false;

    if(e.target.className==='letter-box-style'){
        e.target.classList.add('clicked');
        cli++;
        // save the choosen word and save the letter user choosen it
        // get clicked letter
        let theClick=e.target.innerHTML.toLowerCase();
        
        // chosen word
        let theChoosenWord=Array.from(randomValue.toLowerCase());


      //  console.log(theChoosenWord)
    
    // let all;
    //     for(let i=0;i<theChoosenWord.length;i++){
    //         if(theChoosenWord[i]===theClick){
    //             let countTrueAns=0;
    //             console.log("yes");
    //             countTrueAns++;
    //             all+=countTrueAns;
    //             console.log(countTrueAns)
    //         }
          
    //      }
        theChoosenWord.forEach((wordLetter,wordIndex)=>{
            // if the clicked letter = letter in choosen word
            
     

            if(theClick==wordLetter){
                
                // answer correct
                theStates=true;
           

                // loop on all guess letters 
                guessSpans.forEach((span,spanIndx)=>{
                   
            if (wordIndex===spanIndx){
                span.innerHTML=wordLetter;
                correct++;
                document.getElementById('success').play();
            }
                });
                
            }

        });
     
        // if letter wrong
        if(theStates!=true){
            wrongAnswer++;
            theDraw.classList.add(`wrong-${wrongAnswer}`);
            // play wrong answer sound
            document.getElementById('fail').play();
            if(wrongAnswer===8){
                GameEnd();
                containerLetters.classList.add('finshGame');

            }

        }else{
            console.log(randomValue)
            console.log("corect",correct)
             // play correct answer sound
            // document.getElementById('success').play();
             if(wrongAnswer!==8){
                 if(correct===onlyLetterArray.length  ){
              GameSucc();
                } else {
                    
                        if(correct===randomValue.length  ){
                            GameSucc();
                              }
                    }
                   
                }
            
                }
            }
        })
            
   
    

// function end the game

function GameEnd(){
    let pop=document.querySelector('.popup');
    // create text
    pop.style.display="block";
    document.querySelector('.layout').style.display="block";
    let text=document.createTextNode(`Game Over, The Word Is ${randomValue} ` );
   let bt=document.createElement("button");
  let bttex=document.createTextNode("again");
//   style bt

bt.appendChild(bttex);
bt.classList.add('bt_st');

    pop.appendChild(text);
    pop.appendChild(bt);
    // add class

    pop.className="popup";
    document.body.appendChild(pop);

    bt.addEventListener("click",function(){
        pop.style.display="none";
        document.querySelector('.layout').style.display="none";
        document.location.reload();
    
    });
}


// right
function GameSucc(){
    let SecP=document.querySelector('.success-popup');
    SecP.style.display="block";
    document.querySelector('.layout').style.display="block";
    let bs=document.querySelector('.success-popup button');
    bs.addEventListener("click",function(){
        SecP.style.display="none";
        document.querySelector('.layout').style.display="none";
        document.location.reload();
    });
}
