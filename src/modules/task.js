import { format, parseISO } from "date-fns";
import { disableDisableables, enableDisableables, displayVerifyWindow, removeVerifyWindow } from "./displaycontroller";
import { getListOfMenuTitles, addTaskToLocalStorage, removeTaskInLocalStorage, getTaskObjectFromLocalStorage, editTaskInLocalStorage, checkUniqueTaskTitle } from "./localstorage";
import { changeMenu } from "./menu";

function createTaskForm(bodyTitle){
    const taskForm = document.createElement("form");
    taskForm.setAttribute("id","taskform");
    taskForm.setAttribute("onSubmit","return false");

    const taskFormPriority = document.createElement("select");
    taskFormPriority.setAttribute("name", "taskformpriority");
    taskFormPriority.setAttribute("id", "taskformpriority");

    const taskFormOptionBlank = document.createElement("option");
    taskFormOptionBlank.setAttribute("value","");
    taskFormOptionBlank.textContent = "";
    const taskFormOptionLow = document.createElement("option");
    taskFormOptionLow.setAttribute("value","Low");
    taskFormOptionLow.textContent = "Low";
    const taskFormOptionMedium = document.createElement("option");
    taskFormOptionMedium.setAttribute("value","Medium");
    taskFormOptionMedium.textContent = "Medium";
    const taskFormOptionHigh = document.createElement("option");
    taskFormOptionHigh.setAttribute("value","High");
    taskFormOptionHigh.textContent = "High";

    taskFormPriority.appendChild(taskFormOptionBlank);
    taskFormPriority.appendChild(taskFormOptionLow);
    taskFormPriority.appendChild(taskFormOptionMedium);
    taskFormPriority.appendChild(taskFormOptionHigh);
    taskForm.appendChild(taskFormPriority);

    const taskFormTitle = document.createElement("input");
    taskFormTitle.setAttribute("type","text");
    taskFormTitle.setAttribute("name","taskformtitle");
    taskFormTitle.setAttribute("id","taskformtitle");
    taskFormTitle.setAttribute("maxlength","64");
    taskFormTitle.setAttribute("pattern","[a-zA-Z0-9]+[a-zA-Z0-9 ]+")
    taskFormTitle.required = true;
    taskFormTitle.setAttribute("placeholder","New Task Name")
    taskForm.appendChild(taskFormTitle);

    const taskFormMenuTitle = document.createElement("select");
    taskFormMenuTitle.setAttribute("name", "taskformmenutitle");
    taskFormMenuTitle.setAttribute("id", "taskformmenutitle");

    const listOfMenuTitles = getListOfMenuTitles();
    for(let i=0; i<listOfMenuTitles.length; i++){
        const listOption = document.createElement("option");
        listOption.setAttribute("value",listOfMenuTitles[i]);
        listOption.textContent = listOfMenuTitles[i];
        if(listOfMenuTitles[i]==bodyTitle){
            listOption.selected = true;
        }
        taskFormMenuTitle.appendChild(listOption)
    }
    taskForm.appendChild(taskFormMenuTitle);

    const taskFormDueDate = document.createElement("input");
    taskFormDueDate.setAttribute("type","date");
    taskFormDueDate.setAttribute("name","taskformduedate");
    taskFormDueDate.setAttribute("id","taskformduedate");

    taskForm.appendChild(taskFormDueDate);

    const taskFormActionsIcons = document.createElement("div");
    taskFormActionsIcons.setAttribute("id","taskFormActionsIcons");
    taskFormActionsIcons.classList.add("taskdetail","justifycenter","actionsicons");

    const taskFormSubmit = document.createElement("img");
    taskFormSubmit.setAttribute("id","taskformsubmit");
    taskFormSubmit.setAttribute("src","./images/check.png");
    taskFormSubmit.setAttribute("alt","Complete Icon");
    const taskFormDelete = document.createElement("img");
    taskFormDelete.setAttribute("id","taskformdelete");
    taskFormDelete.setAttribute("src","./images/delete.png");
    taskFormDelete.setAttribute("alt","Delete Icon");

    taskFormActionsIcons.appendChild(taskFormSubmit);
    taskFormActionsIcons.appendChild(taskFormDelete);
    taskForm.appendChild(taskFormActionsIcons);
    
    return taskForm;
}

function createTaskEditForm(priority, title, menuTitle, rawduedate){
    const taskForm = document.createElement("form");
    taskForm.setAttribute("id","taskform");
    taskForm.setAttribute("onSubmit","return false");

    const taskFormPriority = document.createElement("select");
    taskFormPriority.setAttribute("name", "taskformpriority");
    taskFormPriority.setAttribute("id", "taskformpriority");

    const taskFormOptionBlank = document.createElement("option");
    taskFormOptionBlank.setAttribute("value","");
    taskFormOptionBlank.textContent = "";
    const taskFormOptionLow = document.createElement("option");
    taskFormOptionLow.setAttribute("value","Low");
    taskFormOptionLow.textContent = "Low";
    const taskFormOptionMedium = document.createElement("option");
    taskFormOptionMedium.setAttribute("value","Medium");
    taskFormOptionMedium.textContent = "Medium";
    const taskFormOptionHigh = document.createElement("option");
    taskFormOptionHigh.setAttribute("value","High");
    taskFormOptionHigh.textContent = "High";

    taskFormPriority.appendChild(taskFormOptionBlank);
    taskFormPriority.appendChild(taskFormOptionLow);
    taskFormPriority.appendChild(taskFormOptionMedium);
    taskFormPriority.appendChild(taskFormOptionHigh);

    taskFormPriority.value = priority;
    taskForm.appendChild(taskFormPriority);

    const taskFormTitle = document.createElement("input");
    taskFormTitle.setAttribute("type","text");
    taskFormTitle.setAttribute("name","taskformtitle");
    taskFormTitle.setAttribute("id","taskformtitle");
    taskFormTitle.setAttribute("maxlength","64");
    taskFormTitle.setAttribute("pattern","[a-zA-Z0-9]+[a-zA-Z0-9 ]+")
    taskFormTitle.required = true;
    taskFormTitle.value = title;
    taskForm.appendChild(taskFormTitle);

    const taskFormMenuTitle = document.createElement("select");
    taskFormMenuTitle.setAttribute("name", "taskformmenutitle");
    taskFormMenuTitle.setAttribute("id", "taskformmenutitle");

    const listOfMenuTitles = getListOfMenuTitles();
    for(let i=0; i<listOfMenuTitles.length; i++){
        const listOption = document.createElement("option");
        listOption.setAttribute("value",listOfMenuTitles[i]);
        listOption.textContent = listOfMenuTitles[i];
        taskFormMenuTitle.appendChild(listOption)
    }
    taskFormMenuTitle.value = menuTitle;
    taskForm.appendChild(taskFormMenuTitle);

    const taskFormDueDate = document.createElement("input");
    taskFormDueDate.setAttribute("type","date");
    taskFormDueDate.setAttribute("name","taskformduedate");
    taskFormDueDate.setAttribute("id","taskformduedate");
    taskFormDueDate.defaultValue = rawduedate;
    taskForm.appendChild(taskFormDueDate);

    const taskFormActionsIcons = document.createElement("div");
    taskFormActionsIcons.setAttribute("id","taskFormActionsIcons");
    taskFormActionsIcons.classList.add("taskdetail","justifycenter","actionsicons");

    const taskFormSubmit = document.createElement("img");
    taskFormSubmit.setAttribute("id","taskformsubmit");
    taskFormSubmit.setAttribute("src","./images/check.png");
    taskFormSubmit.setAttribute("alt","Complete Icon");
    const taskFormDelete = document.createElement("img");
    taskFormDelete.setAttribute("id","taskformdelete");
    taskFormDelete.setAttribute("src","./images/delete.png");
    taskFormDelete.setAttribute("alt","Delete Icon");

    taskFormActionsIcons.appendChild(taskFormSubmit);
    taskFormActionsIcons.appendChild(taskFormDelete);
    taskForm.appendChild(taskFormActionsIcons);
    
    return taskForm;
}

function createTask(bodyTitle){
    disableDisableables();

    const taskList = document.querySelector(".tasklist");
    const newTaskForm = createTaskForm(bodyTitle);
    taskList.appendChild(newTaskForm);

    const newTaskFormTitle = document.getElementById("taskformtitle");
    newTaskFormTitle.focus();

    const taskFormDelete = document.querySelector("#taskformdelete");
    const taskFormSubmit = document.querySelector("#taskformsubmit");

    taskFormDelete.addEventListener("click", function(){
        resetTask();
    })
    taskFormSubmit.addEventListener("click", function(){
        validateTask(bodyTitle);
    })
}

function validateTask(bodyTitle){
    const taskFormTitle = document.querySelector("#taskformtitle");

    if (taskFormTitle.checkValidity()===true) {
        if(checkUniqueTaskTitle(taskFormTitle.value)){
            const activeMenu = document.querySelector(".activemenu");
            const newTaskObject = taskFactory();
            if(bodyTitle==newTaskObject.menuTitle){
                const newTaskElement = generateTaskElement(newTaskObject);
    
                const taskList = document.querySelector(".tasklist");
                const taskForm = document.querySelector("#taskform");
                taskList.insertBefore(newTaskElement, taskForm);
            }
            resetTask();
            addTaskToLocalStorage(newTaskObject);
            changeMenu(activeMenu);
        } else {
            taskErrorMessage("*Please enter a unique name");
        }
    } else {
        if(taskFormTitle.value==""){
            taskErrorMessage("*Required");
        } else {
            taskErrorMessage("*Special charcaters not allowed");
        }
    }
}

const taskFactory = () => {
    const taskFormPriority = document.getElementById("taskformpriority").value;
    const taskFormTitle = document.getElementById("taskformtitle").value;
    const taskFormMenuTitle = document.getElementById("taskformmenutitle").value;
    const taskFormDueDate = document.getElementById("taskformduedate").value;

    const formattedDueDate = formatDate(taskFormDueDate);

    const title = taskFormTitle;
    const classes = ["taskitem"];
    const priority = taskFormPriority;
    const menuTitle = taskFormMenuTitle;
    const duedate = formattedDueDate;
    const rawduedate = taskFormDueDate;
    const completeddate = "";
    const originalMenuTitle = "";

    return {title, classes, priority, menuTitle, duedate, rawduedate, completeddate, originalMenuTitle};
}

function generateTaskElement(taskObject){
    const title = taskObject.title;
    const priority = taskObject.priority;
    const menuTitle = taskObject.menuTitle;
    const duedate = taskObject.duedate;
    const classes = taskObject.classes;
    const completeddate = taskObject.completeddate;
    const originalMenuTitle = taskObject.originalMenuTitle;

    const taskItemContainer = document.createElement("div");
    taskItemContainer.setAttribute("id",`task-${title}`);
    taskItemContainer.dataset.title = title;
    taskItemContainer.dataset.menutitle = menuTitle;
    classes.forEach(classItem=>{
        taskItemContainer.classList.add(classItem)
    })

    const taskItemPriority = document.createElement("div");
    taskItemPriority.classList.add("taskdetail","justifycenter");
    taskItemPriority.textContent = priority;
    taskItemContainer.appendChild(taskItemPriority);

    const taskItemTitle = document.createElement("div");
    taskItemTitle.classList.add("taskdetail","justifystart");
    taskItemTitle.textContent = title;
    taskItemContainer.appendChild(taskItemTitle);

    if(menuTitle=="Completed Tasks"){
        const taskItemMenuTitle = document.createElement("div");
        taskItemMenuTitle.classList.add("taskdetail","justifystart");
        taskItemMenuTitle.textContent = originalMenuTitle;
        taskItemContainer.appendChild(taskItemMenuTitle);
    } else {
        const taskItemMenuTitle = document.createElement("div");
        taskItemMenuTitle.classList.add("taskdetail","justifystart");
        taskItemMenuTitle.textContent = menuTitle;
        taskItemContainer.appendChild(taskItemMenuTitle);
    }

    if(menuTitle=="Completed Tasks"){
        const taskItemCompletedDate = document.createElement("div");
        taskItemCompletedDate.classList.add("taskdetail","justifycenter");
        taskItemCompletedDate.textContent = completeddate;
        taskItemContainer.appendChild(taskItemCompletedDate);
    } else {
        const taskItemDueDate = document.createElement("div");
        taskItemDueDate.classList.add("taskdetail","justifycenter");
        taskItemDueDate.textContent = duedate;
        taskItemContainer.appendChild(taskItemDueDate);
    }

    if(menuTitle=="Completed Tasks"){
        const taskItemActionsContainer = document.createElement("div");
        taskItemActionsContainer.classList.add("taskdetail","justifycenter","actionsicons");
    
        const taskItemUndoIcon = document.createElement("img");
        taskItemUndoIcon.classList.add("disableable");
        taskItemUndoIcon.setAttribute("src","./images/undo.png");
        taskItemUndoIcon.setAttribute("alt","Edit Icon");
        taskItemUndoIcon.addEventListener("click",function(){
            undoCompleteTask(taskItemUndoIcon.parentElement.parentElement);
        })
        taskItemActionsContainer.appendChild(taskItemUndoIcon);
        
        const taskItemDeleteIcon = document.createElement("img");
        taskItemDeleteIcon.classList.add("disableable");
        taskItemDeleteIcon.setAttribute("src","./images/delete.png");
        taskItemDeleteIcon.setAttribute("alt","Delete Icon");
        taskItemDeleteIcon.addEventListener("click",function(){
            verifyTaskDelete(taskItemDeleteIcon.parentElement.parentElement)
        })
        taskItemActionsContainer.appendChild(taskItemDeleteIcon);
    
        taskItemContainer.appendChild(taskItemActionsContainer);
    } else {
        const taskItemActionsContainer = document.createElement("div");
        taskItemActionsContainer.classList.add("taskdetail","justifycenter","actionsicons");
    
        const taskItemEditIcon = document.createElement("img");
        taskItemEditIcon.classList.add("disableable");
        taskItemEditIcon.setAttribute("src","./images/pencil.png");
        taskItemEditIcon.setAttribute("alt","Edit Icon");
        taskItemEditIcon.addEventListener("click",function(){
            createTaskEdit(taskItemEditIcon.parentElement.parentElement);
        })
        taskItemActionsContainer.appendChild(taskItemEditIcon);
    
        const taskItemCompleteIcon = document.createElement("img");
        taskItemCompleteIcon.classList.add("disableable");
        taskItemCompleteIcon.setAttribute("src","./images/check.png");
        taskItemCompleteIcon.setAttribute("alt","Complete Icon");
        taskItemCompleteIcon.addEventListener("click",function(){
            completeTask(taskItemEditIcon.parentElement.parentElement);
        })
        taskItemActionsContainer.appendChild(taskItemCompleteIcon);
        
        const taskItemDeleteIcon = document.createElement("img");
        taskItemDeleteIcon.classList.add("disableable");
        taskItemDeleteIcon.setAttribute("src","./images/delete.png");
        taskItemDeleteIcon.setAttribute("alt","Delete Icon");
        taskItemDeleteIcon.addEventListener("click",function(){
            verifyTaskDelete(taskItemDeleteIcon.parentElement.parentElement)
        })
        taskItemActionsContainer.appendChild(taskItemDeleteIcon);
    
        taskItemContainer.appendChild(taskItemActionsContainer);
    }

    return taskItemContainer;
} 

function resetTask(){
    const taskForm = document.querySelector("#taskform");
    taskForm.remove();

    enableDisableables();
}

function formatDate(taskFormDueDate){
    if (taskFormDueDate == ""){
        return ("");
    } else {
        const currentYear = format(new(Date), "yyyy");

        const parsedDate = parseISO(taskFormDueDate, 1);
        const dueDateMonth = format(parsedDate, "MMM");
        const dueDateDay = format(parsedDate, "do");
        const dueDateYear = format(parsedDate, "yyyy");

        if(currentYear==dueDateYear){
            return(`${dueDateMonth} ${dueDateDay}`);
        } else {
            return(`${dueDateMonth} ${dueDateDay}, ${dueDateYear}`)
        }
    }
}

function verifyTaskDelete(taskElementToDelete){
    displayVerifyWindow(taskElementToDelete.dataset.title);
    const cancelButton = document.querySelector("#cancelbutton");
    const deleteButton = document.querySelector("#deletebutton"); 

    cancelButton.addEventListener("click",function(){
        removeVerifyWindow();
    })
    deleteButton.addEventListener("click",function(){
        deleteTask(taskElementToDelete);
        removeVerifyWindow();
    })
}

function taskErrorMessage(errorMessage){
    const taskForm = document.getElementById("taskform");
    const taskTitle = document.getElementById("taskformtitle");
    const taskList = document.querySelector(".tasklist");

    const oldTaskError = document.getElementById("taskerror");
    if (oldTaskError != null){
        oldTaskError.remove()
    }

    const taskError = document.createElement("p");
    taskError.setAttribute("id","taskerror")
    taskError.innerText = errorMessage;

    taskForm.appendChild(taskError);
    taskList.scrollTop = taskList.scrollHeight;
    taskTitle.focus();
}

function deleteTask(taskElementToDelete){
    removeTaskInLocalStorage(taskElementToDelete.dataset.title, taskElementToDelete.dataset.menutitle);
    removeTaskInLocalStorage(taskElementToDelete.dataset.title, "All Tasks");
    taskElementToDelete.remove();
}

function createTaskEdit(taskElementToEdit){
    disableDisableables();

    const taskList = document.querySelector(".tasklist");

    const oldMenuTitle = taskElementToEdit.dataset.menutitle;
    const oldTaskTitle = taskElementToEdit.dataset.title;

    const oldTaskObject = getTaskObjectFromLocalStorage(oldMenuTitle, oldTaskTitle);
    const taskEditForm = createTaskEditForm(oldTaskObject.priority, oldTaskObject.title, oldTaskObject.menuTitle, oldTaskObject.rawduedate);

    taskList.insertBefore(taskEditForm, taskElementToEdit);
    taskElementToEdit.classList.add("hidden");

    const taskFormDelete = document.querySelector("#taskformdelete");
    const taskFormSubmit = document.querySelector("#taskformsubmit");

    taskFormDelete.addEventListener("click", function(){
        resetTask();
        taskElementToEdit.classList.remove("hidden");
    })
    taskFormSubmit.addEventListener("click", function(){
        validateTaskEdit(oldTaskObject, taskElementToEdit);
    })

}

function validateTaskEdit(oldTaskObject, taskElementToEdit){
    const taskFormTitle = document.querySelector("#taskformtitle");

    if(taskFormTitle.checkValidity()===true){
        if(checkUniqueTaskTitle(taskFormTitle.value, oldTaskObject.title)){
            const activeMenu = document.querySelector(".activemenu");
            const newTaskObject = taskFactory();
            const newTaskElement = generateTaskElement(newTaskObject);
            const taskList = document.querySelector(".tasklist");
            taskList.insertBefore(newTaskElement, taskElementToEdit);
            taskElementToEdit.remove();
            resetTask();
            editTaskInLocalStorage(oldTaskObject, newTaskObject);
            changeMenu(activeMenu);
        } else {
            taskErrorMessage("*Please enter a unique name")
        }
    } else {
        if(taskFormTitle.value==""){
            taskErrorMessage("*Required")
        } else {
            taskErrorMessage("*Special characters not allowed")
        }
    }
}

function completeTask(taskElementToComplete){
    const activeMenu = document.querySelector(".activemenu");

    const oldTaskObject = getTaskObjectFromLocalStorage(taskElementToComplete.dataset.menutitle, taskElementToComplete.dataset.title);
    const newTaskObject = getTaskObjectFromLocalStorage(taskElementToComplete.dataset.menutitle, taskElementToComplete.dataset.title);

    newTaskObject.menuTitle = "Completed Tasks";
    newTaskObject.originalMenuTitle = oldTaskObject.menuTitle;

    const currentDate = new(Date);
    const currentDateMonth = format(currentDate, "MMM");
    const currentDateDay = format(currentDate, "do");
    const currentDateYear = format(currentDate, "yyyy");

    const formattedCurrentDate = `${currentDateMonth} ${currentDateDay}, ${currentDateYear}`
    newTaskObject.completeddate = formattedCurrentDate;
    newTaskObject.rawcompletedate = currentDate;

    editTaskInLocalStorage(oldTaskObject, newTaskObject);
    removeTaskInLocalStorage(oldTaskObject.title, "All Tasks")
    changeMenu(activeMenu);
}

function undoCompleteTask(taskElementToUndo){
    const activeMenu = document.querySelector(".activemenu");

    const oldTaskObject = getTaskObjectFromLocalStorage(taskElementToUndo.dataset.menutitle, taskElementToUndo.dataset.title);
    const newTaskObject = getTaskObjectFromLocalStorage(taskElementToUndo.dataset.menutitle, taskElementToUndo.dataset.title);

    newTaskObject.completeddate = "";
    newTaskObject.menuTitle = newTaskObject.originalMenuTitle;

    removeTaskInLocalStorage(oldTaskObject.title, oldTaskObject.menuTitle);
    addTaskToLocalStorage(newTaskObject);
    changeMenu(activeMenu);
}

export { createTask, generateTaskElement, deleteTask }