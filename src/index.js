import { loadInitial } from "./modules/initial";
import { changeMenu, createMenu } from "./modules/menu"

loadInitial();

const menuItems = document.querySelectorAll(".menuitem");
const customMenu = document.querySelector("#custommenu");

menuItems.forEach(menuItem =>(
    menuItem.addEventListener("click",function(){
        changeMenu(menuItem)
    })
))

customMenu.addEventListener("click",function(){
    createMenu();
})

