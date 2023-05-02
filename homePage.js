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
    img.src = image.link;
    img.id = "image" + image.number;
    img.style.cssText = 'float: left;width: 25%;padding: 5px';
    img.class = "column";
    document.getElementById("imageList").appendChild(img);
});

// initialize CodeMirror editor
var jsEditor = CodeMirror.fromTextArea(document.getElementById("jscode"), {
  lineNumbers: true,
  mode: "javascript",
});

var htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlcode"), {
  lineNumbers: true,
  mode: "html"
});

htmlEditor.setSize("100%", "100%");

var cssEditor = CodeMirror.fromTextArea(document.getElementById("csscode"), {
  lineNumbers: true,
  mode: "css"
});

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



//martinkod
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
}