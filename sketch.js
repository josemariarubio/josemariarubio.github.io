let rot1;
let rot2;

let labels1 = ["Bio","Contact","Portafolio"];
let labels2 = ["Apresto","Lab","XDXTXRXXL","Archivo"];

let dragging=false;
let activeRing=0;
let prevMouseX=0;

let sello;

let contentDB={};

function preload(){

sello = loadImage("sello.png");

}

function setup(){

createCanvas(windowWidth,windowHeight);

textAlign(CENTER,CENTER);

rot1=0;

let step2=TWO_PI/labels2.length;
rot2=step2*3;

contentDB["Bio|Archivo"]={
type:"image",
value:sello
};

}

function draw(){

background(220);

let cx=width/2;
let cy=height/2;

drawRing(cx,cy,150,220,labels1,rot1);
drawRing(cx,cy,220,300,labels2,rot2);

fill(240);
stroke(0);
circle(cx,cy,140);

drawPointer(cx,cy);

let idx1=getIndex(rot1,labels1.length);
let idx2=getIndex(rot2,labels2.length);

let a=labels1[idx1];
let b=labels2[idx2];

textSize(24);
fill(0);
noStroke();

text(a+" + "+b,cx,50);

drawContent(a,b,cx,cy);

}

function drawContent(a,b,cx,cy){

let key=a+"|"+b;

let item=contentDB[key];

if(!item){

fill(0);
textSize(14);
text(" ",cx,cy);
return;

}

if(item.type=="image"){

imageMode(CENTER);
image(item.value,cx,cy,120,120);

}

}

function drawRing(cx,cy,rInner,rOuter,labels,rot){

let n=labels.length;
let step=TWO_PI/n;

push();

translate(cx,cy);
rotate(rot);

stroke(0);
noFill();

circle(0,0,rOuter*2);
circle(0,0,rInner*2);

for(let i=0;i<n;i++){

let a=i*step;

line(
rInner*cos(a),
rInner*sin(a),
rOuter*cos(a),
rOuter*sin(a)
);

let mid=a+step/2;

let rText=(rInner+rOuter)/2;

let x=rText*cos(mid);
let y=rText*sin(mid);

push();

translate(x,y);
rotate(mid+HALF_PI);

noStroke();
fill(0);

text(labels[i],0,0);

pop();

}

pop();

}

function drawPointer(cx,cy){

push();

translate(cx,cy);

fill(0);
noStroke();

triangle(
0,-320,
-12,-290,
12,-290
);

pop();

}

function getIndex(rot,n){

let step=TWO_PI/n;

let r=(rot%TWO_PI+TWO_PI)%TWO_PI;

return floor(r/step);

}

function mousePressed(){

let cx=width/2;
let cy=height/2;

let d=dist(mouseX,mouseY,cx,cy);

if(d>150 && d<220){
activeRing=1;
dragging=true;
}

if(d>220 && d<300){
activeRing=2;
dragging=true;
}

prevMouseX=mouseX;

}

function mouseDragged(){

if(dragging){

let delta=mouseX-prevMouseX;

if(activeRing==1){
rot1+=delta*0.01;
}

if(activeRing==2){
rot2+=delta*0.01;
}

prevMouseX=mouseX;

}

}

function mouseReleased(){

dragging=false;

snap();

}

function snap(){

let step1=TWO_PI/labels1.length;
let step2=TWO_PI/labels2.length;

rot1=round(rot1/step1)*step1;
rot2=round(rot2/step2)*step2;

}

function windowResized(){

resizeCanvas(windowWidth,windowHeight);

}
