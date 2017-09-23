const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const seqDiv = document.getElementById("seq");
const reset = document.getElementById("reset");
const start = document.getElementById("play");

const sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

var gameMode = null;

var seq = [];
var userSeq = [];

function addNum(){
  let newNum = (Math.ceil(Math.random() * 4));
  return newNum;
}

function playSound(id){
  switch(id){
    case 1:
      sound1.play();
      break;
    case 2:
      sound2.play();
      break;
    case 3:
      sound3.play();
      break;
    case 4:
      sound4.play();
      break;
    default:
      break;
  }
}

function lightSound(sequence) {
  var i = 0;
  var interval = setInterval(function(){
    lightUp(sequence[i]);
    i++;
    if(i > sequence.length){
      clearInteval(interval)
    }
  }, 500);
}

function lightup (tile) {
  var $tile =   $("[]")
}

/* FOR SOUNDS AND SEQUENCE PLAYED OUT */
    setInterval((e) => {
      // for(var i = 0; i<seq.length; i++){
        playSound(e);
        // return;
      // }
    }, 1000);

function startGame(){
  seq = [];
  userSeq = [];
  seq.push(addNum());
  seqDiv.innerHTML = seq;
  playSeq();
}

function checkSeq(){
  for(let i = 0; i < userSeq.length; i++){
    if(seq[i] !== userSeq[i]){
      seqDiv.innerHTML = 'OOOPS. try again';
      setTimeout(() => { userSeq = []; seqDiv.innerHTML = seq;}, 1000);
    } if(i === userSeq.length - 1 && seq.length === userSeq.length) {
      userSeq = [];
      seq.push(addNum());
      seqDiv.innerHTML = seq.toString();
    }
  }
  console.log(userSeq);
}
function resetGame(){
  if(gameMode !== null){
    gameMode = null;
  }
  seq = [];
  userSeq = [];
  seq.push(addNum());
  seqDiv.innerHTML = seq.toString();
}

reset.addEventListener('click', ()=>{
  resetGame();
});

/* BUTTON TRIGGERS */

one.addEventListener("click", () => { userSeq.push(1); checkSeq(); sound1.play(); });
two.addEventListener("click", () => { userSeq.push(2); checkSeq(); sound2.play(); });
three.addEventListener("click", () => { userSeq.push(3); checkSeq(); sound3.play(); });
four.addEventListener("click", () => { userSeq.push(4); checkSeq();  sound4.play(); });
start.addEventListener("click", () => { startGame(); });