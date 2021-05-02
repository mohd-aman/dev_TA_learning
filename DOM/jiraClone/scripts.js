let filterCodes = {
    "red":"#e74c3c",
    "blue":"#3498db",
    "green":"#2ecc71",
    "black":"#34495e"
}

let allFilters = document.querySelectorAll('.ticket-filter div')
// console.log(allFilters);
let ticketContainer = document.querySelector('.tickets-container');
let openModalBtn = document.querySelector('.open-modal');


openModalBtn.addEventListener("click",handleModalBtn);

function handleModalBtn(e){
    let modal = document.querySelector('.modal');
    if(modal){
        return;
    }
    else{
        let modalDiv = document.createElement('div');
        modalDiv.classList.add('modal');
        modalDiv.innerHTML = `<div class="modal-textbox" data-typed="false" contenteditable="true">
        Enter your task here
       </div>
      <div class="modal-filter-options">
        <div class="modal-filter red"></div>
        <div class="modal-filter blue"></div>
        <div class="modal-filter green"></div>
        <div class="modal-filter black"></div>
      </div>`;
      modalDiv.querySelector(".modal-textbox").addEventListener("click",clearModalTextBox);
      ticketContainer.append(modalDiv);
    }
}

function clearModalTextBox(e){
    if(e.target.getAttribute("data-typed") == "true"){
        return;
    }
    e.target.innerHTML = "";
    e.target.setAttribute("data-typed","true");
}

for(let i=0;i<allFilters.length;i++){
    allFilters[i].addEventListener("click",chooseFilter);
}

function chooseFilter(e){
    let filter = e.target.classList[1];
    let filterCode = filterCodes[filter];
    ticketContainer.style.background = filterCode;
}