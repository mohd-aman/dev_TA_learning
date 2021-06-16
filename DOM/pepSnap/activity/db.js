let db;

let dbOpenRequest = indexedDB.open("Gallery");

dbOpenRequest.onupgradeneeded = function(e){
    db = e.target.result;
    db.createObjectStore("Media",{keyPath:"mid"});
}

dbOpenRequest.onsuccess = function(e){
    db = e.target.result;
}
