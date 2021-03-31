function init(argument) {
	place = document.getElementById("mycanvas");
	pen   = place.getContext("2d");
	W = place.width;
	H = place.height;
	score = 5;
	//need to add event  listner

	function keypressed(e){

		if(e.key=="ArrowDown"){
			snake.direction = "down";

		}else if(e.key=="ArrowUp"){
			snake.direction = "up";

		}else if(e.key=="ArrowLeft"){
			snake.direction = "left";

		}else if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
	}

	document.addEventListener("keydown",keypressed);
	//food object
	food = getRandomFood();

	//snake object
	snake = {
		inital_length : 5,
		cells : [],
		snakeColor : "red",
		direction : "right",
		// speedx = 1

		fillSnake:function(){
			for (var i = this.inital_length; i >=0; --i) {
				this.cells.push({x:i,y:0});
			}
		},
		
		drwSnake:function(){
			pen.clearRect(0,0,W,H);
			pen.fillStyle =this.snakeColor;
			pen.strokeStyle = "black";
			pen.lineWidth = 5;
			for (var i = 0;i<this.cells.length;++i) {
				// console.log(this.cells[i].x , this.cells[i].y)
				pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
				pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
			}

		},

		snakeMove:function(){
			var newX = this.cells[0].x;
			var newY = this.cells[0].y;
			
			
			if(newX==food.x&&newY==food.y){
				food = getRandomFood();
				score+=5;
			}else{
				this.cells.pop();
			}

			if(this.direction=="right"){
				newX+=1;
				this.cells.unshift({x:newX,y:newY});

			}else if(this.direction=="left"){
				newX-=1;
				this.cells.unshift({x:newX,y:newY});

			}else if(this.direction=="down"){
				newY+=1;
				this.cells.unshift({x:newX,y:newY});

			}else if(this.direction=="up"){
				newY-=1;
				this.cells.unshift({x:newX,y:newY});

			}
		},
	};

	//getRandomFood function
	function getRandomFood(){
		var foodX = Math.round(Math.random()*(W-10)/20);
		var foodY = Math.round(Math.random()*(H-10)/20);
		foodColors = ["yellow","pink","green","aqua","orange","white"]

		var i = Math.round(Math.random()*foodColors.length);
		var food = {
			x : foodX,
			y : foodX,
			color:foodColors[i],
		}
		return food;
	}

	snake.fillSnake();
}

function draw(){
	snake.drwSnake();
	pen.fillStyle = food.color;
	pen.fillRect(food.x*10,food.y*10,10,10);
	// pen.fillStyle = "white";
	// pen.fillText(10,10,"Your Score is "+score,10,10);
}

function update(){
	snake.snakeMove();
}


// game start from here
function gameLoop(){
	draw();
	update();
}
init();
setInterval(gameLoop,100);