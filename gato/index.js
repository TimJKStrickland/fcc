'use strict';
      var pSym,
          cpuSym,
          xs = $('#xs'),
          os = $("#os"),
          playerTurn = true,
          board = [
                  "E", "E", "E",
                  "E", "E", "E",
                  "E", "E", "E",
                  ],
          wins = [
                  [0,1,2], [3,4,5], [6,7,8],
                  [0,3,6], [1,4,7], [2,5,8],
                  [0,4,8], [2,4,6]
          ],
          winner = false,
          squares = document.querySelectorAll(".square"),
          firstMove = Math.floor(Math.random() * 9),
          gameStatus = false;

        document.getElementById("square0").onclick = () => playerMove(0);
        document.getElementById("square1").onclick = () => playerMove(1);
        document.getElementById("square2").onclick = () => playerMove(2);
        document.getElementById("square3").onclick = () => playerMove(3);
        document.getElementById("square4").onclick = () => playerMove(4);
        document.getElementById("square5").onclick = () => playerMove(5);
        document.getElementById("square6").onclick = () => playerMove(6);
        document.getElementById("square7").onclick = () => playerMove(7);
        document.getElementById("square8").onclick = () => playerMove(8);


      xs.click(function(){
        pSym = "X";
        cpuSym = "O";
        playerTurn;
        os.addClass('hide');
        xs.addClass('hide');
        $(".board").removeClass('hide');
        gameWin(board);
        gameStatus = true;
      });

      os.click(function(){
        pSym = "O";
        cpuSym = "X";
        document.getElementById("square"+firstMove).innerHTML = cpuSym;
        playerTurn = true;
        os.addClass('hide');
        xs.addClass('hide');
        $(".board").removeClass('hide');
        gameWin(board);
        gameStatus = true;
      });

      function playerMove(square){
        if(playerTurn === true && board[square] === "E"){
          board[square] = pSym;
          squares[square].innerHTML = pSym;
          gameWin(board);
          playerTurn = false;
        }
        cpuMove();
      }
      function cpuMove(){
        console.log(winner);
        if(gameStatus === true){
          randomMove(board);
          gameWin(board);
          playerTurn = true;
        }
      }

      function randomMove(tboard){
        let move = Math.floor(Math.random() * 9);
        if(tboard[move] === "E"){
          tboard[move] = cpuSym;
          squares[move].innerHTML = cpuSym;
          playerTurn = true;
          return;
        } else {
          randomMove(board);
        }
      }

      function gameWin(tboard) {
        for(var i = 0; i < wins.length; i ++){
          winner = checkWin(tboard, wins[i][0], wins[i][1], wins[i][2]);
          if(winner === pSym){
            pWin();
            reset();
          } else if(winner === cpuSym) {
            cWin();
            reset();
          }
        }
      }
      function checkWin(checkBoard, one, two, three) {
        console.log( checkBoard[one]);
        if(checkBoard[one] === pSym && checkBoard[one] === checkBoard[two] && checkBoard[one] === checkBoard[three]){
          return pSym;
        } else if(checkBoard[one] === cpuSym && checkBoard[one] === checkBoard[two] && checkBoard[one] === checkBoard[three]) {
          return cpuSym;
        } else {
          return false;
        }
      }
      function pWin(){
        alert("YOU WON! nerd...");
      }
      function cWin(){
        alert("YOU LOST! The important thing is that you tried...");
      }

      function reset(){
        winner = false;
        board = [
                  "E", "E", "E",
                  "E", "E", "E",
                  "E", "E", "E",
                  ];
        squares.forEach(function(square){
          square.innerHTML = "";
        });
        playerTurn = true;
        gameStatus = false;
        os.removeClass('hide');
        xs.removeClass('hide');
        $('.board').addClass('hide');
      }