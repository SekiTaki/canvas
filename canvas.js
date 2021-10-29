window.addEventListener('load',() =>{
    
});
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

    //Resizing
    canvas.height = 550;
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
    let start_background_color ="white";
    ctx.strokeStyle = "black";
    let restore_array =[];
    let index = -1;

    function startPosition(e){
        painting = true;
        draw(e);
    }
    function finishedPosition(e){
        painting = false;
        ctx.beginPath();
        e.preventDefault();
        if(e.type !='mouseout'){
            restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            index += 1;
        }
    }

    function draw(e){
        if(!painting)return;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        //ctx.strokeStyle = "black";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        e.preventDefault();
    }
    function clear_canvas(){
        ctx.fillStyle = start_background_color;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        restore_array = [];
        index = -1;
    }
    
    function change_color(element){
        ctx.strokeStyle = element.style.background;
    }

    function undo_canvas(){
        if (index <= 0){
            clear_canvas();
        } else{
            index -= 1;
            restore_array.pop();
            ctx.putImageData(restore_array[index],0,0);
        }
    }

    function erase(){
        ctx.globalCompositeOperation = 'destination-out';
    }

    function pen(){
        ctx.globalCompositeOperation="source-over";
    }

    //Eventlisteners
    canvas.addEventListener("mousedown" , startPosition);
    canvas.addEventListener("touchstart" , startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("touchmove", finishedPosition);
    canvas.addEventListener("mousemove", draw);

    $("#eraser").click(function(){ mode="eraser"; });
