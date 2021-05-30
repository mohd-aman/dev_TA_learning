function solveFormula(formula,selfCellObject){
    let formulaComps = formula.split(" ");
    for(let i=0;i<formulaComps.length;i++){
        let formulaComp = formulaComps[i];
        console.log(formulaComp);
        if(formulaComp[0]>="A" && formulaComp[0]<="Z"){
            let {rowId,colId} = getRowIdColIdFromAddress(formulaComp);
            console.log(rowId);
            console.log(colId);
            let cellObject  = db[rowId][colId];
            let value = cellObject.value;
            if(selfCellObject){
                cellObject.childrens.push(selfCellObject.name);
            }
            formula = formula.replace(formulaComp,value);
        }
    }
    //Stack infix evaluation 
    let computedValue = eval(formula);
    return computedValue;
}

function updateChildrens(cellObject){
    for(let i=0;i<cellObject.childrens.length;i++){
        let childName = cellObject.childrens[i];
        let {rowId,colId} = getRowIdColIdFromAddress(childName);
        let childCellObject = db[rowId][colId];
        let newValue = solveFormula(childCellObject.formula);
        document.querySelector(`div[rowid='${rowId}'][colid='${colId}`).textContent = newValue;
        childCellObject.value = newValue;
        updateChildrens(childCellObject); 
    }
}

function removeFormula(cellObject){
    cellObject.formula="";
    for(let i=0;i<cellObject.parents.length;i++){
        let parentName = cellObject.parents[i];
        let {rowId,colId} = getRowIdColIdFromAddress(parentName);
        let parentCellObject = db[rowId][colId];
        let updatedChildrens = parentCellObject.childrens.filter(function(children){
            return children!=cellObject.name;
        })
        parentCellObject.childrens = updatedChildrens;
    }
    cellObject.parents = [];
}

function getRowIdColIdFromElement(element){
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return{
        rowId,colId
    }
}

function getRowIdColIdFromAddress(address){
    let rowId = Number(address.substring(1))-1;
    let colId = address.charCodeAt(0)-65;
    return{
        rowId,colId
    }
}