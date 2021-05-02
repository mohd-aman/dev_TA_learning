let filterCodes = {
    "red":"#e74c3c",
    "blue":"#3498db",
    "green":"#2ecc71",
    "black":"#34495e"
}
let selectedFilter = "black";
let allFilters = document.querySelectorAll('.ticket-filter div')
// console.log(allFilters);
let ticketContainer = document.querySelector('.tickets-container');
let openModalBtn = document.querySelector('.open-modal');
let closeModalBtn = document.querySelector(".close-modal");

openModalBtn.addEventListener("click",handleModalBtn);

closeModalBtn.addEventListener("click",handleCloseModal);

function handleModalBtn(e){
    let modal = document.querySelector('.modal');
    if(modal){
        return;
    }
    else{
        let modalDiv = createModal();
        modalDiv.querySelector(".modal-textbox").addEventListener("click",clearModalTextBox);
        ticketContainer.append(modalDiv);
        modalDiv.querySelector(".modal-textbox").addEventListener("keypress",addTickets);
        let allModalFilters = modalDiv.querySelectorAll(".modal-filter");
        for(let i=0;i<allModalFilters.length;i++){
            allModalFilters[i].addEventListener("click",chooseModalFilter);
        }
        ticketContainer.append(modalDiv);
    }
}

function createModal(){
    let modalDiv = document.createElement('div');
        modalDiv.classList.add('modal');
        modalDiv.innerHTML = `<div class="modal-textbox" data-typed="false" contenteditable="true">
        Enter your task here
       </div>
      <div class="modal-filter-options">
        <div class="modal-filter red"></div>
        <div class="modal-filter blue"></div>
        <div class="modal-filter green"></div>
        <div class="modal-filter black active-filter"></div>
      </div>`;
      return modalDiv;
}

function chooseModalFilter(e){
    let selectedModalFilter = e.target.classList[1];
    if(selectedModalFilter == selectedFilter){
        return;
    }
    selectedFilter = selectedModalFilter;
    document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
    e.target.classList.add("active-filter");
}

function addTickets(e){
    if(e.key == 'Enter'){
        let modalText = e.target.textContent;
        let ticketId = uid();
        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");
        ticketDiv.innerHTML = ` <div class="ticket-filter ${selectedFilter}"></div>
        <div class="ticket-id">#${ticketId}</div>
        <div class="ticket-content">${modalText}</div>`;
        ticketContainer.append(ticketDiv);
        e.target.parentNode.remove();

        if(!localStorage.getItem('allTickets')){
            let allTickets = [];
            let ticketObject = {};
            ticketObject.ticketId = ticketId;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = modalText;
            allTickets.push(ticketObject);
            localStorage.setItem("allTickets",JSON.stringify(allTickets));
        }
        else{
            let allTickets = JSON.parse(localStorage.getItem("allTickets"));
            let ticketObject = {};
            ticketObject.ticketId = ticketId;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = modalText;
            allTickets.push(ticketObject);
      
            localStorage.setItem("allTickets" , JSON.stringify(allTickets));
        }

        selectedFilter = "black";
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
    if(e.target.classList.contains("active-filters")){
        e.target.classList.remove("active-filters");
        loadTickets();
        return;
    }
    if(document.querySelector(".filter.active-filter")){
        document.querySelector(".filter.active-filter").classList.remove("active-filter");
      }
      e.target.classList.add("active-filter");
      let ticketFilter = e.target.classList[1];
      loadSelectedTickets(ticketFilter);
}

function loadSelectedTickets(ticketFilter){
    if(localStorage.getItem("allTickets")){
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets = allTickets.filter(function(filterObject){
            return filterObject.ticketFilter == ticketFilter;
        });
        ticketContainer.innerHTML = "";
        for(let i=0;i<filteredTickets.length;i++){
            let {ticketId , ticketFilter , ticketContent} = filteredTickets[i]; 
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML = ` <div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-content">${ticketContent}</div>`;
            ticketContainer.append(ticketDiv);
        }
    }
}

function loadTickets(){
    if(localStorage.getItem("allTickets")){
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        for(let i=0;i<allTickets.length;i++){
            let {ticketId,ticketFilter,ticketContent} = allTickets[i];
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML = `<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-content">${ticketContent}</div>`;
            ticketContainer.append(ticketDiv);
        }
    }
}

loadTickets();