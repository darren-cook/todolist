import { format, parseISO } from "date-fns";
import { disableDisableables, enableDisableables } from "./displaycontroller";
import { getListOfTaskLists } from "./localstorage";

function generateTaskBox(bodyTitle){
    if(bodyTitle=="Completed Tasks"){
        generateCompletedTaskBox(bodyTitle);
    } else {
        generateNormalTaskBox(bodyTitle);
    }
}

function generateCompletedTaskBox(bodyTitle){

    const body = document.querySelector("#body");

    const taskBoxContainer = document.createElement("div");
    taskBoxContainer.setAttribute("id",`body-${bodyTitle}`);
    taskBoxContainer.classList.add("taskbox");
    taskBoxContainer.classList.add("activebody");

    // taskheader
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("taskheader");
    const taskTitle = document.createElement("div");
    taskTitle.setAttribute("id",`body-${bodyTitle}-title`);
    taskTitle.classList.add("tasktitle");
    taskTitle.textContent = bodyTitle;
    taskHeader.appendChild(taskTitle);

    taskBoxContainer.appendChild(taskHeader);

    // taskbody
    const taskBody = document.createElement("div");
    taskBody.classList.add("taskbody");

    const taskColumns = document.createElement("div");
    taskColumns.classList.add("taskcolumns");

    const priorityColumn = document.createElement("div");
    priorityColumn.textContent = "Priority";
    priorityColumn.classList.add("taskcolumn","justifycenter");
    taskColumns.appendChild(priorityColumn);
    const titleColumn = document.createElement("div");
    titleColumn.textContent = "Title";
    titleColumn.classList.add("taskcolumn","justifystart");
    taskColumns.appendChild(titleColumn);
    const taskListColumn = document.createElement("div");
    taskListColumn.textContent = "Task List";
    taskListColumn.classList.add("taskcolumn","justifystart");
    taskColumns.appendChild(taskListColumn);
    const completedDateColumn = document.createElement("div");
    completedDateColumn.textContent = "Completed";
    completedDateColumn.classList.add("taskcolumn","justifycenter");
    taskColumns.appendChild(completedDateColumn);
    const actionsColumn = document.createElement("div");
    actionsColumn.textContent = "Actions";
    actionsColumn.classList.add("taskcolumn","justifycenter");
    taskColumns.appendChild(actionsColumn);

    taskBody.appendChild(taskColumns);
    
    const taskList = document.createElement("div");
    taskList.classList.add("tasklist");

    taskBody.appendChild(taskList);

    taskBoxContainer.appendChild(taskBody);

    body.appendChild(taskBoxContainer);
}

function generateNormalTaskBox(bodyTitle){

    const body = document.querySelector("#body");

    const taskBoxContainer = document.createElement("div");
    taskBoxContainer.setAttribute("id",`body-${bodyTitle}`);
    taskBoxContainer.classList.add("taskbox");
    taskBoxContainer.classList.add("activebody");

    // taskheader
    const taskHeader = document.createElement("div");
    taskHeader.classList.add("taskheader");
    const taskTitle = document.createElement("div");
    taskTitle.setAttribute("id",`body-${bodyTitle}-title`);
    taskTitle.classList.add("tasktitle");
    taskTitle.textContent = bodyTitle;
    taskHeader.appendChild(taskTitle);

    taskBoxContainer.appendChild(taskHeader);

    // taskbody
    const taskBody = document.createElement("div");
    taskBody.classList.add("taskbody");

    const taskColumns = document.createElement("div");
    taskColumns.classList.add("taskcolumns");

    const priorityColumn = document.createElement("div");
    priorityColumn.textContent = "Priority";
    priorityColumn.classList.add("taskcolumn","justifycenter");
    taskColumns.appendChild(priorityColumn);
    const titleColumn = document.createElement("div");
    titleColumn.textContent = "Title";
    titleColumn.classList.add("taskcolumn","justifystart");
    taskColumns.appendChild(titleColumn);
    const taskListColumn = document.createElement("div");
    taskListColumn.textContent = "Task List";
    taskListColumn.classList.add("taskcolumn","justifystart");
    taskColumns.appendChild(taskListColumn);
    const dueDateColumn = document.createElement("div");
    dueDateColumn.textContent = "Due Date";
    dueDateColumn.classList.add("taskcolumn","justifycenter");
    taskColumns.appendChild(dueDateColumn);
    const actionsColumn = document.createElement("div");
    actionsColumn.textContent = "Actions";
    actionsColumn.classList.add("taskcolumn","justifycenter");
    taskColumns.appendChild(actionsColumn);

    taskBody.appendChild(taskColumns);
    
    const taskList = document.createElement("div");
    taskList.classList.add("tasklist");

    taskBody.appendChild(taskList);

    const customTask = document.createElement("img");
    customTask.setAttribute("src","./images/plus-circle.png");
    customTask.setAttribute("alt","Add Task Icon");
    customTask.classList.add("customtask","disableable");
    customTask.addEventListener("click",function(){
        createTask(bodyTitle);
    })

    taskBody.appendChild(customTask);

    taskBoxContainer.appendChild(taskBody);

    body.appendChild(taskBoxContainer);
}

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

    const taskFormTaskList = document.createElement("select");
    taskFormTaskList.setAttribute("name", "taskformtasklist");
    taskFormTaskList.setAttribute("id", "taskformtasklist");

    const listOfTaskLists = getListOfTaskLists();
    for(let i=0; i<listOfTaskLists.length; i++){
        const listOption = document.createElement("option");
        listOption.setAttribute("value",listOfTaskLists[i]);
        listOption.textContent = listOfTaskLists[i];
        if(listOfTaskLists[i]==bodyTitle){
            listOption.selected = true;
        }
        taskFormTaskList.appendChild(listOption)
    }
    taskForm.appendChild(taskFormTaskList);

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

    const customTask = document.querySelector(".customtask");
    customTask.classList.add("hidden");

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
        // addMenuToLocalStorage(newMenu);
    } else {
        taskFormTitle.focus();
    }
}

const taskFactory = () => {
    const taskFormPriority = document.getElementById("taskformpriority").value;
    const taskFormTitle = document.getElementById("taskformtitle").value;
    const taskFormTaskList = document.getElementById("taskformtasklist").value;
    const taskFormDueDate = document.getElementById("taskformduedate").value;

    const parsedDate = parseISO(taskFormDueDate, 1);
    const month = format(parsedDate, "MMM");
    const day = format(parsedDate, "do");

    const title = taskFormTitle;
    const classes = ["taskitem"];
    const priority = taskFormPriority;
    const tasklist = taskFormTaskList;
    const duedate = `${month} ${day}`;
    const rawduedate = taskFormDueDate;

    return {title, classes, priority, tasklist, duedate, rawduedate};
}

function generateTaskElement(taskObject){
    const title = taskObject.title;
    const priority = taskObject.priority;
    const tasklist = taskObject.tasklist;
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

    const taskItemTaskList = document.createElement("div");
    taskItemTaskList.classList.add("taskdetail","justifystart");
    taskItemTaskList.textContent = tasklist;
    taskItemContainer.appendChild(taskItemTaskList);

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

                        // <div class="taskitem">
                        //     <div class="taskdetail justifycenter">Low</div>
                        //     <div class="taskdetail justifystart">Shopping</div>
                        //     <div class="taskdetail justifystart">General</div>
                        //     <div class="taskdetail justifycenter">April 23</div>
                        //     <div class="taskdetail justifycenter actionsicons">
                        //         <img class="disableable" src="./images/pencil.png" alt="Edit Icon">
                        //         <img class="disableable" src="./images/check.png" alt="Complete Icon">
                        //         <img class="disableable" src="./images/delete.png" alt="Delete Icon">
                        //     </div>
                        // </div>
} 

function resetTask(){
    const taskForm = document.querySelector("#taskform");
    taskForm.remove();

    enableDisableables();

    const customTask = document.querySelector(".customtask");
    customTask.classList.remove("hidden")
}

export { generateTaskBox }