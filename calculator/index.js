$(document).ready(()=>{
  var check,
      input = [],
      entries = [],
      clicks = [],
      display = document.getElementById('display'),
      preview = document.getElementById('preview');
      display.innerHTML = 0;

  function result(entry, total){
    var allSliced = total.join('').slice(-22);
    if(entry.toString().length > 23){
      display.innerHTML = 0;
      preview.innerHTML = "Exceeded digit length";  
      input = [];
      entries = [];
      return;
    } else {
      if(entry.join('').length > 11){
        // for displaying super large numbers
        display.innerHTML = Number(entry.join("")).toExponential(6);
      } else {
        display.innerHTML = entry.join('');
        preview.innerHTML = allSliced;
      }
    }
  }
  
  function equals(btn, clikt){
    var arrCalc = [];
    //    RegEx for input
    var reg = /^[.0-9/*\-+=\/]+$/g;
    var last = clicks.length - 1;
    
    function mkCopy(arr){
      for(var i = 0; i < arr.length; i++){
        arrCalc.push(arr[i]);
      }
    }
    if(clicks[last] !== "operator"){
      mkCopy(input);
        
      if(reg.test(arrCalc.join(''))){
        if(eval(arrCalc.join('')) > 0.00001){
          check = eval(arrCalc.join('')).toPrecision(10);
        } else {
          check = eval(arrCalc.join('')).toPrecision(7);
        } 
      }
      else {
        alert("Input is off");
        return;
      }
      //    handle dividing by zero so the universe doesn't implode
      if(arrCalc.join("").match(/\/0/)) {
        result([0], ["Cannot divide by zero"]);
        input = [];
        entries = [];
        clicks = [];
        return;
      }
      input.push(btn, Number(check));
      entries = [];
      result([Number(check)], input);
      clicks.push(clikt.target.classList[1]);
      input.splice(0, input.length, Number(check));
    } else return;
  }
  
  /* MAKE BUTTONS DO BUTTON THINGS */
  function operators(btn, clikt){
    var last = clicks.length - 1;
    if(clicks[last] == "digit" || clicks[last] == "decimal" || clicks[last] == "equals") {
      input.push(btn);
      result([btn], input);
      clicks.push(clikt.target.classList[1]);
      entries = [];
    } else if (btn == "-" && input.length === 0 ) {
      input.push(btn);
      result([btn], input);
      clicks.push(clikt.target.classList[1]);
      entries = [];
    } else return;
  }
  
  function digits(btn, clikt){
    var last = clicks.length - 1;
    if(clicks[last]== "equals"){
      if(btn == "0"){
        return;
      } else {
        result([btn], [btn]);
        clicks.splice(0, clicks.length, clikt.target.classList[1]);
        input.splice(0, input.length, btn);
        clicks.push(clikt.target.classList[1]);
      }
    } else {
      if (btn === "0" && clicks[last] !== "digit" && clicks[last] !== "decimal"){
        return;
      } else {
        while (clikt.target.classList[1] == "digit"){
          input.push(btn);
          entries.push(btn);
          result(entries, input);
          clicks.push(clikt.target.classList[1]);
          return;
        }
      }
      entries = [];
    }
  }
  
    
  function clear(btn){
     if (btn == "AC") {
      var last = input.length - 2;
      if (input[last] == "=") {
        input = [];
        display.innerHTML = 0;
      } else {
        input.pop();
        entries.pop();
        clicks.pop();
        result(["0"], input);
      }
    } else {
    input = [];
    entries = [];
    result(["0"], input);
    clicks = [];
    }
  }
  
  function decimals(btn, clikt){
    if(input.indexOf(btn) < 0 || input.join('').match(/\.\d+[|\+|\-|X|\/|=]/g)){
      var last = clicks.length - 1;
      if(clicks[last] == "equals"){
        entries.push(btn);
        input.splice(0, input.length, btn);
        result(entries, input);
        clicks.splice(0, clicks.length, clikt.target.classList[1]);
        input.splice(0, input.length, btn);
      } else {
        input.push(btn);
        entries.push(btn);
        result(entries, input);
        clicks.push(clikt.target.classList[1]);
      }
    } else return;
  }
  
  
  /* END OF ACTIONS  */

  $('.button').click(clicked => {
    var btnVal = document.getElementById(clicked.target.id).innerHTML;
    
    
    if(clicked.target.classList.contains("digit")){
      console.log(btnVal);
      digits(btnVal, clicked);
    }
    else if(clicked.target.classList.contains("operator")){
      console.log(btnVal);
      operators(btnVal, clicked);
    }
    else if(clicked.target.classList.contains("equals")){
      equals(btnVal, clicked)
    }
    else if(clicked.target.classList.contains("clear")){
      clear(clicked);
    }
    else if(clicked.target.classList.contains("decimal")){
      decimals(btnVal, clicked);
    }
  });
});