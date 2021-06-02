let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let photoButton = document.querySelector("#capture-photo");
let zoomIn = document.querySelector("#in");
let zoomOut = document.querySelector("#out");
let recordingState = false;
let constraints = {video:true};
let recordedData;
let mediaRecorder;

let maxZoom = 3;
let minZoom = 1;
let currZoom = 1;

(async function(){
try{
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    // console.log(mediaStream);
    videoPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstart = function(e){
        console.log("Inside on start");
        console.log(e);
    }
    mediaRecorder.ondataavailable = function(e){
        console.log("Inside on data availble");
        console.log(e);
        recordedData = e.data;
        saveVideoToFs();
    }

    mediaRecorder.onstop = function(e){
        console.log("Inside on stop");
        console.log(e);
    }

    // console.log(mediaRecorder);

    recordButton.addEventListener("click",function(){
        if(recordingState){
            mediaRecorder.stop();
            recordButton.querySelector("div").classList.remove("record-animate");
        }
        else{
            mediaRecorder.start();
            recordButton.querySelector("div").classList.add("record-animate");
        }
        recordingState = !recordingState;
    })

    photoButton.addEventListener("click",capturePhotos);

    zoomIn.addEventListener("click",function(){
        if(currZoom+0.1<=maxZoom){
            currZoom+=0.1;
            videoPlayer.style.transform = `scale(${currZoom})`;
        }
    });

    zoomOut.addEventListener("click",function(){
        if(currZoom-0.1>=minZoom){
            currZoom-=0.1;
            videoPlayer.style.transform = `scale(${currZoom})`;
        }
    });


}
    catch(error){
        console.log(error);
    }
})();

function saveVideoToFs(){
    console.log("Saving Video");
    let videoUrl = URL.createObjectURL(recordedData);
    console.log(videoUrl);
    let aTag = document.createElement("a");
    aTag.download = "video.mp4";
    aTag.href = videoUrl;
    aTag.click();
    aTag.remove();
}

function capturePhotos(){
    photoButton.querySelector("div").classList.add("capture-animate");
    setTimeout(function(){
        photoButton.querySelector("div").classList.remove("capture-animate");
    },1000);
    let canvas = document.createElement("canvas");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
    let ctx = canvas.getContext("2d");

    if(currZoom!=1){
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(currZoom,currZoom);
        ctx.translate(-canvas.width/2,-canvas.height/2);
    }
    ctx.drawImage(videoPlayer,0,0);
    let imageUrl = canvas.toDataURL("image/url");
    let aTag = document.createElement("a");
    aTag.download = "photo.jpg";
    aTag.href = imageUrl;
    aTag.click();
}