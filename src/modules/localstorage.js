import { menuFactory, generateMenuElement } from "./menu";

function checkLocalStorage(){
    if(sessionStorage.length == 0){
        createLocalStorage();
    } else {
        loadMenusFromLocalStorage();
    }
}

function createLocalStorage(){
    const userDataList = []
    sessionStorage.setItem("userData",JSON.stringify(userDataList));

    const allTasks = menuFactory("All Tasks");
    const completedTasks = menuFactory("Completed Tasks");
    const generalTasks = menuFactory("General Tasks");
    addMenuToLocalStorage(allTasks);
    addMenuToLocalStorage(completedTasks);
    addMenuToLocalStorage(generalTasks);

}

function addMenuToLocalStorage(menuItem) {
    const dataToAppend = {menuTitle:menuItem.title, menuObject:menuItem, taskList:[]};

    const userDataList = JSON.parse(sessionStorage.getItem("userData"));
    
    userDataList.push(dataToAppend);
    sessionStorage.setItem("userData",JSON.stringify(userDataList));
}

function removeMenuInLocalStorage(menuToRemove){
    const userDataList = JSON.parse(sessionStorage.getItem("userData"));

    const newUserDataList = userDataList.filter(function( obj ) {
        return obj.menuTitle !== menuToRemove;
    })

    sessionStorage.setItem("userData",JSON.stringify(newUserDataList));
}

function editMenuInLocalStorage(oldMenuTitle, newMenuTitle) {
    const userDataList = JSON.parse(sessionStorage.getItem("userData"));

    const menuToEdit = userDataList.find(x => x.menuTitle==oldMenuTitle);

    menuToEdit.menuTitle = newMenuTitle;
    menuToEdit.menuObject.title = newMenuTitle;
    menuToEdit.menuObject.pair = `body-${newMenuTitle}`;

    sessionStorage.setItem("userData",JSON.stringify(userDataList));
}

function loadMenusFromLocalStorage(){
    const userDataList = JSON.parse(sessionStorage.getItem("userData"));
    
    for(let i=3; i<userDataList.length; i++){
        const generatedMenu = generateMenuElement(userDataList[i].menuObject);
        const menuItems = document.querySelector("#menuitems");
        const menuForm = document.querySelector("#menuform");
        menuItems.insertBefore(generatedMenu, menuForm);
    }
}

function getListOfTaskLists(){
    const userDataList = JSON.parse(sessionStorage.getItem("userData"));
    const listOfTaskLists = [];

    for(let i=2; i<userDataList.length; i++){
        listOfTaskLists.push(userDataList[i].menuTitle);
    }
    return listOfTaskLists;
}

export { checkLocalStorage, addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage, getListOfTaskLists }
