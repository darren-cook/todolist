import { disableDisableables, enableDisableables, displayVerifyWindow, removeVerifyWindow } from "./displaycontroller";
import { changeBody } from "./body";
import { addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage, checkUniqueMenuTitle } from "./localstorage";

function changeMenu(newMenuElement){
    const oldMenuElement = document.querySelector(".activemenu");

    oldMenuElement.classList.remove("activemenu");
    newMenuElement.classList.add("activemenu");

    changeBody(newMenuElement.dataset.title);
}

function createMenuForm(placeholder="New Task List") {
    const menuFormContainer = document.createElement("div")
    menuFormContainer.setAttribute("id","menuform");

    const menuForm = document.createElement("form");
    menuForm.setAttribute("onSubmit","return false");

    const menuInput = document.createElement("input");
    menuInput.setAttribute("type","text");
    menuInput.setAttribute("id","menuformtitle");
    menuInput.setAttribute("name","menuformtitle");
    menuInput.required = true;
    menuInput.setAttribute("maxlength","20");
    if(placeholder=="New Task List") {
        menuInput.setAttribute("placeholder","New Task List")
    } else {
        menuInput.value = placeholder;
    }
    menuForm.appendChild(menuInput);
    menuFormContainer.appendChild(menuForm);

    const menuFormIcons = document.createElement("div");
    menuFormIcons.setAttribute("id","menuformicons");

    const menuFormSubmit = document.createElement("img");
    menuFormSubmit.setAttribute("id","newmenuformsubmit");
    menuFormSubmit.setAttribute("src","./images/check.png");
    menuFormSubmit.setAttribute("alt","Complete Icon");

    const menuFormDelete = document.createElement("img");
    menuFormDelete.setAttribute("id","newmenuformdelete");
    menuFormDelete.setAttribute("src","./images/delete.png");
    menuFormDelete.setAttribute("alt","Delete Icon");
    
    menuFormIcons.appendChild(menuFormSubmit);
    menuFormIcons.appendChild(menuFormDelete);

    menuFormContainer.appendChild(menuFormIcons);

    return menuFormContainer;
}

function createMenu() {
    disableDisableables();

    const menuitems = document.querySelector("#menuitems");
    const newMenuForm = createMenuForm();
    menuitems.appendChild(newMenuForm);

    const newMenuTitle = document.querySelector("#menuformtitle");
    newMenuTitle.focus();

    const menuFormDelete = document.querySelector("#newmenuformdelete");
    const menuFormSubmit = document.querySelector("#newmenuformsubmit");

    menuFormDelete.addEventListener("click", function(){
        resetMenu();
    })
    menuFormSubmit.addEventListener("click", function(){
        validateMenu();
    })
}

function validateMenu(){
    const menuFormTitle = document.querySelector("#menuformtitle");

    if (menuFormTitle.checkValidity()===true) {
        if(checkUniqueMenuTitle(menuFormTitle.value)){
            const newMenuObject = menuFactory(menuFormTitle.value);
            const newMenuElement = generateMenuElement(newMenuObject);
    
            const menuItems = document.querySelector("#menuitems");
            const menuForm = document.querySelector("#menuform");
            menuItems.insertBefore(newMenuElement, menuForm);
    
            resetMenu();
            addMenuToLocalStorage(newMenuObject);
            changeMenu(newMenuElement);
        } else {
            menuErrorMessage("*Please enter a unique name")
        }
    } else {
        menuErrorMessage("*Required");
    }
}

const menuFactory = (menuTitle) => {
    const title = menuTitle;
    const classes = ["menuitem","menuedit","disableable"];
    const pair = `body-${menuTitle}`;

    return {title, classes, pair};
}

function generateMenuElement(menuObject){
    const title = menuObject.title;
    const pair = menuObject.pair;
    const classes = menuObject.classes;

    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id",`menu-${title}`);
    menuContainer.setAttribute("data-pair", pair);
    menuContainer.setAttribute("data-title", title);
    classes.forEach(classItem=>{
        menuContainer.classList.add(classItem)
    })
    menuContainer.addEventListener("click",function(){
        event.stopPropagation();
        changeMenu(menuContainer)
    })

    const menuContent = document.createElement("div");
    menuContent.setAttribute("id",`menu-${title}-content`)
    menuContent.textContent = title;
    menuContent.classList.add("menucontent");

    const editIcon = document.createElement("img");
    const deleteIcon = document.createElement("img");
    editIcon.src="./images/pencil.png";
    editIcon.alt="Edit Icon";
    editIcon.classList.add("disableable");
    editIcon.addEventListener("click",function(){
        event.stopPropagation();
        createMenuEdit(editIcon.parentElement)
    })
    deleteIcon.src="./images/delete.png";
    deleteIcon.alt="Delete Icon";
    deleteIcon.classList.add("disableable");
    deleteIcon.addEventListener("click",function(){
        verifyMenuDelete(deleteIcon.parentElement);
    })

    menuContainer.appendChild(menuContent);
    menuContainer.appendChild(editIcon);
    menuContainer.appendChild(deleteIcon);

    return menuContainer;
}

function createMenuEdit(menuElementToEdit) {
    disableDisableables();

    const menuTitle = menuElementToEdit.dataset.title;
    
    const editMenuForm = createMenuForm(menuTitle);
    const menuItems = document.querySelector("#menuitems");
    menuItems.insertBefore(editMenuForm, menuElementToEdit);

    const menuFormInput = document.querySelector("#menuformtitle");

    menuElementToEdit.classList.add("hidden");

    const menuFormDelete = document.querySelector("#newmenuformdelete");
    const menuFormSubmit = document.querySelector("#newmenuformsubmit");

    menuFormDelete.addEventListener("click", function(){
        resetMenu();
        menuElementToEdit.classList.remove("hidden");
    })
    menuFormSubmit.addEventListener("click", function(){
        validateMenuEdit(menuTitle, menuFormInput.value, menuElementToEdit);
    })
}

function validateMenuEdit(oldMenuTitle, newMenuTitle, menuElementToEdit){
    const menuFormInput = document.querySelector("#menuformtitle");

    if (menuFormInput.checkValidity()===true) {
        if(checkUniqueMenuTitle(menuFormInput.value)){
            editMenuInLocalStorage(oldMenuTitle, newMenuTitle);

            const newMenuObject = menuFactory(menuFormInput.value);
            const newMenuElement = generateMenuElement(newMenuObject);
            const menuItems = document.querySelector("#menuitems");
            menuItems.insertBefore(newMenuElement, menuElementToEdit);
            changeMenu(newMenuElement)
            menuElementToEdit.remove();
            resetMenu();
        } else {
            menuErrorMessage("*Please enter a unique name.")
        }
    } else {
        menuErrorMessage("*Required");
    }
}

function menuErrorMessage(errorMessage){
    const menuForm = document.getElementById("menuform");
    const menuTitle = document.getElementById("menuformtitle");
    const menuItems = document.getElementById("menuitems");

    const oldMenuError = document.getElementById("menuerror");
    if (oldMenuError != null){
        oldMenuError.remove()
    }

    const menuError = document.createElement("p");
    menuError.setAttribute("id","menuerror")
    menuError.innerText = errorMessage;

    menuForm.appendChild(menuError)
    menuItems.scrollTop = menuItems.scrollHeight;
    menuTitle.focus();
}

function verifyMenuDelete(menuElementToDelete) {
    displayVerifyWindow(menuElementToDelete.dataset.title);
    const cancelButton = document.querySelector("#cancelbutton");
    const deleteButton = document.querySelector("#deletebutton");

    cancelButton.addEventListener("click",function(){
        removeVerifyWindow();
    })
    deleteButton.addEventListener("click",function(){
        const allTasksMenu = document.querySelector("#menu-alltasks");
        changeMenu(allTasksMenu)
        deleteMenu(menuElementToDelete);
        changeMenu(allTasksMenu)
        removeVerifyWindow();
    })
}

function deleteMenu(menuElementToDelete) {
    removeMenuInLocalStorage(menuElementToDelete.dataset.title);
    menuElementToDelete.remove();
}

function resetMenu() {
    const menuForm = document.querySelector("#menuform");
    menuForm.remove();

    enableDisableables();
}

export { changeMenu, createMenu, menuFactory, generateMenuElement }