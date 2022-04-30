import { loadInitial } from "./modules/initial";
import { changeMenu, createMenu } from "./modules/menu";

loadInitial();

const menuItems = document.querySelectorAll(".menuitem");
const createMenuButton = document.querySelector("#createmenubutton");

menuItems.forEach(menuItem =>(
    menuItem.addEventListener("click",function(){
        changeMenu(menuItem)
    })
))

createMenuButton.addEventListener("click",function(){
    createMenu();
})

