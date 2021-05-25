function solveFormula(formula){
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
            formula = formula.replace(formulaComp,value);
        }
    }
    //Stack infix evaluation 
    let computedValue = eval(formula);
    return computedValue;
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