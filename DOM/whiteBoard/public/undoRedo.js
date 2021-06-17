let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

undo.addEventListener("click",undoLine);
redo.addEventListener("click",redoLine);

function undoLine(){
    let redoLine = db.pop();
    redoDb.push(redoLine);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    redrawLine();
}

function redrawLine(){
    ctx.lineCap = 'round';
    for(let i=0;i<db.length;i++){
        let line = db[i];
        for(let j=0;j<line.length;j++){
            let pointObject = line[j];
            if(pointObject.type == "md"){
                ctx.strokeStyle = pointObject.color;
                ctx.lineWidth = pointObject.width;
                ctx.beginPath();
                ctx.moveTo(pointObject.x,pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x,pointObject.y);
                ctx.stroke();
            }
        }
    }
}

function redoLine(){
    if(redoDb.length){
        let line = redoDb.pop();
        for(let j=0;j<line.length;j++){
            let pointObject = line[j];
            if(pointObject.type == "md"){
                ctx.strokeStyle = pointObject.color;
                ctx.lineWidth = pointObject.width;
                ctx.beginPath();
                ctx.moveTo(pointObject.x,pointObject.y);
            }
            else{
                ctx.lineTo(pointObject.x,pointObject.y);
                ctx.stroke();
            }
        }
        db.push(line);
    }
}