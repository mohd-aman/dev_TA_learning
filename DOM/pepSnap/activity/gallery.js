function showMedia(){
    let txn = db.transaction("Media","readonly");
    let mediaStore = txn.objectStore("Media");
    let cursorObject = mediaStore.openCursor();

    cursorObject.onsuccess = function(e){
        let cursor = cursorObject.result;
        if(cursor){
            console.log(cursor.value);
            cursor.continue();
        }
    }
}

let iv = setInterval(function(){
    if(db){
        showMedia();
        clearInterval(iv);
    }
},100);