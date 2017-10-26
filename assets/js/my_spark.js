

var particleCX = 0, particleCY = 0;
var dir = 1, index = 0, idLineMax = 0;
var particlePath = [];
var arrFibonacciPoints = [];
var isResizing = false;
var isDrawed = false;
var isSecondTab = false;
var fibIndex = 0;

function getFibonacciPoints() {
	var myWidth = document.getElementById("sketch-0").width;
	arrFibonacciPoints = [];
	var cellWidth = myWidth * 7 / 100;
	var left = myWidth * 4.5 / 100;
	var top = cellWidth;
	var arrLineInfo = [
		{ x:8 * cellWidth + left, y:0 * cellWidth + top, radius: 8 * cellWidth, startAn: Math.PI, endAn: Math.PI/2},
		{ x:8 * cellWidth + left, y:3 * cellWidth + top, radius: 5 * cellWidth, startAn: Math.PI/2, endAn: 0},
		{ x:10 * cellWidth + left, y:3 * cellWidth + top, radius: 3 * cellWidth, startAn: 0, endAn: -Math.PI/2},
		{ x:10 * cellWidth + left, y:2 * cellWidth + top, radius: 2 * cellWidth, startAn: -Math.PI/2, endAn: -Math.PI},
		{ x:9 * cellWidth + left, y:2 * cellWidth + top, radius: 1 * cellWidth, startAn: Math.PI, endAn: 0}];
	for( i = 0; i < arrLineInfo.length; i ++){
		var LineInfo = arrLineInfo[i];
		var stepCount = LineInfo.radius / 5;
		var stepAn = ( LineInfo.endAn - LineInfo.startAn ) / stepCount;
		for( j = 0; j < stepCount; j++){
			var x = LineInfo.radius * Math.cos(LineInfo.startAn + j * stepAn) + LineInfo.x;
			var y = LineInfo.radius * Math.sin(LineInfo.startAn + j * stepAn) + LineInfo.y;
			// ctx.arc( LineInfo.x, LineInfo.y, LineInfo.radius, LineInfo.startAn + j * stepAn, LineInfo.startAn + ( j + 1 ) * stepAn, true);
			arrFibonacciPoints.push({x: x, y: y});
		}
	}
}

var particles = [];

var Particle = function(x, y) {

	this.x = x + random(-10, 10);
	this.y = y + random(-10, 10);
	this.vx = random(-2.5, 2.5);
	this.vy = random(-5, 5);
	this.radius = (random() > 0.75) ? random(25, 50) : 1 + random(1, 20);
	this.lifespan = random(25, 50);
	this.charge = this.lifespan;
	this.color = {
		r: round(random(255)),
		g: round(random(75)),
		b: round(random(50))
	};
}

Particle.prototype = {

	update: function() {
		this.charge--;
		this.radius--;
		this.x += this.vx;
		this.y += this.vy;
	},

	draw: function(ctx) {
		var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
		gradient.addColorStop(0, 'rgba(' + this.color.r + ', ' + this.color.g + ', ' + this.color.b + ', ' + this.opacity + ')');
		gradient.addColorStop(0.5, "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", " + this.opacity + ")");
		gradient.addColorStop(1, "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", 0)");

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, TWO_PI, false);
		ctx.fill();
	}
};
Sketch.create({
	center: {},
	setup: function() {
		
		this.resize();

		for (var i = 0; i < 70; i++) {
			particles.push(new Particle(this.center.x, this.center.y));
		}
	},

	resize: function() {
		this.position = 'absolute';
		this.top = 0;
		this.center.x = 50;
		this.center.y = 50;
	},

	draw: function() {
		if(isSecondTab == false || isResizing == true || arrFibonacciPoints.length <= 0){
			index = 0;
			isDrawed = false;
			return;
		}
		index++;
		if( index >= arrFibonacciPoints.length-1)
			index = arrFibonacciPoints.length-2;
		var indexFibLine = idLineMax > index ? idLineMax : index;
		idLineMax = indexFibLine;
		// if( index < arrFibonacciPoints.length - 2){
			// if( arrFibonacciPoints.length > 0){
				// if( arrFibonacciPoints.length <= index + 1){
				// 	dir = -1;
				// } 
				// if( index <= 0) {
				// 	dir = 1;
				// }
				// index += dir;
				particleCX = arrFibonacciPoints[index].x;
				particleCY = arrFibonacciPoints[index].y;
			// }
		
			this.globalCompositeOperation = "source-over";
			this.fillStyle = '#2B2B2B';
			this.fillRect(0, 0, this.width, this.height);
			this.globalCompositeOperation = "lighter";

			var arr = [];
			for( i = 1; i <= 4; i++){
				arr.push("who" + i);
			}
			jQuery.each( arr, function(i, val) {
				var top = $("#" + val).offset().top;
				var left = $("#" + val).offset().left;
				if( particleCY > top - 10 && particleCY < top + 40 && particleCX < left + 50){
					$("#" + val).addClass("particleOver");
					setTimeout(function(){
						$("#" + val).removeClass("particleOver");
					}, 500);
				}
			});

			var p, i = particles.length;
			var offLeft = 0;
			var offTop = 0;
			while (i--) {
				p = particles[i];
				p.opacity = round(p.charge / p.lifespan * 100) / 100;
				p.draw(this);
				p.update();
				if (p.charge < 0 || p.radius < 0) {
					particles[i] = new Particle( particleCX + offLeft, particleCY + offTop);
				}
			}
		// }
		var c = document.getElementById("sketch-0");
		var ctx = c.getContext("2d");
		ctx.strokeStyle = "#f00";
		ctx.beginPath();
		for( i = 0; i < indexFibLine - 1;i ++){
			ctx.moveTo(arrFibonacciPoints[i].x, arrFibonacciPoints[i].y);
			ctx.lineTo(arrFibonacciPoints[i+1].x, arrFibonacciPoints[i+1].y);
		}
		ctx.stroke();
	}
});
getFibonacciPoints();

$bezierData = MorphSVGPlugin.pathDataToBezier("#thePath", {align:"#emi"});

reSizeCanvas();
window.addEventListener('resize', reSizeCanvas);
function reSizeCanvas(){
	isResizing = true;
	console.log("reSizeCanvas");
	document.getElementById("sketch-0").style.width = $("#container2").width();
	document.getElementById("sketch-0").style.height = $("#container2").width() * 10 / 13;
	document.getElementById("sketch-0").width = $("#container2").width();
	document.getElementById("sketch-0").height = $("#container2").width() * 10 / 13;
	getFibonacciPoints();
	index = 0;
	idLineMax = 0;
	isResizing = false;
	drawFibonacciLine();
}
$("#canvasContainer").append($("#sketch-0"));
function drawFibonacciLine(){
	var c = document.getElementById("sketch-0");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.strokeStyle = "#f00";
	for( i = 0; i < arrFibonacciPoints.length - 1;i ++){
		ctx.moveTo(arrFibonacciPoints[i].x, arrFibonacciPoints[i].y);
		ctx.lineTo(arrFibonacciPoints[i+1].x, arrFibonacciPoints[i+1].y);
	}
	ctx.stroke();
	setInterval(function(){
		var c = document.getElementById("sketch-0");
		var ctx = c.getContext("2d");
		ctx.strokeStyle = "#f00";
		ctx.lineWidth = 2;
		var i = fibIndex; 
		fibIndex ++;
			if( arrFibonacciPoints.length <= i + 1){
				return;
			}
//		for( i = 0; i < arrPoints.length - 1; i ++){
			ctx.beginPath();
			ctx.moveTo(arrFibonacciPoints[i].x, arrFibonacciPoints[i].y);
			ctx.lineTo(arrFibonacciPoints[i+1].x, arrFibonacciPoints[i+1].y);
			ctx.stroke();
//		}
	}, 30);

}
