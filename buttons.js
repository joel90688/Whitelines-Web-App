let container = document.getElementById("button-container");
let currentPage = window.location.pathname.split("/").pop();
let storedButtons = JSON.parse(localStorage.getItem("buttons_" + currentPage)) || {};



// Loop through stored buttons and recreate them on the page
for (let buttonname in storedButtons) {
let button = document.createElement("button");
button.innerHTML = buttonname;
button.className = "button";
button.style.top = storedButtons[buttonname].top + "px";
button.style.left = storedButtons[buttonname].left + "px";
document.body.appendChild(button);


button.addEventListener("click", function() {
    window.location.href = buttonname + ".html";
});
}

let clickListener = function(e) {
let buttonname = document.getElementById("buttonname").value;
let button = document.createElement("button");
button.innerHTML = buttonname;
button.className = "button";
button.style.top = e.clientY + "px";
button.style.left = e.clientX + "px";
document.body.appendChild(button);


// Store button information in local storage
storedButtons[buttonname] = {
    top: e.clientY,
    left: e.clientX
};
localStorage.setItem("buttons_" + currentPage, JSON.stringify(storedButtons));

button.addEventListener("click", function() {
    window.location.href = buttonname + ".html";
});
}

document.addEventListener("keydown", function(e) {
if (event.key == "a") {
document.addEventListener("click", clickListener);
} else if (event.key == "s") {
document.removeEventListener("click", clickListener);
} else if (event.key == "Escape") {
// Remove all stored buttons from local storage
localStorage.removeItem("buttons_" + currentPage);
// Remove all existing buttons from the page
document.querySelectorAll(".button").forEach(function(button) {
button.remove();
});
}
});