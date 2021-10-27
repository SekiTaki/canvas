window.addEventListener('load',() =>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    //Resizing
    canvas.height = 500;
    canvas.width = window.innerWidth;

    /*--
    ctx.strokeStyle = "red";
    ctx.lineWdith = 5 ;
    ctx.strokeRect(100,100,200,500);
    ctx.strokeStyle = "blue";
    ctx.lineWdith = 5 ;
    ctx.strokeRect(200,200,200,500);
    --*/

    /*--
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,100);
    ctx.lineTo(200,150);
    ctx.closePath();
    ctx.stroke();
    --*/

    //variables
    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e);
    }
    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        if(!painting)return;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        //ctx.strokeStyle = "red";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    //Eventlisteners
    canvas.addEventListener("mousedown" , startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

});
const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
let start_background_color ="white";
function clear_canvas(){
    ctx.fillStyle = start_background_color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}