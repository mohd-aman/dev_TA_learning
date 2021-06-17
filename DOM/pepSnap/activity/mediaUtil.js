let showMediaBtn = document.querySelector("#gallery-btn");

showMediaBtn.addEventListener("click",function(){
    window.location.assign("gallery.html");
})

function saveMedia(mediaType,mediaSource){
    let txn = db.transaction("Media","readwrite");
    let mediaStore = txn.objectStore("Media");
    let mediaFile = {
        mid:Date.now(),
        mediaType,
        mediaSource
    }
    mediaStore.add(mediaFile);
}