import { disableDisableables, enableDisableables, displayVerifyWindow, removeVerifyWindow } from "./displaycontroller";
import { generateTaskBox } from "./body";
import { addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage } from "./localstorage";

function changeMenu(menuItem){
    const activeMenu = document.querySelector(".activemenu");

    activeMenu.classList.remove("activemenu");
    menuItem.classList.add("activemenu");

    changeBody(menuItem.dataset.pair);
}

function changeBody(menuItemPair){
    const activeBody = document.querySelector(".activebody");
    const newActiveBody = document.getElementById(menuItemPair);

    activeBody.classList.add("hidden");
    activeBody.classList.remove("activebody");
    newActiveBody.classList.add("activebody");
    newActiveBody.classList.remove("hidden");
}

function createMenuForm(placeholder="New Task List") {
    const menuFormContainer = document.createElement("div")
    menuFormContainer.setAttribute("id","menuform");

    const menuForm = document.createElement("form");
    menuForm.setAttribute("onsubmit","return false");

    const menuInput = document.createElement("input");
    menuInput.setAttribute("type","text");
    menuInput.setAttribute("id","menuformtitle");
    menuInput.setAttribute("name","menuformtitle");
    menuInput.required = true;
    menuInput.setAttribute("maxlength","15");
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

    const customMenu = document.querySelector("#custommenu");
    customMenu.classList.add("hidden")

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
        const newMenu = menuFactory(menuFormTitle.value);
        const generatedMenu = generateMenu(newMenu);

        const menuItems = document.querySelector("#menuitems");
        const menuForm = document.querySelector("#menuform");
        menuItems.insertBefore(generatedMenu, menuForm);

        resetMenu();
        generateTaskBox(newMenu.title);
        addMenuToLocalStorage(newMenu);
        changeMenu(generatedMenu);
    } else {
        menuFormTitle.focus();
    }
}

const menuFactory = (menuTitle) => {
    const title = menuTitle;
    const classes = ["menuitem","menuedit","disableable"];
    const pair = `body-${menuTitle}`;
    const name = menuTitle;

    return {title, classes, pair, name};
}

function generateMenu(menuObject){
    const title = menuObject.title;
    const pair = menuObject.pair;
    const classes = menuObject.classes;
    const name = menuObject.name;

    const menuContainer = document.createElement("div");
    menuContainer.setAttribute("id",`menu-${title}`);
    menuContainer.setAttribute("data-pair", pair);
    menuContainer.setAttribute("data-name",name);
    menuContainer.setAttribute("data-name",title);
    classes.forEach(classItem=>{
        menuContainer.classList.add(classItem)
    })
    menuContainer.addEventListener("click",function(){
        changeMenu(menuContainer)
    })

    const menuContent = document.createElement("div");
    menuContent.setAttribute("id",`menu-${title}-content`)
    menuContent.textContent = title;

    const editIcon = document.createElement("img");
    const deleteIcon = document.createElement("img");
    editIcon.src="./images/pencil.png";
    editIcon.alt="Edit Icon";
    editIcon.classList.add("editicon");
    editIcon.classList.add("disableable");
    editIcon.addEventListener("click",function(){
        createMenuEdit(editIcon.parentElement.id)
    })
    deleteIcon.src="./images/delete.png";
    deleteIcon.alt="Delete Icon";
    deleteIcon.classList.add("deleteicon");
    deleteIcon.classList.add("disableable");
    deleteIcon.addEventListener("click",function(){
        verifyDelete(deleteIcon.parentElement);
    })

    menuContainer.appendChild(menuContent);
    menuContainer.appendChild(editIcon);
    menuContainer.appendChild(deleteIcon);

    return menuContainer;
}

function createMenuEdit(menuItemID) {
    disableDisableables();
    const customMenu = document.querySelector("#custommenu");
    customMenu.classList.add("hidden")
    
    const menuParent = document.getElementById(menuItemID);
    const menuContent = document.querySelector(`#${menuItemID}-content`);
    
    const editMenuForm = createMenuForm(menuContent.textContent);
    const menuItems = document.querySelector("#menuitems");
    menuItems.insertBefore(editMenuForm, menuParent);

    const menuForm = document.querySelector("#menuForm");
    const menuFormTitle = document.querySelector("#menuformtitle");

    menuParent.classList.add("hidden");

    const menuFormDelete = document.querySelector("#newmenuformdelete");
    const menuFormSubmit = document.querySelector("#newmenuformsubmit");

    menuFormDelete.addEventListener("click", function(){
        resetMenu();
        menuParent.classList.remove("hidden");
    })
    menuFormSubmit.addEventListener("click", function(){
        validateMenuEdit(menuParent, menuContent, menuFormTitle.value);
        menuParent.classList.remove("hidden");
        changeMenu(menuParent);
    })
}

function validateMenuEdit(oldMenu, oldMenuContent, newMenuName){
    const menuFormTitle = document.querySelector("#menuformtitle");

    if (menuFormTitle.checkValidity()===true) {
        editMenuInLocalStorage(oldMenuContent.textContent, newMenuName);
        const oldBody = document.querySelector(`#body-${oldMenuContent.textContent}`);
        oldBody.id = `body-${newMenuName}`;
        const oldBodyTitle = document.querySelector(`#body-${oldMenuContent.textContent}-title`);
        oldBodyTitle.id = `body-${newMenuName}-title`;
        oldBodyTitle.textContent = newMenuName;
        oldMenu.id = `menu-${newMenuName}`;
        oldMenu.dataset.pair = `body-${newMenuName}`;
        oldMenu.dataset.name = newMenuName;
        oldMenuContent.textContent = newMenuName;
        oldMenuContent.id = `menu-${newMenuName}-content`;
        resetMenu();
    } else {
        menuFormTitle.focus();
    }
}

function verifyDelete(menuToDelete) {
    displayVerifyWindow(menuToDelete);
    const cancelButton = document.querySelector("#cancelbutton");
    const deleteButton = document.querySelector("#deletebutton");

    cancelButton.addEventListener("click",function(){
        removeVerifyWindow();
    })
    deleteButton.addEventListener("click",function(){
        const allTasksMenu = document.querySelector("#menu-alltasks");
        changeMenu(allTasksMenu)
        deleteMenu(menuToDelete);
        removeVerifyWindow();
    })
}

function deleteMenu(menuToDelete) {
    const bodyToDelete = document.getElementById(menuToDelete.dataset.pair);
    removeMenuInLocalStorage(menuToDelete.dataset.name);
    menuToDelete.remove();
    bodyToDelete.remove();
}

function resetMenu() {
    const menuForm = document.querySelector("#menuform");
    menuForm.remove();

    enableDisableables();

    const customMenu = document.querySelector("#custommenu");
    customMenu.classList.remove("hidden")
}

export { changeMenu, createMenu, menuFactory, generateMenu }