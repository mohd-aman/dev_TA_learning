const { create } = require("domain");
const { IncomingMessage } = require("http");

function showMedia(){
    let txn = db.transaction("Media","readonly");
    let mediaStore = txn.objectStore("Media");
    let cursorObject = mediaStore.openCursor();

    cursorObject.onsuccess = function(e){
        let cursor = cursorObject.result;
        if(cursor){
            let media = cursor.value;
            console.log(media);
            if(media.mediaType == "image"){
                appendImage(media);
            }
            else{
                appendVideo(media);
            }
            cursor.continue();
        }
    };
}

let iv = setInterval(function(){
    if(db){
        showMedia();
        clearInterval(iv);
    }
},100);

let gallery = document.querySelector(".gallery");

function createMediaDiv(){
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("gallery-item");
    mediaDiv.innerHTML=`
            <div class="media">
                <img src="" alt="">
            </div>
            <div class="media-button">
                <div class="download"> <i class="fas fa-download"></i> </div>
                <div class="delete"> <i class="fas fa-trash"></i> </div>
            </div>`
    return mediaDiv;
}

function appendImage(media){
    let mediaDiv = createMediaDiv();
    mediaDiv.setAttribute("mid",media.mid);
    let image = document.createElement("img");
    image.src = media.mediaSource;
    mediaDiv.querySelector(".media").append(image);
    gallery.append(mediaDiv);
}

function appendVideo(media){
    let mediaDiv = createMediaDiv();
    mediaDiv.setAttribute("mid",media.mid);

    let video = document.createElement("video");
    let source = document.createElement("source");
    source.src = media.mediaSource;
    video.append(source);
    video.autoplay = "true";
    video.loop = "true";
    mediaDiv.querySelector(".media").append(video);
    gallery.append(mediaDiv);
}