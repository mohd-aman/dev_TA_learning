let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");

bold.addEventListener("click",function(e){
    setFontStyle("bold",bold);
});

italic.addEventListener("click",function(e){
    setFontStyle("italic",italic);
});

underline.addEventListener("click",function(e){
    setFontStyle("underline",underline);
})

left.addEventListener("click", function (e) {
    setTextAlignment("left", left);
  });
  center.addEventListener("click", function (e) {
    setTextAlignment("center", center);
  });
  right.addEventListener("click", function (e) {
    setTextAlignment("right", right);
  });
  
  function setTextAlignment(alignment, element) {
    if (element.classList.contains("active-font-style") || !lastSelectedCell ) {
      return;
    }
    // remove already set text align from menu ui !!
    document.querySelector(".font-alignments .active-font-style").classList.remove("active-font-style");
    // Menu UI pe changes
    element.classList.add("active-font-style");
    // Cells UI pe changes
    lastSelectedCell.style.textAlign = alignment;
    // db pe changes
    let { rowId, colId } = getRowIdColIdFromElement(lastSelectedCell);
    let cellObject = db[rowId][colId];
    cellObject.textAlign = alignment;
  }
  
function setFontStyle(styleName,element){
    if(lastSelectedCell){
        let{rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        if(cellObject.fontStyle[styleName]){
            if(styleName == "bold"){
                lastSelectedCell.style.fontWeight = "normal";
            }
            else if(styleName == "italic"){
                lastSelectedCell.style.fontStyle = "normal";
            }
            else{
                lastSelectedCell.style.textDecoration = "none";
            }
            element.classList.remove("active-font-style");
        }
        else{
            if(styleName == "bold"){
                lastSelectedCell.style.fontWeight = "bold";
              }
              else if(styleName == "italic"){
                lastSelectedCell.style.fontStyle = "italic";
              }
              else{
                lastSelectedCell.style.textDecoration = "underline"
              }
              element.classList.add("active-font-style");
        }
        cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
    }
}