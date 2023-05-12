var images = [
  {number: 1, link: "images/bg9.png"}, 
  {number: 2, link: "images/bg1.png"},
  {number: 3, link: "images/bg2.png"}, 
  {number: 4, link: "images/bg3.png"},
  {number: 5, link: "images/bg4.png"},
  {number: 6, link: "images/bg5.png"}, 
  {number: 7, link: "images/bg6.png"},
  {number: 8, link: "images/bg7.png"},
  {number: 9, link: "images/bg8.png"}
];

images.forEach(image => {
const img = document.createElement("img");
img.style.cssText = 'float: left;width: 25%;padding: 5px;cursor: pointer';
img.src = image.link;
img.id = "image" + image.number;
img.class = "column";
document.getElementById("imageList").appendChild(img);

img.addEventListener('click', function () {
  window.location.href = "edit.html";
  localStorage.setItem("picture", img.src);
})
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

// Code for collapsible menu
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
eval(htmlEditor.getValue());
});

function createSidebar() {
  // Create the sidebar and its elements
  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';

  const htmlButton = document.createElement('button');
  htmlButton.id = 'htmlButton';
  htmlButton.type = 'button';
  htmlButton.textContent = 'HTML';

  const jsButton = document.createElement('button');
  jsButton.id = 'javascriptButton';
  jsButton.type = 'button';
  jsButton.textContent = 'JavaScript';

  const htmlCode = document.createElement('textarea');
  htmlCode.id = 'htmlcode';

  const jsCode = document.createElement('textarea');
  jsCode.id = 'jscode';

  const saveButton = document.createElement('button');
  saveButton.id = 'saveButton';
  saveButton.type = 'button';
  saveButton.textContent = 'Save';

  // Append the elements to the sidebar
  sidebar.appendChild(htmlButton);
  sidebar.appendChild(jsButton);
  sidebar.appendChild(htmlCode);
  sidebar.appendChild(jsCode);
  sidebar.appendChild(saveButton);

  // Append the sidebar to the body
  document.body.appendChild(sidebar);

  // Attach the event listeners
  attachEventListeners();
}

function attachEventListeners() {
// Get
  // Get the elements
  const htmlButton = document.getElementById('htmlButton');
  const jsButton = document.getElementById('javascriptButton');
  const saveButton = document.getElementById('saveButton');
  const htmlCode = document.getElementById('htmlcode');
  const jsCode = document.getElementById('jscode');

  // Event listener for the HTML button
  htmlButton.addEventListener('click', () => {
    // Get the HTML content of the page
    let htmlContent = document.documentElement.innerHTML;
    // Set the HTML content in the HTML textarea and hide others
    htmlEditor.setValue(htmlContent);
    htmlEditor.getWrapperElement().style.display = 'block';
    jsEditor.getWrapperElement().style.display = 'none';
  });

  // Event listener for the JavaScript button
  jsButton.addEventListener('click', () => {
    // Set the HTML textarea to display none and display the JavaScript textarea
    htmlEditor.getWrapperElement().style.display = 'none';
    jsEditor.getWrapperElement().style.display = 'block';
  });

// Event listener for the save button
saveButton.addEventListener('click', () => {
  if (htmlEditor.getWrapperElement().style.display == 'block') {
    // If HTML textarea is visible, replace the HTML of the page with the content of the textarea

    // Make a copy of the textareas
    const htmlcode = document.getElementById('htmlcode').cloneNode(true);
    const jscode = document.getElementById('jscode').cloneNode(true);
    const csscode = document.getElementById('csscode').cloneNode(true);

    // Clear the body and re-insert the HTML from the editor
    document.body.innerHTML = htmlEditor.getValue();

    // Append the cloned textareas back to the new sidebar
    document.getElementById('htmlEditorContainer').appendChild(htmlcode);
    document.getElementById('jsEditorContainer').appendChild(jscode);
    document.getElementById('cssEditorContainer').appendChild(csscode);

    // Reinitialize CodeMirror editors
    jsEditor = CodeMirror.fromTextArea(document.getElementById("jscode"), {
      lineNumbers: true,
      mode: "javascript",
    });

    htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlcode"), {
      lineNumbers: true,
      mode: "html"
    });

    htmlEditor.setSize("100%", "100%");

    cssEditor = CodeMirror.fromTextArea(document.getElementById("csscode"), {
      lineNumbers: true,
      mode: "css"
    });

    // Reattach the event listeners
    attachEventListeners();

    // Reinitialize the sidebar
    hamburger = document.getElementById('hamburger')
    sidebar = document.getElementById('sidebar')
    overlay = document.getElementById('overlay')

    menuOpen = false;

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
  } else {
    // If JavaScript textarea is visible, run the JS code in the textarea
    eval(jsEditor.getValue());
  }
});

}
// Attach the event listeners when the page loads
attachEventListeners();