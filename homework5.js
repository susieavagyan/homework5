const canvas1=document.getElementById("canvas1");
const context1=canvas1.getContext('2d');
canvas1.width=1330;
canvas1.height=630;

const colorArray=["red","blue","green","pink", "purple", "coral","lawngreen","fuchsia","yellow"];
const rand1 = function(num) {
  return Math.floor(Math.random() * num) + 1;
};
let objarray=[];
const createBoxes = function(count, canvasWidth, canvasHeight) {
	let index=0;
	while (index<count){
		objarray[index]={
			x:rand1(canvasWidth-50),
			y:rand1(canvasHeight-50),
			width:50,
			height:50,
			xDelta:rand1(count),
			yDelta:rand1(count),
			color: colorArray[rand1(colorArray.length)-1],
   			draw:function () {
   				context1.fillStyle=this.color;
    			context1.fillRect (this.x,this.y, this.width, this.height);
    		},
   			update:function() {
   			 	if(this.x<=0 || this.x>=canvas1.width-this.width) {
   					this.xDelta*=-1;
   					 this.color= colorArray[rand1(colorArray.length)-1];
   				}
   				if(this.y<=0 || this.y>=canvas1.height-this.height) {
   					this.yDelta*=-1;
   					this.color=colorArray[rand1(colorArray.length)-1]; 
   				}
   				this.x=this.xDelta+this.x;
				this.y=this.yDelta+this.y;
   			}	
    	}
    	    index++

    }
}

//2
const draw1=function () {
     context1.fillStyle='black';
     context1.fillRect(0,0, canvas1.width, canvas1.height);
     for(let i=0; i<objarray.length; i++) {
	objarray[i].draw();
	}
}
 const update1=function(){
 	for(let i=0; i<objarray.length; i++) {
	objarray[i].update()
	}
 }
const animate = function() {
	draw1();
	update1();
	requestAnimationFrame(animate)	
};
animate();
createBoxes (10, canvas1.width, canvas1.height);



