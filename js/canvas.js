let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize',  function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

let isPaused = false;

window.onblur = function() {
    isPaused = true;
};

window.onfocus = function() {
    isPaused = false;
	animate();
};

function rand(min, max) {
	return Math.random() * (max - min) + min;
}

function randInt(min, max) {
	return Math.floor(rand(min, max));
}

function randColor() {
    let colors = ['rgba(255,255,255,' + rand(0.3, 0.8) + ')','rgba(0,0,0,' + rand(0.3, 0.6) + ')'];
	return colors[Math.floor(Math.random() * colors.length)];
}

function Circle(x, y, r, color) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;

	this.update = function() {
        if(this.y < -this.r ) {
            this.x = randInt(this.r, canvas.width - this.r);
            this.y = canvas.height + this.r;
        }
        this.x += randInt(-2,2);
        this.y += randInt(-50,10);
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		c.lineWidth = 10;
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	};
}

let bubbles;
function init() {
    bubbles = [];
	let bubbleNum = randInt((canvas.width * 0.02), (canvas.width * 0.04));
    for(let i = 0; i < bubbleNum; i++) {
        let r  = randInt(5, 25);
        let x  = randInt(r, canvas.width - r);
        let y  = randInt(0, canvas.height - r);
        bubbles.push(new Circle(x, y, r, randColor()));
    }
}

function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbles.length; i++) bubbles[i].update();
	requestAnimationFrame(function() {
		if(!isPaused) {
			animate();
		}
	});

}

init();
animate();
