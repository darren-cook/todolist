function disableDisableables() {
    const disableables = document.querySelectorAll(".disableable");

    disableables.forEach(disableable =>(
        disableable.classList.add("disabled")
    ))
}

function enableDisableables() {
    const disableables = document.querySelectorAll(".disableable");

    disableables.forEach(disableable =>(
        disableable.classList.remove("disabled")
    ))
}

function displayVerifyWindow(itemToVerify) {
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
    warningItem.textContent = `Delete - ${itemToVerify.firstChild.textContent}`;
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

export { disableDisableables, enableDisableables, displayVerifyWindow, removeVerifyWindow }