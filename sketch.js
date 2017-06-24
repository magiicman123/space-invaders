var invaderImg,
music;

var scl,
sclWidth,
sclHeight;

var player,
invaders,
bullets;

function preload () {
	//invaderImg = loadImage('assets/img/invader.png');
	//music = loadSound('assets/img/music.png');
}

function setup() {
	createCanvas(600,700);
	frameRate(10);

	scl = 20;
	sclWidth = width / scl;
	sclHeight = height / scl;

	player = new Player();

	bullets = [];
	invaders = [];

	for(let i = sclWidth / 2 - 10;i != sclWidth / 2 + 10;i+= 2){
		for(let j = 3; j != 15;j += 2){
			invaders.push(new Invader(i,j,[0,24 * j,j * 20] ) );
		}
	}
}

function draw() {
	background(51);

	bullets.forEach( (b) => {
		b.update();
		b.show();
	});

	invaders.forEach( (i) =>{
		i.update();
		i.show();
	})

	player.update();
	player.show();
}

function Player() {
	this.pos = createVector(sclWidth / 2,sclHeight - 4);

	this.w = 1;
	this.h = 4;

	this.update = () => {
		if(keyIsDown(LEFT_ARROW)){
			this.pos.x -= 0.2;
		}

		if(keyIsDown(RIGHT_ARROW)){
			this.pos.x += 0.2;
		}

	}

	this.show = () => {
		fill(180);
		strokeWeight(2);
		stroke(0);
		rect(this.pos.x * scl,this.pos.y * scl,this.w * scl,this.h * scl);
	}

}

function Bullet(enemy,x,y){
	this.x = x;
	this.y = y;

	this.s = 0.5;

	this.isInvader = enemy;

	this.update = () => {
		if(this.y <= 0){
			bullets.splice(bullets.indexOf(this),1);
		}

		if(this.isInvader){
			this.y += 1;
		}

		else{
			this.y -= 1;
		}
	}

	this.show = () => {
		fill(100,100,255);
		line(this.x * scl,this.y * scl,this.x * scl,this.y * scl + this.s * scl);
	}

}

function Invader(x,y,color){
	this.x = x;
	this.y = y;

	this.s = 1;

	this.color = color;

	this.dir = 1;

	this.hitWall = () => {
		for(let i = 0;i != invaders.length - 1;i++){
			if(invaders[i].x >= sclWidth - 1){
				return true;
			}

		}

	}


	this.update = () => {
		if(this.hitWall()){
			this.dir = -1;
		}
		this.x += this.dir;
	}

	this.show = () => {
		fill(this.color[0],this.color[1],this.color[2]);
		noStroke();
		rect(this.x * scl,this.y * scl,this.s * scl,this.s * scl);
	}

}

var keyPressed = () => {
	if(keyCode = 32){
		bullets.push(new Bullet(false,player.pos.x,player.pos.y));
	}

}