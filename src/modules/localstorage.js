import { menuFactory, generateMenuElement } from "./menu";
import { generateTaskElement } from "./task";

function checkLocalStorage(){
    if(localStorage.length == 0){
        createLocalStorage();
    } else {
        loadMenusFromLocalStorage();
    }
}

function createLocalStorage(){
    const userDataList = []
    localStorage.setItem("userData",JSON.stringify(userDataList));

    const allTasks = menuFactory("All Tasks");
    const completedTasks = menuFactory("Completed Tasks");
    const generalTasks = menuFactory("General Tasks");
    addMenuToLocalStorage(allTasks);
    addMenuToLocalStorage(completedTasks);
    addMenuToLocalStorage(generalTasks);

}

function addMenuToLocalStorage(menuObjectToAdd) {
    const dataToAppend = {menuTitle:menuObjectToAdd.title, menuObject:menuObjectToAdd, listOfTasks:[]};

    const userDataList = JSON.parse(localStorage.getItem("userData"));
    
    userDataList.push(dataToAppend);
    localStorage.setItem("userData",JSON.stringify(userDataList));
}

function removeMenuInLocalStorage(menuToRemove){
    const userDataList = JSON.parse(localStorage.getItem("userData"));

    const newUserDataList = userDataList.filter(function( obj ) {
        return obj.menuTitle !== menuToRemove;
    })

    localStorage.setItem("userData",JSON.stringify(newUserDataList));
}

function editMenuInLocalStorage(oldMenuTitle, newMenuTitle) {
    const userDataList = JSON.parse(localStorage.getItem("userData"));

    const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==oldMenuTitle);

    menuToEdit.menuTitle = newMenuTitle;
    menuToEdit.menuObject.title = newMenuTitle;
    menuToEdit.menuObject.pair = `body-${newMenuTitle}`;

    localStorage.setItem("userData",JSON.stringify(userDataList));
}

function loadMenusFromLocalStorage(){
    const userDataList = JSON.parse(localStorage.getItem("userData"));
    
    for(let i=3; i<userDataList.length; i++){
        const generatedMenu = generateMenuElement(userDataList[i].menuObject);
        const menuItems = document.querySelector("#menuitems");
        const menuForm = document.querySelector("#menuform");
        menuItems.insertBefore(generatedMenu, menuForm);
    }
}

function getListOfMenuTitles(){
    const userDataList = JSON.parse(localStorage.getItem("userData"));
    const listOfMenuTitles = [];

    for(let i=2; i<userDataList.length; i++){
        listOfMenuTitles.push(userDataList[i].menuTitle);
    }
    return listOfMenuTitles;
}

function addTaskToLocalStorage(taskObjectToAdd){
    const dataToAppend = {taskTitle:taskObjectToAdd.title, taskObject:taskObjectToAdd};

    const userDataList = JSON.parse(localStorage.getItem("userData"));

    const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==taskObjectToAdd.menuTitle);
    menuToEdit.listOfTasks.push(dataToAppend);

    localStorage.setItem("userData",JSON.stringify(userDataList));
}

function loadTasksFromLocalStorage(menuTitleToLoad){
    const userDataList = JSON.parse(localStorage.getItem("userData"));

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

function removeTaskInLocalStorage(taskTitleToDelete, menuTitleOfTask){
    const userDataList = JSON.parse(localStorage.getItem("userData"));
    const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==menuTitleOfTask);
    console.log(menuToEdit);

    const listOfTasksToEdit = menuToEdit.listOfTasks;
    console.log(listOfTasksToEdit);

    const newlistOfTasks = listOfTasksToEdit.filter(function( obj ) {
        return obj.taskTitle !== taskTitleToDelete;
    })
    menuToEdit.listOfTasks = newlistOfTasks;

    localStorage.setItem("userData",JSON.stringify(userDataList));
}

export { checkLocalStorage, addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage, getListOfMenuTitles, addTaskToLocalStorage, loadTasksFromLocalStorage, removeTaskInLocalStorage }
