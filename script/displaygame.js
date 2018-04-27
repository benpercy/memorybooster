jQuery(document).ready(function(){
        jQuery('#play').on('click', function(event) {
             jQuery('#btn').toggle('show');
             jQuery('#game').toggle('show');

             startGame();

        });
    });



    var myScore;
    var circles, userInput;
    var i,x,y,r,colour,interval;
    var gameTimeout;
    var colours = ['red', 'yellow', 'white', 'Magenta', 'blue', 'green'];
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
      jQuery('#input').toggle('show');
    }

    function drawCircles(){
        r = Math.floor(Math.random() * canvasWidth * 0.06) + canvasWidth * 0.03;
        x = Math.floor(Math.random() * (canvasWidth - r) + 1 ) + r;
        y = Math.floor(Math.random() * (canvasHeight - r) + 1 ) + r;
        console.log(canvasWidth, canvasHeight)
        console.log("x: "+x+" y: "+y+" r: "+r);
        colour = colours[Math.floor(Math.random() * colours.length)];

        if (colours.length < 2){
          clearInterval(interval);
        }

        var index = colours.indexOf(colour);
        if (index != -1) {
          colours.splice(index, 1);
        }
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
