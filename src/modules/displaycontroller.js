function disableDisableables() {
    const disableables = document.querySelectorAll(".disableable");
    disableables.forEach(disableable=>{
        disableable.classList.add("disabled")
    })

    const createButtons = document.querySelectorAll(".createbutton");
    createButtons.forEach(createButton=>{
        createButton.classList.add("hidden");
    })
}

function enableDisableables() {
    const disableables = document.querySelectorAll(".disableable");
    disableables.forEach(disableable =>(
        disableable.classList.remove("disabled")
    ))

    const createButtons = document.querySelectorAll(".createbutton");
    createButtons.forEach(createButton=>{
        createButton.classList.remove("hidden");
    })
}

function displayVerifyWindow(elementToVerifyTitle) {
    const bodyContainer = document.querySelector("#body");
    const sideBarContainer = document.querySelector("#sidebar");
    bodyContainer.style.filter = "blur(3px)";
    sideBarContainer.style.filter = "blur(3px)";


    const content = document.querySelector("#content");
    const body = document.querySelector("#body");

    const verifyDeleteContainer = document.createElement("div");
    verifyDeleteContainer.setAttribute("id","verifydeletecontainer");

    const verifyDelete = document.createElement("div");
    verifyDelete.setAttribute("id","verifydelete");

    const verifyDeleteTop = document.createElement("div");
    verifyDeleteTop.setAttribute("id","verifydeletetop");

    const warningIcon = document.createElement("img");
    warningIcon.setAttribute("id","warningicon");
    warningIcon.setAttribute("src","./images/alert.png");
    warningIcon.setAttribute("alt","Warning Icon");
    const warningItem = document.createElement("h3");
    warningItem.setAttribute("id","warningitem");
    warningItem.textContent = `Delete - ${elementToVerifyTitle}`;
    const warningMessage = document.createElement("p");
    warningMessage.setAttribute("id","warningmessage");
    warningMessage.textContent = "This action cannot be undone.";
    
    verifyDeleteTop.appendChild(warningIcon);
    verifyDeleteTop.appendChild(warningItem);
    verifyDeleteTop.appendChild(warningMessage);

    const verifyDeleteBottom = document.createElement("div");
    verifyDeleteBottom.setAttribute("id","verifydeletebottom");

    const cancelButton = document.createElement("button");
    cancelButton.setAttribute("id","cancelbutton");
    cancelButton.classList.add("verifydeletebutton");
    cancelButton.textContent = "CANCEL";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id","deletebutton");
    deleteButton.classList.add("verifydeletebutton");
    deleteButton.textContent = "DELETE";

    verifyDeleteBottom.appendChild(cancelButton);
    verifyDeleteBottom.appendChild(deleteButton);

    verifyDelete.appendChild(verifyDeleteTop);
    verifyDelete.appendChild(verifyDeleteBottom);
    verifyDeleteContainer.appendChild(verifyDelete);

    content.appendChild(verifyDeleteContainer)
}

function removeVerifyWindow(){
    const bodyContainer = document.querySelector("#body");
    const sideBarContainer = document.querySelector("#sidebar");
    bodyContainer.style.filter = "none";
    sideBarContainer.style.filter = "none";
    
    const verifyWindow = document.querySelector("#verifydeletecontainer");
    verifyWindow.remove();
}

function changeSortDirection(sortButtonElement){
    const oldSortDirection = sortButtonElement.dataset.direction;
    const oldSortedElement = document.querySelector(".sorted");

    if(oldSortDirection==("none")){
        sortButtonElement.dataset.direction = "ascending";
        sortButtonElement.setAttribute("src","./images/sort-reverse-variant.png");
        sortButtonElement.setAttribute("alt","Sort Titles Ascending");
        sortButtonElement.classList.add("sorted");
    } else if(oldSortDirection=="ascending") {
        sortButtonElement.dataset.direction = "descending";
        sortButtonElement.setAttribute("src","./images/sort-variant.png");
        sortButtonElement.setAttribute("alt","Sort Titles Descending");
    } else {
        sortButtonElement.dataset.direction = "ascending";
        sortButtonElement.setAttribute("src","./images/sort-reverse-variant.png");
        sortButtonElement.setAttribute("alt","Sort Titles Ascending");
    }

    if(oldSortedElement!=null){
        if(oldSortedElement!=sortButtonElement){
            oldSortedElement.dataset.direction = "none";
            oldSortedElement.setAttribute("src","./images/sort.png");
            oldSortedElement.setAttribute("alt","Sort Titles Ascending");
            oldSortedElement.classList.remove("sorted");
        }
    }
}

export { disableDisableables, enableDisableables, displayVerifyWindow, removeVerifyWindow, changeSortDirection }