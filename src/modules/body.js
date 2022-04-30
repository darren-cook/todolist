import { createTask } from "./task";

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

    const createTaskButton = document.createElement("img");
    createTaskButton.setAttribute("id","createtaskbutton");
    createTaskButton.setAttribute("src","./images/plus-circle.png");
    createTaskButton.setAttribute("alt","Add Task Icon");
    createTaskButton.classList.add("createbutton");
    createTaskButton.addEventListener("click",function(){
        createTask(bodyTitle);
    })

    taskBody.appendChild(createTaskButton);

    taskBoxContainer.appendChild(taskBody);

    body.appendChild(taskBoxContainer);
}

export { generateTaskBox }