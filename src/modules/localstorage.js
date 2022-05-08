import { menuFactory, generateMenuElement } from "./menu";
import { generateTaskElement} from "./task";

function checkLocalStorage(){
    if(localStorage.length == 0){
        createLocalStorage();
    } else {
        loadMenusFromLocalStorage();
        loadTasksFromLocalStorage("All Tasks")
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

function removeMenuInLocalStorage(menuTitleToRemove){
    const userDataList = JSON.parse(localStorage.getItem("userData"));

    const newUserDataList = userDataList.filter(function( obj ) {
        return obj.menuTitle !== menuTitleToRemove;
    })

    const allTasksMenu = userDataList[0]
    const allTasksListOfTasks = allTasksMenu.listOfTasks;
    const newAllTasksListOfTasks = allTasksListOfTasks.filter(function( obj ) {
        return obj.taskObject.menuTitle !== menuTitleToRemove;
    })

    allTasksMenu.listOfTasks = newAllTasksListOfTasks;

    localStorage.setItem("userData",JSON.stringify(newUserDataList));
}

function editMenuInLocalStorage(oldMenuTitle, newMenuTitle) {
    const userDataList = JSON.parse(localStorage.getItem("userData"));

    const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==oldMenuTitle);

    menuToEdit.menuTitle = newMenuTitle;
    menuToEdit.menuObject.title = newMenuTitle;
    menuToEdit.menuObject.pair = `body-${newMenuTitle}`;

    localStorage.setItem("userData",JSON.stringify(userDataList));

    editTaskMenuTitles(oldMenuTitle, newMenuTitle);
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

    const allTasksMenu = userDataList[0];
    allTasksMenu.listOfTasks.push(dataToAppend);

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

    const listOfTasksToEdit = menuToEdit.listOfTasks;
    const newlistOfTasks = listOfTasksToEdit.filter(function( obj ) {
        return obj.taskTitle !== taskTitleToDelete;
    })
    menuToEdit.listOfTasks = newlistOfTasks;

    localStorage.setItem("userData",JSON.stringify(userDataList));
}

function editTaskMenuTitles(oldMenuTitle, newMenuTitle){
    const userDataList = JSON.parse(localStorage.getItem("userData"));
    const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==newMenuTitle);
    const listOfTasksToEdit = menuToEdit.listOfTasks;
    for(let i=0; i<listOfTasksToEdit.length; i++){
        listOfTasksToEdit[i].taskObject.menuTitle = newMenuTitle
    }

    const allTasksMenu = userDataList[0]
    const allTasksListOfTasks = allTasksMenu.listOfTasks;
    for(let i=0; i<allTasksListOfTasks.length; i++){
        if(allTasksListOfTasks[i].taskObject.menuTitle == oldMenuTitle){
            allTasksListOfTasks[i].taskObject.menuTitle = newMenuTitle
        }
    }

    localStorage.setItem("userData",JSON.stringify(userDataList));
}

function getTaskObjectFromLocalStorage(menuTitleToLoad, taskTitleToLoad){
    const userDataList = JSON.parse(localStorage.getItem("userData"));
    
    const menuToLoad = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==menuTitleToLoad);
    const listOfTasksToLoad = menuToLoad.listOfTasks;
    const taskItem = listOfTasksToLoad.find(arrayOfTaskItems => arrayOfTaskItems.taskTitle==taskTitleToLoad);
    const taskObject = taskItem.taskObject;

    return taskObject;
}

function editTaskInLocalStorage(oldTaskObject, newTaskObject){
    const userDataList = JSON.parse(localStorage.getItem("userData"));

    const allTasksMenu = userDataList[0]
    const allTasksListOfTasks = allTasksMenu.listOfTasks;
    const allTasksTaskItem = allTasksListOfTasks.find(arrayOfTaskItems => arrayOfTaskItems.taskTitle==oldTaskObject.title);
    allTasksTaskItem.taskTitle = newTaskObject.title;
    allTasksTaskItem.taskObject.title = newTaskObject.title;
    allTasksTaskItem.taskObject.classes = newTaskObject.classes;
    allTasksTaskItem.taskObject.priority = newTaskObject.priority;
    allTasksTaskItem.taskObject.menuTitle = newTaskObject.menuTitle;
    allTasksTaskItem.taskObject.duedate = newTaskObject.duedate;
    allTasksTaskItem.taskObject.rawduedate = newTaskObject.rawduedate;

    if(oldTaskObject.menuTitle==newTaskObject.menuTitle){
        const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==oldTaskObject.menuTitle);
        const listOfTasksToEdit = menuToEdit.listOfTasks;
        const taskItem = listOfTasksToEdit.find(arrayOfTaskItems => arrayOfTaskItems.taskTitle==oldTaskObject.title);
        taskItem.taskTitle = newTaskObject.title;
        taskItem.taskObject.title = newTaskObject.title;
        taskItem.taskObject.classes = newTaskObject.classes;
        taskItem.taskObject.priority = newTaskObject.priority;
        taskItem.taskObject.menuTitle = newTaskObject.menuTitle;
        taskItem.taskObject.duedate = newTaskObject.duedate;
        taskItem.taskObject.rawduedate = newTaskObject.rawduedate;
    } else {
        const menuToEdit = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==oldTaskObject.menuTitle);

        const listOfTasksToEdit = menuToEdit.listOfTasks;
        const newlistOfTasks = listOfTasksToEdit.filter(function( obj ) {
            return obj.taskTitle !== oldTaskObject.title;
        })
        menuToEdit.listOfTasks = newlistOfTasks;

        const dataToAppend = {taskTitle:newTaskObject.title, taskObject:newTaskObject};
    
        const menuToAppend = userDataList.find(arrayofMenuObjects => arrayofMenuObjects.menuTitle==newTaskObject.menuTitle);
        menuToAppend.listOfTasks.push(dataToAppend);
    }

    localStorage.setItem("userData",JSON.stringify(userDataList));

}

export { checkLocalStorage, addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage, getListOfMenuTitles, 
    addTaskToLocalStorage, loadTasksFromLocalStorage, removeTaskInLocalStorage, getTaskObjectFromLocalStorage, editTaskInLocalStorage }
