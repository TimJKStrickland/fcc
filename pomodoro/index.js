let counter = 0;
const timer = document.getElementById('timer');
let interval;

/* Timers */
const addBreak = document.getElementById('addBreak');
const subBreak = document.getElementById('subtractBreak');
let breakTimer = document.getElementById('breakTimer');
const addPomo = document.getElementById('addPomo');
const subPomo = document.getElementById('subtractPomo');
const pomoTimer = document.getElementById('pomoTimer');
let isPomo = true;
/* Buttons */
const start = document.getElementById('start');
const stop = document.getElementById('stop');
let running = false;
const reset = document.getElementById('reset');
let timeLeft = pomoTimer.innerHTML * 60;
let breakLeft = breakTimer.innerHTML * 60;

/* FUNCTIONS FUNCTIONS */
function convertTime(s){
  var min = Math.floor(s / 60);
  var sec = s % 60;
  if (min < 10) {min = "0" + min;}
  if (sec < 10) {sec = "0" + sec;}
  return min + ":" + sec;
}

function increaseTimePomo(){
  pause();
  if(pomoTimer.innerHTML == 60){
    return;
  } else {
    pomoTimer.innerHTML++;
  }
}

function decreaseTimePomo(){
  pause();
  if(pomoTimer.innerHTML <= 1){
    return;
  } else {
    pomoTimer.innerHTML--;
  }
  timeLeft = pomoTimer.innerHTML;
}

function increaseTimeBreak(){
  pause();
  if(breakTimer.innerHTML == 60){
    return;
  } else {
    breakTimer.innerHTML++;
  }
}

function decreaseTimeBreak(){
  pause();
  if(breakTimer.innerHTML <= 1){
    return;
  } else {
    breakTimer.innerHTML--;
  }
}

var pause = function(){
  running = false;
  clearInterval(interval);
};

var moveOn = function(){
  if(isPomo){
    timeLeft = breakTimer.innerHTML;
    document.getElementById('display').innerHTML = "Break";
    isPomo = false;
  } else {
    timeLeft = pomoTimer.innerHTML;
    document.getElementById('display').innerHTML = "Pomo";
    isPomo = true;
  }
};

var tick = function() {
  interval = setInterval(function(){
    if(timeLeft > 0){
      timeLeft --;
      timer.innerHTML = convertTime(timeLeft + 1);
    } else {
      moveOn();
    // if(timeLeft = 0){
    }
  }, 1000);
};


/*ALL THE BUTTONS*/


addPomo.addEventListener('click', increaseTimePomo);
subPomo.addEventListener('click', decreaseTimePomo);

addBreak.addEventListener('click', increaseTimeBreak);
subBreak.addEventListener('click', decreaseTimeBreak);

start.addEventListener('click', function(){
  tick();
  running = true; 
  // if(breakLeft == counter){
  //    clearInterval(interval);
  // }
});

stop.addEventListener('click', pause);

reset.addEventListener('click', function(){
  timer.innerHTML = pomoTimer.innerHTML;
  timeLeft = pomoTimer.innerHTML * 60;
  pause();
});


