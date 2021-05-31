let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

cellsContentDiv.addEventListener("scroll",function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;

    topRow.style.top = top+"px";
    topLeftCell.style.top = top+"px";
    topLeftCell.style.left = left+"px";
    leftCol.style.left = left+"px";
})

let rowId;
let colId;

for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(e){
        
        if(lastSelectedCell){
            lastSelectedCell.classList.remove("active-cell");
            document.querySelector(`div[trid="${colId}"]`).classList.remove("cell-selected");
            document.querySelector(`div[lcid="${rowId}"]`).classList.remove("cell-selected");
        }
        rowId = Number(e.target.getAttribute("rowid"));
        colId = Number(e.target.getAttribute("colid"));
        e.target.classList.add("active-cell");
        document.querySelector(`div[trid="${colId}"]`).classList.add("cell-selected");
        document.querySelector(`div[lcid="${rowId}"]`).classList.add("cell-selected");
        
        let cellObject = db[rowId][colId];
        let address = String.fromCharCode(65+colId)+(rowId+1)+"";
        addressInput.value = address;
        formulaInput.value = cellObject.formula;


        cellObject.fontStyle.bold
        ?document.querySelector(".bold").classList.add("avtive-font-style"):
        document.querySelector(".bold").classList.remove("active-font-style");

        cellObject.fontStyle.italic
      ? document.querySelector(".italic").classList.add("active-font-style")
      : document.querySelector(".italic").classList.remove("active-font-style");

      cellObject.fontStyle.underline
      ? document.querySelector(".underline").classList.add("active-font-style")
      : document.querySelector(".underline").classList.remove("active-font-style");

      if(lastSelectedCell){
        document.querySelector(".font-alignments .active-font-style").classList.remove("active-font-style");
      }
      // 2. set active text align for the selected cell
     let textAlignment = cellObject.textAlign;
     document.querySelector(`.${textAlignment}`).classList.add("active-font-style");
    })
    
    allCells[i].addEventListener("blur",function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        // let rowId = e.target.getAttribute("rowid");
        // let colId = e.target.getAttribute("colid");
        let cellObject = db[rowId][colId];
        if(cellObject.value == cellValue){
            return;
        }
        if(cellObject.formula){
            removeFormula(cellObject);
            formulaInput.value ="";
        }
        cellObject.value = cellValue;
        // console.log("After update",cellObject)

        updateChildrens(cellObject);
        // console.log(sheetsDB);
        if(cellObject.visited){
            return;
        }
        cellObject.visited = true;
        visitedCells.push({rowId:rowId,colId:colId});
    })

    allCells[i].addEventListener("keydown",function(e){
        if(e.key == 'Backspace'){
            let cell = e.target;
            let {rowId,colId} = getRowIdColIdFromElement(cell);
            let cellObject = db[rowId][colId];
            if(cellObject.formula){
                cellObject.formula = "";
                formulaInput.value = "";
                removeFormula(cellObject);
                cell.textContent = "";
            }
        }
    })
}



formulaInput.addEventListener("blur",function(e){
    let formula = e.target.value;
    if(formula){
        let {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        if(cellObject.formula){
            removeFormula(cellObject);
        }
        let computedValue = solveFormula(formula,cellObject);
        cellObject.formula = formula;
        //cellObject update
        cellObject.value = computedValue;
        //ui update
        lastSelectedCell.textContent = computedValue;
        updateChildrens(cellObject);

        if(cellObject.visited){
            return;
        }
        cellObject.visited = true;
        visitedCells.push({rowId:rowId,colId:colId});
    }
})