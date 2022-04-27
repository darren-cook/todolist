function createSessionStorage(){
    const userDataList = []
    sessionStorage.setItem("userData",JSON.stringify(userDataList));
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
    menuToEdit.menuObject.name = newMenuTitle;
    menuToEdit.menuObject.pair = `#body-${newMenuTitle}`;

    sessionStorage.setItem("userData",JSON.stringify(userDataList));
}

export { createSessionStorage, addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage }
