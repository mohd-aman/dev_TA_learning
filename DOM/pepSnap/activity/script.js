let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let photoButton = document.querySelector("#capture-photo");
let recordingState = false;
let constraints = {video:true};
let recordedData;
let mediaRecorder;

(async function(){
try{
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    // console.log(mediaStream);
    videoPlayer.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstop = function(e){
        console.log("Inside on stop");
    }
    mediaRecorder.onstart = function(e){
        console.log("Inside on start");
    }
    mediaRecorder.ondataavailable = function(e){
        console.log("Inside on data availble");
        recordedData = e.data;
        saveVideoToFs();
    }
    // console.log(mediaRecorder);

    recordButton.addEventListener("click",function(){
        if(recordingState){
            mediaRecorder.stop();
            recordButton.innerHTML = "Record";
        }
        else{
            mediaRecorder.start();
            recordButton.innerHTML = "Recording";
        }
        recordingState = !recordingState;
    })
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