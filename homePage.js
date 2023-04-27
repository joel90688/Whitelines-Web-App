var images = [{number: 1, link: "images/bg9.png"}, 
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
    img.src = image.link;
    img.id = "image" + image.number;
    img.style.cssText = 'float: left;width: 25%;padding: 5px';
    img.class = "column";
    document.getElementById("imageList").appendChild(img);
});

const editorWindow = document.getElementById("editorContainer");
const toggleButton = document.getElementById("toggleEditorButton");

const htmlEditorWindow = document.getElementById("htmlEditorDiv");
const cssEditorWindow = document.getElementById("cssEditorDiv");
const jsEditorWindow = document.getElementById("jsEditorDiv");

const htmlButton = document.getElementById("html");
const cssButton = document.getElementById("css");
const jsButton = document.getElementById("js");

const overlay = document.getElementById("overlay");

htmlButton.classList.add('ActiveClass');
cssButton.classList.add('ActiveClass');
jsButton.classList.add('ActiveClass');

htmlButton.classList.add('HoverClass');
cssButton.classList.add('HoverClass');
jsButton.classList.add('HoverClass');

let editorOpen = false;

function toggleEditor() {
    if (editorOpen) {
        editorOpen = false;
        overlay.style.display = "none";
        toggleButton.style.display = "block";
        editorWindow.style.width = "0px";
    } else {
        editorOpen = true;
        toggleButton.style.display = "none";
        overlay.style.display = "block";
        editorWindow.style.width = "40vw";
    }
  }

  function toggleHtml() {
    htmlButton.style.color = "#fe5000";
    htmlButton.style.backgroundColor = "#000000";
    cssButton.style.color = "#000000";
    cssButton.style.backgroundColor = "#ffffff";
    jsButton.style.color = "#000000";
    jsButton.style.backgroundColor = "#ffffff";

    htmlButton.classList.remove('HoverClass');
    cssButton.classList.add('HoverClass');
    jsButton.classList.add('HoverClass');

    htmlButton.classList.remove('ActiveClass');
    cssButton.classList.add('ActiveClass');
    jsButton.classList.add('ActiveClass');

    cssEditorWindow.style.display = "none";
    jsEditorWindow.style.display = "none";
    htmlEditorWindow.style.display = "block";
  }

  function toggleCss() {
    cssButton.style.color = "#fe5000";
    cssButton.style.backgroundColor = "#000000";
    htmlButton.style.color = "#000000";
    htmlButton.style.backgroundColor = "#ffffff";
    jsButton.style.color = "#000000";
    jsButton.style.backgroundColor = "#ffffff";

    htmlButton.classList.add('HoverClass');
    cssButton.classList.remove('HoverClass');
    jsButton.classList.add('HoverClass');

    htmlButton.classList.add('ActiveClass');
    cssButton.classList.remove('ActiveClass');
    jsButton.classList.add('ActiveClass');

    htmlEditorWindow.style.display = "none";
    cssEditorWindow.style.display = "block";
    jsEditorWindow.style.display = "none";
  }

  function toggleJs() {
    jsButton.style.color = "#fe5000";
    jsButton.style.backgroundColor = "#000000";
    cssButton.style.color = "#000000";
    cssButton.style.backgroundColor = "#ffffff";
    htmlButton.style.color = "#000000";
    htmlButton.style.backgroundColor = "#ffffff";

    htmlButton.classList.add('HoverClass');
    cssButton.classList.add('HoverClass');
    jsButton.classList.remove('HoverClass');

    htmlButton.classList.add('ActiveClass');
    cssButton.classList.add('ActiveClass');
    jsButton.classList.remove('ActiveClass');
    
    htmlEditorWindow.style.display = "none";
    cssEditorWindow.style.display = "none";
    jsEditorWindow.style.display = "block";
  }

  overlay.addEventListener("click", function() {
    toggleEditor();
  });