function generateTaskBox(bodyTitle){
    const body = document.querySelector("#body");

    const taskBoxContainer = document.createElement("div");
    taskBoxContainer.setAttribute("id",`body-${bodyTitle}`);
    taskBoxContainer.classList.add("taskbox");
    taskBoxContainer.classList.add("hidden");

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

    const customItem = document.createElement("div");
    customItem.classList.add("customitem","disableable");
    customItem.textContent = "+";

    taskBody.appendChild(customItem);

    taskBoxContainer.appendChild(taskBody);

    body.appendChild(taskBoxContainer);
}

export { generateTaskBox }


            // <div id="generaltasks" class="taskbox hidden">
            //     <div class="taskheader">
            //         <div class="tasktitle">General Tasks</div>
            //     </div>
            //     <div class="taskbody">
            //         <div class="taskcolumns">
            //             <div class="taskcolumn justifycenter">Priority</div>
            //             <div class="taskcolumn justifystart">Title</div>
            //             <div class="taskcolumn justifystart">Task List</div>
            //             <div class="taskcolumn justifycenter">Due Date</div>
            //             <div class="taskcolumn justifycenter">Actions</div>
            //         </div>
            //         <div class="tasklist">
            //             <div class="taskitem">
            //                 <div class="taskdetail justifycenter">Low</div>
            //                 <div class="taskdetail justifystart">General Test</div>
            //                 <div class="taskdetail justifystart">General</div>
            //                 <div class="taskdetail justifycenter">April 23</div>
            //                 <div class="taskdetail justifycenter actionsicons">
            //                     <img class="disableable" src="./images/pencil.png" alt="Edit Icon">
            //                     <img class="disableable" src="./images/check.png" alt="Complete Icon">
            //                     <img class="disableable" src="./images/delete.png" alt="Delete Icon">
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="customitem disableable">+</div>
            //     </div>
            // </div>