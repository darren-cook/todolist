import { menuFactory, generateMenuElement } from "./menu";
import { generateTaskElement } from "./task";

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

function addMenuToLocalStorage(menuObjectToAdd) {
    const dataToAppend = {menuTitle:menuObjectToAdd.title, menuObject:menuObjectToAdd, listOfTasks:[]};

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

    const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==oldMenuTitle);

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

function getListOfMenuTitles(){
    const userDataList = JSON.parse(sessionStorage.getItem("userData"));
    const listOfMenuTitles = [];

    for(let i=2; i<userDataList.length; i++){
        listOfMenuTitles.push(userDataList[i].menuTitle);
    }
    return listOfMenuTitles;
}

function addTaskToLocalStorage(taskObjectToAdd){
    const dataToAppend = {taskTitle:taskObjectToAdd.title, taskObject:taskObjectToAdd};

    const userDataList = JSON.parse(sessionStorage.getItem("userData"));

    const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==taskObjectToAdd.menuTitle);
    menuToEdit.listOfTasks.push(dataToAppend);

    sessionStorage.setItem("userData",JSON.stringify(userDataList));
}

function loadTasksFromLocalStorage(menuTitleToLoad){
    const userDataList = JSON.parse(sessionStorage.getItem("userData"));

    const menuToLoad = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==menuTitleToLoad);
    const listOfTasksToLoad = menuToLoad.listOfTasks;

    const taskList = document.querySelector(".tasklist");

    if(listOfTasksToLoad.length > 0){
        for(let i=0; i<listOfTasksToLoad.length; i++){
            const newTaskElement = generateTaskElement(listOfTasksToLoad[i].taskObject);
            taskList.appendChild(newTaskElement);
        }
    }
}

export { checkLocalStorage, addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage, getListOfMenuTitles, addTaskToLocalStorage, loadTasksFromLocalStorage }
