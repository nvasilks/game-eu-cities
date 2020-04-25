document.addEventListener('DOMContentLoaded', () => {

// Variables
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const start = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phraseUl = document.querySelector("#phrase > ul");
let missed = 0;


//Start the game
start.addEventListener('click', () => overlay.style.display = 'none');

const phrases = [
    
    'ΒΕΡΟΛΙΝΟ',
    'ΜΑΔΡΙΤΗ',
    'ΡΩΜΗ',
    'ΠΑΡΙΣΙ',
    'ΒΟΥΚΟΥΡΕΣΤΙ',
    'ΒΙΕΝΝΗ',
    'ΑΜΒΟΥΡΓΟ',
    'ΒΑΡΣΟΒΙΑ',
    'ΒΟΥΔΑΠΕΣΤΗ',
    'ΒΑΡΚΕΛΩΝΗ',
    'ΜΟΝΑΧΟ',
    'ΜΙΛΑΝΟ',
    'ΠΡΑΓΑ',
    'ΣΟΦΙΑ',
    'ΒΡΥΞΕΛΛΕΣ',
    'ΚΟΛΩΝΙΑ',
    'ΝΑΠΟΛΗ',
    'ΣΤΟΚΧΟΛΜΗ',
    'ΤΟΡΙΝΟ',
    'ΜΑΣΣΑΛΙΑ',
    'ΑΜΣΤΕΡΝΤΑΜ',
    'ΖΑΓΚΡΕΜΠ',
    'ΒΑΛΕΝΘΙΑ',
    'ΚΡΑΚΟΒΙΑ',
    'ΦΡΑΓΚΦΟΥΡΤΗ',
    'ΡΙΓΑ',
    'ΛΟΤΖ',
    'ΣΕΒΙΛΛΗ',
    'ΠΑΛΕΡΜΟ',
    'ΣΑΡΑΓΟΣΑ',
    'ΑΘΗΝΑ',
    'ΕΛΣΙΝΚΙ',
    'ΒΡΟΤΣΛΑΒ',
    'ΡΟΤΕΡΝΤΑΜ',
    'ΣΤΟΥΤΓΚΑΡΔΗ',
    'ΝΤΙΣΕΛΝΤΟΡΦ',
    'ΚΟΠΕΓΧΑΓΗ',
    'ΝΤΟΡΤΜΟΥΝΤ',
    'ΓΕΝΟΒΑ',
    'ΕΣΣΕΝ',
    'ΛΕΙΨΙΑ',
    'ΜΑΛΑΓΑ',
    'ΓΚΕΤΕΜΠΟΡΓΚ',
    'ΒΡΕΜΗ',
    'ΔΟΥΒΛΙΝΟ',
    'ΛΙΣΑΒΟΝΑ',
    'ΔΡΕΣΔΗ',
    'ΒΙΛΝΙΟΥΣ',
    'ΠΟΖΝΑΝ',
    'ΑΝΝΟΒΕΡΟ',
    'ΧΑΓΗ',
    'ΑΜΒΕΡΣΑ',
    'ΛΥΩΝ',
    'ΝΥΡΕΜΒΕΡΓΗ',
    'ΝΤΟΥΙΣΜΠΟΥΡΓΚ',
    'ΛΑΣ ΠΑΛΜΑΣ ΝΤΕ ΓΚΡΑΝ ΚΑΝΑΡΙΑ',
    'ΤΟΥΛΟΥΖΗ',
    'ΓΚΝΤΑΝΣΚ',
    'ΤΑΛΙΝ',
    'ΜΟΥΡΘΙΑ',
    'ΜΠΡΑΤΙΣΛΑΒΑ',
    'ΣΤΣΕΤΣΙΝ',
    'ΠΑΛΜΑ ΝΤΕ ΜΑΓΙΟΡΚΑ',
    'ΜΠΟΛΟΝΙΑ',
    'ΦΛΩΡΕΝΤΙΑ',
    'ΜΠΡΝΟ',
    'ΜΠΟΧΟΥΜ',
    'ΙΑΣΙΟ',
    'ΜΠΙΝΤΓΚΟΣΤΣ',
    'ΒΟΥΠΕΡΤΑΛ',
    'ΟΥΤΡΕΧΤΗ',
    'ΝΙΚΑΙΑ',
    'ΜΠΙΛΜΠΑΟ',
    'ΦΙΛΙΠΠΟΥΠΟΛΗ',
    'ΛΟΥΜΠΛΙΝ',
    'ΩΡΧΟΥΣ',
    'ΒΑΡΝΑ',
    'ΜΠΙΛΕΦΕΛΝΤ',
    'ΤΙΜΙΣΟΑΡΑ',
    'ΜΑΛΜΕ',
    'ΑΛΙΚΑΝΤΕ',
    'ΚΟΡΔΟΒΑ',
    'ΜΠΑΡΙ',
    'ΘΕΣΣΑΛΟΝΙΚΗ',
    'ΒΟΝΝΗ',
    'ΚΛΟΥΖ-ΝΑΠΟΚΑ',
    'ΚΩΝΣΤΑΝΤΖΑ',
    'ΚΑΤΑΝΙΑ',
    'ΜΥΝΣΤΕΡ',
    'ΚΑΡΛΣΡΟΥΗ',
    'ΚΡΑΙΟΒΑ',
    'ΜΑΝΧΑΙΜ',
    'ΓΚΑΛΑΤΣΙ',

];


//Get random phrases
function getRandomPhraseAsArray(arr){
    const arrIndex = Math.floor(Math.random() * arr.length);
    return phrases[arrIndex].split('');
}

let phraseArray = getRandomPhraseAsArray(phrases);

//Add the phrases to display
function addPhraseToDisplay(arr) {
    let letters = "";

    for (var i = 0; i < arr.length; i += 1 ) {
        if (arr[i] !== " ") {
        letters += '<li class="letter">'  + arr[i] + '</li>';
        } else {
        letters += '<li class="space">'  + arr[i] + '</li>';
        }
    }
    phraseUl.innerHTML = letters;
}

addPhraseToDisplay(phraseArray); 

//Check if the letters are matching
function checkLetter(button) {
let letterMatch = null;

    for (var i = 0; i < document.querySelectorAll('.letter').length; i++) {
        if (button.innerText.toLowerCase() === document.querySelectorAll('.letter')[i].innerText.toLowerCase()) {
        document.querySelectorAll('.letter')[i].classList.add("show");
        letterMatch = "match";
    } 
}
return letterMatch
}

//Add event listener to the keyboard
qwerty.addEventListener('click', (e) => {
    const letterFound = e.target;
    if (letterFound.tagName == "BUTTON"){
    letterFound.className = "chosen";
    letterFound.setAttribute("disabled", "");
    checkLetter(letterFound);
    if (checkLetter(letterFound) == null){
        missed += 1;
        const hearts = document.querySelectorAll(".tries")[missed-1].querySelector("img");
        hearts.src="images/lostHeart.png";
      }
    }
    checkWin();
})

//Check for winner-loser
function checkWin() {
const classShow = document.querySelectorAll(".show");
const classLetter = document.querySelectorAll(".letter");
const title = document.querySelector('.title');
if (classShow.length == classLetter.length) {
    overlay.className = 'win';
    overlay.style.display = 'flex';
    title.textContent = 'ΜΠΡΑΒΟ! ΜΑΝΤΕΨΕΣ ΣΩΣΤΑ!';
    start.textContent = 'Παίξε ξανά!';
reset()

} else if (missed >= 5) 
{ overlay.className = 'lose';
overlay.style.display = 'flex';
title.textContent = 'ΕΧΑΣΕΣ! Η ΣΩΣΤΗ ΑΠΑΝΤΗΣΗ ΕΙΝΑΙ: ' + phraseArray.join('');
start.textContent = 'Παίξε ξανά!';
reset()
}
}

//Reset the game
function reset() {
    const btn = document.querySelectorAll('button');
start.addEventListener('click', () => {
    missed = 0;
    phraseUl.innerText = "";
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray); 
    for (var i= 0; i < btn.length; i++) {
        btn[i].classList.remove('chosen');
        btn[i].removeAttribute('disabled');
    };

    for (var i = 0; i < document.querySelectorAll(".tries").length; i++) {
        document.querySelectorAll(".tries")[i].querySelector("img").src ="images/liveHeart.png";
    }; 

})    
}

})