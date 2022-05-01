import { format, parseISO } from "date-fns";
import { disableDisableables, enableDisableables } from "./displaycontroller";
import { getListOfMenuTitles, addTaskToLocalStorage } from "./localstorage";

function createTaskForm(bodyTitle, placeholder="New Task Name"){
    const taskList = document.querySelector(".tasklist");

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
    taskFormTitle.setAttribute("maxlength","15");
    taskFormTitle.required = true;
    if(placeholder=="New Task Name") {
        taskFormTitle.setAttribute("placeholder","New Task Name")
    } else {
        taskFormTitle.value = placeholder;
    }
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
        validateTask();
    })
}

function validateTask(){
    const taskFormTitle = document.querySelector("#taskformtitle");

    if (taskFormTitle.checkValidity()===true) {
        const newTaskObject = taskFactory(taskFormTitle.value);
        const newTaskElement = generateTaskElement(newTaskObject);

        const taskList = document.querySelector(".tasklist");
        const taskForm = document.querySelector("#taskform");
        taskList.insertBefore(newTaskElement, taskForm);

        resetTask();
        addTaskToLocalStorage(newTaskObject);
    } else {
        taskFormTitle.focus();
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

    return {title, classes, priority, menuTitle, duedate, rawduedate};
}

function generateTaskElement(taskObject){
    const title = taskObject.title;
    const priority = taskObject.priority;
    const menuTitle = taskObject.menuTitle;
    const duedate = taskObject.duedate;
    const classes = taskObject.classes;

    const taskItemContainer = document.createElement("div");
    taskItemContainer.setAttribute("id",`task-${title}`);
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

    const taskItemMenuTitle = document.createElement("div");
    taskItemMenuTitle.classList.add("taskdetail","justifystart");
    taskItemMenuTitle.textContent = menuTitle;
    taskItemContainer.appendChild(taskItemMenuTitle);

    const taskItemDueDate = document.createElement("div");
    taskItemDueDate.classList.add("taskdetail","justifycenter");
    taskItemDueDate.textContent = duedate;
    taskItemContainer.appendChild(taskItemDueDate);

    const taskItemActionsContainer = document.createElement("div");
    taskItemActionsContainer.classList.add("taskdetail","justifycenter","actionsicons");

    const taskItemEditIcon = document.createElement("img");
    taskItemEditIcon.classList.add("disableable");
    taskItemEditIcon.setAttribute("src","./images/pencil.png");
    taskItemEditIcon.setAttribute("alt","Edit Icon");
    taskItemEditIcon.addEventListener("click",function(){
        console.log('edit');
    })
    taskItemActionsContainer.appendChild(taskItemEditIcon);

    const taskItemCompleteIcon = document.createElement("img");
    taskItemCompleteIcon.classList.add("disableable");
    taskItemCompleteIcon.setAttribute("src","./images/check.png");
    taskItemCompleteIcon.setAttribute("alt","Complete Icon");
    taskItemCompleteIcon.addEventListener("click",function(){
        console.log('comp');
    })
    taskItemActionsContainer.appendChild(taskItemCompleteIcon);
    
    const taskItemDeleteIcon = document.createElement("img");
    taskItemDeleteIcon.classList.add("disableable");
    taskItemDeleteIcon.setAttribute("src","./images/delete.png");
    taskItemDeleteIcon.setAttribute("alt","Delete Icon");
    taskItemDeleteIcon.addEventListener("click",function(){
        console.log('del');
    })
    taskItemActionsContainer.appendChild(taskItemDeleteIcon);

    taskItemContainer.appendChild(taskItemActionsContainer);

    return taskItemContainer;
} 

function resetTask(){
    const taskForm = document.querySelector("#taskform");
    taskForm.remove();

    enableDisableables();

    // const customTask = document.querySelector(".customtask");
    // customTask.classList.remove("hidden")
}

function formatDate(taskFormDueDate){
    if (taskFormDueDate == ""){
        return ("");
    } else {
        const parsedDate = parseISO(taskFormDueDate, 1);
        const month = format(parsedDate, "MMM");
        const day = format(parsedDate, "do");
        return(`${month} ${day}`);
    }
}

export { createTask, generateTaskElement }