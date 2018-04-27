jQuery(document).ready(function(){
        jQuery('#play').on('click', function(event) {
             jQuery('#btn').toggle('show');
             jQuery('#game').toggle('show');

             startGame();

        });
    });

    document.getElementById('myCanvas').addEventListener('click',function(evt){
    var clientX = evt.clientX;
    var clientY = evt.clientY;


    var rect = myGameArea.canvas.getBoundingClientRect(), // abs. size of element
    scaleX = myGameArea.canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = myGameArea.canvas.height / rect.height;  // relationship bitmap vs. element for Y

    //  console.log('x: ' + (clientX - rect.left * scaleX) + ' y: ' + (clientY - rect.top * scaleY));


    for (var i=0; i<userChoices.length; i++){
      var dx = (clientX - rect.left * scaleX) - userChoices[i].x;
      var dy = (clientY - rect.top * scaleY) - userChoices[i].y;
      var dist = Math.sqrt(dx*dx+ dy*dy)


      if (dist <= userChoices[i].r){
        userInput.push(userChoices[i].colour);
        if(userInput[i] == colourOrder[i]){
          console.log("hi");
        } else {
          console.log("wrong colour");
        }
      }
    }

    },false);


    var myScore = 0;
    var colourOrder = [];
    var userChoices = [];
    var userInput = [];
    var i,x,y,r,colour,interval;
    var gameTimeout;
    var colours = ['red', 'yellow', 'white', 'Magenta', 'blue', 'green'];
    var startingColours = ['red', 'yellow', 'white', 'Magenta', 'blue', 'green'];
    var canvasWidth = document.documentElement.clientWidth * 0.5;
    var canvasHeight = document.documentElement.clientHeight * 0.4;

    function startGame() {
        myGameArea.start();
    }

    var myGameArea = {
        canvas : document.getElementById("myCanvas"),
        start : function() {
            drawBackground();

            interval = setInterval(drawCircles, 1000);

            gameTimeout = setTimeout(enterInput, 7000);
        }
    }


    function drawBackground(){
      myGameArea.canvas.width = canvasWidth;
      myGameArea.canvas.height = canvasHeight;
      myGameArea.context = myGameArea.canvas.getContext("2d");
      myGameArea.context.fillStyle = "black";
      myGameArea.context.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    }

    function enterInput(){
      clearTimeout(gameTimeout);
      drawBackground();
      drawSelectionCircles();
      jQuery('#input').toggle('show');
    }

    function drawSelectionCircles(){
      var tempX, tempY, tempR = 0;
        r = canvasWidth * 0.06;
        x = canvasWidth * 0.1;
        y = canvasHeight * 0.2;
        for (var i=0; i < 6; i++){
          colour = startingColours[i];
          createCircle(x, y, r, colour);
          userChoices.push({x,y,r,colour});
          x += canvasWidth * 0.15;
        }

    }

    function drawCircles(){
        r = Math.floor(Math.random() * canvasWidth * 0.06) + canvasWidth * 0.03;
        x = Math.floor(Math.random() * (canvasWidth - r) + 1 ) + r;
        y = Math.floor(Math.random() * (canvasHeight - r) + 1 ) + r;
        colour = colours[Math.floor(Math.random() * colours.length)];

        if (colours.length < 2){
          clearInterval(interval);
        }

        var index = colours.indexOf(colour);
        if (index != -1) {
          colours.splice(index, 1);
        }
        colourOrder.push([colour]);
        createCircle(x, y, r, colour);
    }

    function createCircle(x, y, r, colour) {
        this.score = 0;
        this.r = r;
        this.x = x;
        this.y = y;
        this.colour = colour;
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.strokeStyle = colour;
        ctx.stroke();
      }
