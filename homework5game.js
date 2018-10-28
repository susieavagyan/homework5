const canvas=document.getElementById("canvas2");
const context=canvas.getContext('2d');
canvas.width=1330;
canvas.height=620;

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

const background= new Image();
background.src="https://c1.staticflickr.com/4/3915/15163393959_34cac27a11_b.jpg"; 
  
const bat= new Image ();
bat.src="http://images.clipartpanda.com/bat-20clip-20art-bat-1979px.png";
  
let batarray=[];
const createBats = function(count, canvasWidth, canvasHeight) {
	let index=0;
	while (index<count){
		batarray[index]={
			x:rand(canvasWidth-80),
			y:rand(canvasHeight-50),
			width:80,
			height:50,
			xDelta:1,
			yDelta:1,
            image: bat,
   			draw:function () {
   				context.drawImage (this.image,this.x, this.y, this.width, this.height)
    		},
   			update:function() {
   				if(this.x<=0 || this.x>=canvas.width-this.width) {
   					this.xDelta*=-1;
   					
   				}
   				if(this.y<=0 || this.y>=canvas.height-this.height) {
   					this.yDelta*=-1;
   					
   				}
   				this.x=this.xDelta+this.x;
				this.y=this.yDelta+this.y;
   			}	
    	}
    	    index++
              

    }
}
const winimg= new Image ();
winimg.src= "https://cdn.pixabay.com/photo/2016/10/22/01/48/happy-halloween-1759561_960_720.png";

const ghostimg= new Image();
ghostimg.src="https://www.pyd.org/wp-content/uploads/2014/10/Halloween_Ghost_with_Pumpkin_PNG_Picture.png";
  const ghost= {
    x:300,
    y:300,
    width:90,
    height:90,
    xDelta:0,
    yDelta:0,
    image: ghostimg,
    winner: winimg,
    draw: function() {
      context.drawImage(this.image,this.x,this.y,this.width,this.height)
    },
    update: function() {
    	if (this.x<=0 ){
    		this.xDelta=0;
    		this.xDelta=1;
    	} else if (this.x>=canvas.width-this.width) {
    	   context.clearRect (0,0, canvas.width,canvas.height)
         context.drawImage(this.winner,0,0,canvas.width,canvas.height)
    	}
    	if (this.y<=0 ){
    		this.yDelta=0
    		this.yDelta=1
    	} else if (this.y>=canvas.height-this.height) {
    		this.yDelta=0
    		this.yDelta=-1
    	}
      	this.x=this.xDelta+this.x;
		this.y=this.yDelta+this.y;
    }
  }
  
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function(event) {
	if(event.keyCode === rightKey) {
    ghost.xDelta = 3;
    }
      }, false);
document.addEventListener('keydown', function(event) {
	if(event.keyCode === leftKey) {
    ghost.xDelta = -3;
    }
      }, false);
document.addEventListener('keydown', function(event) {
	if(event.keyCode === upKey) {
    ghost.yDelta = -3;
    }
      }, false);
document.addEventListener('keydown', function(event) {
	if(event.keyCode === downKey) {
    ghost.yDelta = 3;
    }
      }, false);
 document.addEventListener('keyup', function(event) {
	ghost.xDelta= 0;
    ghost.yDelta = 0;
    
      }, false);
const draw=function () {
     context.drawImage(background,0,0,canvas.width,canvas.height)
     ghost.draw();
    
     for(let i=0; i<batarray.length; i++) {
	batarray[i].draw();
	}
}
 const update=function(){
    ghost.update();
 	for(let i=0; i<batarray.length; i++) {
	batarray[i].update()
	}
 }

//  const collision=function() {
//  	for (let i=0; i<batarray.length; i++) {
//  		if (ghost.x>= batarray[i].x+batarray[i].width || ghost.x+ghost.width===batarray[i].x){
//  				// alert("GAME OVER")
//  		}
//     if (ghost.y>= batarray[i].y+batarray[i].height || ghost.y+ghost.height===batarray[i].y){

//         // alert("GAME OVER")
//     }
//  	}
//  }

const collision= function (){
	for (let i=0; i<batarray.length; i++) {

	
			if(Math.abs((ghost.x+ghost.width/2)-(batarray[i].x+batarray[i].width/2))<= (ghost.width+batarray[i].width)/2 && Math.abs((ghost.y+ghost.height/2)-(batarray[i].y+batarray[i].height/2))<= (ghost.height+batarray[i].height)/2)
			 {
			alert ("GAME OVER");
			ghost.x=300;
			ghost.y=300;
			ghost.xDelta = 0;
			ghost.yDelta = 0;
         	createBats (10, canvas.width, canvas.height)

		}
	}
}

 

 const loop=function() {
   
	draw();
	collision(); 
    update(); 
 	requestAnimationFrame (loop)
 }
 loop();
  
  createBats (10, canvas.width, canvas.height)