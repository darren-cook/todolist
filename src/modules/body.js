import { createTask } from "./task";
import { loadTasksFromLocalStorage, sortTitles, sortDates, sortPriority } from "./localstorage"
import { changeSortDirection } from "./displaycontroller"

function changeBody(newBodyTitle){
    const oldBodyElement = document.querySelector(".activebody");
    oldBodyElement.remove();
    generateTaskBox(newBodyTitle);
    loadTasksFromLocalStorage(newBodyTitle);
}

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
    taskBoxContainer.dataset.title = bodyTitle;
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
    priorityColumn.classList.add("taskcolumn","justifycenter");
    const priorityColumnSort = document.createElement("img");
    priorityColumnSort.setAttribute("id","priorityColumnSort");
    priorityColumnSort.dataset.direction = "none";
    priorityColumnSort.setAttribute("src","./images/sort.png");
    priorityColumnSort.setAttribute("alt","Sort Titles Ascending");
    priorityColumnSort.classList.add("sortbutton", "disableable");
    priorityColumnSort.addEventListener("click",function(){
        changeSortDirection(priorityColumnSort);
        sortPriority(bodyTitle, priorityColumnSort.dataset.direction);
    })
    const priorityColumnTitle = document.createElement("div");
    priorityColumnTitle.textContent = "Priority";
    priorityColumn.appendChild(priorityColumnSort);
    priorityColumn.appendChild(priorityColumnTitle);
    taskColumns.appendChild(priorityColumn);

    const titleColumn = document.createElement("div");
    titleColumn.classList.add("taskcolumn","justifystart");
    const titleColumnSort = document.createElement("img");
    titleColumnSort.setAttribute("id","titleColumnSort");
    titleColumnSort.dataset.direction = "none";
    titleColumnSort.setAttribute("src","./images/sort.png");
    titleColumnSort.setAttribute("alt","Sort Titles Ascending");
    titleColumnSort.classList.add("sortbutton", "disableable");
    titleColumnSort.addEventListener("click",function(){
        changeSortDirection(titleColumnSort);
        sortTitles(bodyTitle, titleColumnSort.dataset.direction);
    })
    const titleColumnTitle = document.createElement("div");
    titleColumnTitle.textContent = "Title";
    titleColumn.appendChild(titleColumnSort);
    titleColumn.appendChild(titleColumnTitle)
    taskColumns.appendChild(titleColumn);

    const menuTitleColumn = document.createElement("div");
    menuTitleColumn.textContent = "Task List";
    menuTitleColumn.classList.add("taskcolumn","justifystart");
    taskColumns.appendChild(menuTitleColumn);

    const completedDateColumn = document.createElement("div");
    completedDateColumn.classList.add("taskcolumn","justifycenter");
    const completedDateColumnSort = document.createElement("img");
    completedDateColumnSort.setAttribute("id","duedateColumnSort");
    completedDateColumnSort.dataset.direction = "none";
    completedDateColumnSort.setAttribute("src","./images/sort.png");
    completedDateColumnSort.setAttribute("alt","Sort Titles Ascending");
    completedDateColumnSort.classList.add("sortbutton", "disableable");
    completedDateColumnSort.addEventListener("click",function(){
        changeSortDirection(completedDateColumnSort);
        sortDates(bodyTitle, completedDateColumn.dataset.direction);
    })
    const completedDateTitle = document.createElement("div");
    completedDateTitle.textContent = "Completed";
    completedDateColumn.appendChild(completedDateColumnSort);
    completedDateColumn.appendChild(completedDateTitle);
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
    taskBoxContainer.dataset.title = bodyTitle;
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
    priorityColumn.classList.add("taskcolumn","justifycenter");
    const priorityColumnSort = document.createElement("img");
    priorityColumnSort.setAttribute("id","priorityColumnSort");
    priorityColumnSort.dataset.direction = "none";
    priorityColumnSort.setAttribute("src","./images/sort.png");
    priorityColumnSort.setAttribute("alt","Sort Titles Ascending");
    priorityColumnSort.classList.add("sortbutton", "disableable");
    priorityColumnSort.addEventListener("click",function(){
        changeSortDirection(priorityColumnSort);
        sortPriority(bodyTitle, priorityColumnSort.dataset.direction);
    })
    const priorityColumnTitle = document.createElement("div");
    priorityColumnTitle.textContent = "Priority";
    priorityColumn.appendChild(priorityColumnSort);
    priorityColumn.appendChild(priorityColumnTitle);
    taskColumns.appendChild(priorityColumn);

    const titleColumn = document.createElement("div");
    titleColumn.classList.add("taskcolumn","justifystart");
    const titleColumnSort = document.createElement("img");
    titleColumnSort.setAttribute("id","titleColumnSort");
    titleColumnSort.dataset.direction = "none";
    titleColumnSort.setAttribute("src","./images/sort.png");
    titleColumnSort.setAttribute("alt","Sort Titles Ascending");
    titleColumnSort.classList.add("sortbutton", "disableable");
    titleColumnSort.addEventListener("click",function(){
        changeSortDirection(titleColumnSort);
        sortTitles(bodyTitle, titleColumnSort.dataset.direction);
    })
    const titleColumnTitle = document.createElement("div");
    titleColumnTitle.textContent = "Title";
    titleColumn.appendChild(titleColumnSort);
    titleColumn.appendChild(titleColumnTitle)
    taskColumns.appendChild(titleColumn);

    const menuTitleColumn = document.createElement("div");
    menuTitleColumn.textContent = "Task List";
    menuTitleColumn.classList.add("taskcolumn","justifystart");
    taskColumns.appendChild(menuTitleColumn);

    const dueDateColumn = document.createElement("div");
    dueDateColumn.classList.add("taskcolumn","justifycenter");
    const dueDateColumnSort = document.createElement("img");
    dueDateColumnSort.setAttribute("id","duedateColumnSort");
    dueDateColumnSort.dataset.direction = "none";
    dueDateColumnSort.setAttribute("src","./images/sort.png");
    dueDateColumnSort.setAttribute("alt","Sort Titles Ascending");
    dueDateColumnSort.classList.add("sortbutton", "disableable");
    dueDateColumnSort.addEventListener("click",function(){
        changeSortDirection(dueDateColumnSort);
        sortDates(bodyTitle, dueDateColumnSort.dataset.direction);
    })
    const dueDateColumnTitle = document.createElement("div");
    dueDateColumnTitle.textContent = "Due Date";
    dueDateColumn.appendChild(dueDateColumnSort);
    dueDateColumn.appendChild(dueDateColumnTitle);
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

export { generateTaskBox, changeBody }