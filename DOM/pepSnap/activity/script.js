let videoPlayer = document.querySelector("video");
let constraints = {video:true};

(async function(){

    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(mediaStream);
    videoPlayer.srcObject = mediaStream;
})();