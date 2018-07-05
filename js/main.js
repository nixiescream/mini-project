var canvas = document.getElementById('starry-night');
var ctx = canvas.getContext('2d');

var x1;
var y1;
var x2;
var y2;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.scale(1,1);
ctx.imageSmoothingEnabled = false;

var stars = [];

function Star(x,y){
    this.x = x;
    this.y = y;
    this.outerRadius = Math.floor(Math.random()* (16 - 5)) + 5;
}

Star.prototype.drawStar = function(){
    var rot = Math.PI/2*3;
    var cx = this.x;
    var cy = this.y;
    var x = cx;
    var y = cy;
    var step = Math.PI/5;
    var outerRadius = this.outerRadius;
    var innerRadius = outerRadius/2;

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(cx,cy-outerRadius);

    for(var i = 0; i < 5; i++){
      x = cx+Math.cos(rot)*outerRadius;
      y = cy+Math.sin(rot)*outerRadius;
      ctx.lineTo(x,y);
      rot+=step;

      x = cx+Math.cos(rot)*innerRadius;
      y = cy+Math.sin(rot)*innerRadius;
      ctx.lineTo(x,y);
      rot+=step;
    }

    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle= 'yellow';
    ctx.stroke();
    ctx.fillStyle='yellow';
    ctx.fill();
}

Star.prototype.clearStar = function(){
    var rot = Math.PI/2*3;
    var cx = this.x;
    var cy = this.y;
    var outerRadius = this.outerRadius+2;
    var x = cx;
    var y = cy;
    var step=Math.PI/5;
    var innerRadius = outerRadius/2;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    ctx.beginPath();
    ctx.moveTo(cx,cy-outerRadius);

    for(var i = 0; i < 5; i++){
      x=cx+Math.cos(rot)*outerRadius;
      y=cy+Math.sin(rot)*outerRadius;
      ctx.lineTo(x,y);
      rot+=step;

      x = cx+Math.cos(rot)*innerRadius;
      y = cy+Math.sin(rot)*innerRadius;
      ctx.lineTo(x,y);
      rot+=step;
    }

    ctx.lineTo(cx,cy-outerRadius);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.restore();
}

function GetStartPoints() {
    x1 = event.clientX;
    y1 = event.clientY;
}

function GetEndPoints() {
    x2 = event.clientX;
    y2 = event.clientY;
}

canvas.onmousedown = function (event) {
    event = event || window.event;

    GetStartPoints();
};

canvas.onmouseup = function (event) {
    event = event || window.event;

    GetEndPoints();
    
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.stroke();

};

function getRandomStar(){
    var x = Math.floor(Math.random()*canvas.width);
    var y = Math.floor(Math.random()*canvas.height);
    var star = new Star(x, y);

    return star;
}

var randomStarsId = setInterval(function(){
    var star = getRandomStar();
    star.drawStar();
    console.log(star);
    stars.push(star);
}, 1000);

var clearStarsId = setInterval(function(){
    if(stars.length > 30){
        stars[0].clearStar();
        console.log(stars[0]);
        stars.shift();
    }
}, 1000);