import { format } from "date-fns";

function loadInitial() {
    generateCalendar();
}

function generateCalendar() {
    const todaysDate = document.querySelector("#todaysdate");

    const calendar = document.createElement("div");
    calendar.setAttribute("id","calendar");

    const dayOfWeek = document.createElement("div");
    dayOfWeek.setAttribute("id","dayofweek");
    dayOfWeek.innerHTML = format(new Date(), "eeee");

    const dayOfMonth = document.createElement("div");
    dayOfMonth.setAttribute("id","dayofmonth");
    dayOfMonth.innerHTML = format(new Date(), "dd");

    const monthOfYear = document.createElement("div");
    monthOfYear.setAttribute("id","monthofyear");
    monthOfYear.innerHTML = format(new Date(), "LLLL");

    calendar.appendChild(monthOfYear);
    calendar.appendChild(dayOfMonth);
    calendar.appendChild(dayOfWeek);

    todaysDate.appendChild(calendar);
}

export { loadInitial } 

// npx webpack