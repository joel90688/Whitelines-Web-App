var githubButton = document.getElementById('githubButton');
var githubButtonExtra = document.getElementById('githubButtonExtra');

githubButton.addEventListener('mouseover', function () {
  githubButtonExtra.style.opacity = '1';
  githubButton.style.marginRight = '5vw';
});

githubButtonExtra.addEventListener('mouseover', function () {
  githubButtonExtra.style.opacity = '1';
  githubButton.style.marginRight = '5vw';
});

githubButtonExtra.addEventListener('mouseout', function () {
  githubButtonExtra.style.opacity = '0';
  githubButton.style.marginRight = '0vw';
});

githubButton.addEventListener('mouseout', function () {
  githubButtonExtra.style.opacity = '0';
  githubButton.style.marginRight = '0vw';
});

const fileInput = document.getElementById("file-input");


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
  eval(jsEditor.getValue());
});

/* //martinkod
htmlEditor.getDoc().setValue(document.documentElement.outerHTML);

document.getElementById('htmlButton').addEventListener('click', () => {
  htmlEditor.getDoc().setValue(document.documentElement.outerHTML);
  });

document.getElementById('saveButton').addEventListener('click', updatePageFromFullHtml);

function updatePageFromFullHtml() {
  const newHtml = htmlEditor.getValue();

  // Create a temporary DOM element to parse the full HTML
  const tempElement = document.createElement('html');
  tempElement.innerHTML = newHtml;

  // Save the content of the fullHtmlCode textarea
  const fullHtmlContent = newHtml;

  // Replace the current DOM with the new one
  document.replaceChild(tempElement, document.documentElement);

  // Restore the content of the fullHtmlCode textarea
  htmlEditor.getDoc().setValue(fullHtmlContent);

  // Reattach the event listener for the "Save Changes" button
  document.getElementById('saveButton').addEventListener('click', updatePageFromFullHtml);

  // Trigger the "Refresh Code" button event to update the textarea
  document.getElementById('htmlButton').click();
} */