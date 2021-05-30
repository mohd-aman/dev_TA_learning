let addSheetBtn = document.querySelector(".add-sheet");
let sheetList = document.querySelector(".sheets-list");
let sheetId = 0;

addSheetBtn.addEventListener("click",function(e){
    sheetId++;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    let sheetDiv = document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sheetid",sheetId);
    sheetDiv.innerHTML = `Sheet ${sheetId+1}`;
    sheetList.append(sheetDiv);
});

sheetList.addEventListener("click",function(e){
    let selectedSheet = e.target;
    if(selectedSheet.classList.contains("active-sheet")){
        return;
    }
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    selectedSheet.classList.add("active-sheet");
})