const fileInput = document.getElementById("file-input");
//  localStorage.setItem('savedCode','');

var images = [
{number: 1, link: "images/bg9.png"}, 
{number: 2, link: "images/bg1.png"},
{number: 3, link: "images/bg2.png"}, 
{number: 4, link: "images/bg3.png"},
{number: 5, link: "images/bg4.png"},
{number: 6, link: "images/bg5.png"}, 
{number: 7, link: "images/bg6.png"},
{number: 8, link: "images/bg7.png"},
{number: 9, link: "images/bg8.png"}];

images.forEach(image => {
const img = document.createElement("img");
img.style.cssText = 'float: left;width: 25%;padding: 5px;cursor: pointer';
img.src = image.link;
img.id = "image" + image.number;
img.class = "column";
img.addEventListener('mouseover',
  function(){ img.style.outline = "2px dotted grey";});
img.addEventListener('mouseout',
  function(){ img.style.outline = "none";});
document.getElementById("imageList").appendChild(img);

img.addEventListener('click', function () {
  window.location.href = "edit.html";
  localStorage.setItem("picture", img.src);
})
});


fileInput.addEventListener('change', function (){
let file = fileInput.files[0];
  if(!file) return;
console.log(file);
images.push({})
  //previewImg.src = URL.createObjectURL(file);
  //previewImg.addEventListener("load", () => {
  //    resetFilterBtn.click();
  //    document.querySelector(".container").classList.remove("disable");
  //});
});

// initialize CodeMirror editor
/* var jsEditor = CodeMirror.fromTextArea(document.getElementById("jscode"), {
lineNumbers: true,
mode: "javascript",
}); */

var jsEditor = CodeMirror.fromTextArea(document.getElementById("jscode"), {
lineNumbers: true,
mode: "html"
});

jsEditor.setSize("100%", "100%");


//kod från video med collapsable grej
const hamburger = document.getElementById('hamburger')
const sidebar = document.getElementById('sidebar')
const overlay = document.getElementById('overlay')

let menuOpen = false

function openMenu() {
menuOpen = true
overlay.style.display = 'block'
sidebar.style.width = '50vw'
}

function closeMenu() {
menuOpen = false
overlay.style.display = 'none'
sidebar.style.display = 'block'
sidebar.style.width = '0px'
}

hamburger.addEventListener('click', function () {
if (!menuOpen) {
  openMenu()
}
})

overlay.addEventListener('click', function () {
if (menuOpen) {
  closeMenu()
}
})

document.getElementById('saveButton').addEventListener('click', () => {

const code = jsEditor.getValue();
// save to local storage
localStorage.setItem('savedCode', code);
location.reload();
eval(jsEditor.getValue());
});

window.addEventListener('DOMContentLoaded', (event) => {
// retrieve the saved code from local storage
const savedCode = localStorage.getItem('savedCode');
if (savedCode) {
  // if there's saved code, load it into the editor
  jsEditor.setValue(savedCode);
  jsEditor.refresh;
}
});

if(!(localStorage.getItem('savedCode')===null)){
    console.log(localStorage.getItem('savedCode'));
    eval(localStorage.getItem('savedCode'));
  };