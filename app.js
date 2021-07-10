const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const fill = document.getElementById("jsFill");
const brush = document.getElementById("jsBrushSize");

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = 'black';
ctx.lineWidth = 2;

let isPainting = false;
let isFill = false;
let x = 0;
let y = 0;


function stopPainting() {
    isPainting = false;
    console.log('stop')

}

function startPainting(event) {
    isPainting = true;
    console.log('start');
    if (isFill) {
        ctx.fillStyle=ctx.strokeStyle;
        ctx.rect(0, 0, 500, 500);
        ctx.fill();
        isFill=false;     
    }
}

function onMouseMove(event) {
   if (!isFill){ 
    drawLine2(ctx, x, y, event.offsetX, event.offsetY); //  drawLine(ctx,x,y);
    x = event.offsetX;
    y = event.offsetY;
   } 

}


// function drawLine(ctx,x,y) {
//     if (!isPainting){
    
//         ctx.beginPath();
//         ctx.moveTo(x,y);}
//     else{
//             ctx.lineTo(x,y);
//             ctx.stroke();
//         }
//     }

function drawLine2(ctx, x1, y1, x2, y2) {
    if (isPainting) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
    }
}

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
}


function handleFillClick(event) {
    isFill = true;
}

function handleChangeBrush(){
    ctx.lineWidth = 2 + (brush.value-1)/10*5;
    console.log(ctx.lineWidth);

}

canvas.addEventListener('mousedown',startPainting);
window.addEventListener('mouseup',stopPainting);
canvas.addEventListener("mousemove",onMouseMove); 
canvas.addEventListener('mouseleave',stopPainting);

Array.from(colors).forEach(function (element) {
    element.addEventListener("click",handleColorClick); 
});

fill.addEventListener("click",handleFillClick);
brush.addEventListener("input",handleChangeBrush)
