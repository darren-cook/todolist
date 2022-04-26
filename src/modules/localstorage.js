
function addMenuToLocalStorage(menuItem) {
    const menuItemObject = {menuObject:menuItem, menuTaskList:[]}
    sessionStorage.setItem(menuItem.title, JSON.stringify(menuItemObject));
    console.log(JSON.parse(sessionStorage.getItem(menuItem.title)).menuObject.title);
    console.log(JSON.parse(sessionStorage.getItem(menuItem.title)).menuTaskList);
}

function editMenuInLocalStorage(oldMenuTitle, newMenuTitle) {
    const oldMenuObject = JSON.parse(sessionStorage.getItem(oldMenuTitle)).menuObject;
    oldMenuObject.title = newMenuTitle;
    oldMenuObject.pair = `#body-${newMenuTitle}`;
    const oldMenuTaskList = JSON.parse(sessionStorage.getItem(oldMenuTitle)).menuTaskList;

    const newMenuObject = {menuObject:oldMenuObject, menuTaskList:oldMenuTaskList};

    sessionStorage.setItem(newMenuTitle, JSON.stringify(newMenuObject));

    removeMenuInLocalStorage(oldMenuTitle);
}

function removeMenuInLocalStorage(menuToRemove){
    console.log(menuToRemove);
    sessionStorage.removeItem(menuToRemove);
}

export { addMenuToLocalStorage, editMenuInLocalStorage, removeMenuInLocalStorage }
