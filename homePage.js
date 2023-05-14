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
  {number: 1, link: "images/bg8.png"}
];



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


fileInput.addEventListener('change', function () {
  console.log(images);
  let file = fileInput.files[0];
  if (!file) return;

  // Create a new FileReader object
  let reader = new FileReader();

  // When the reader has finished reading the file
  reader.onload = function() {
    // Create a new image object and add it to the images array
    let newImage = { number: images.length + 1, link: reader.result };
    images.push(newImage);
    console.log("yes");

    // Create a new img element and copy the formatting properties from an existing img element
    let img = document.createElement("img");
    img.style.cssText = 'float: left;width: 25%;padding: 5px;cursor: pointer';
    img.src = reader.result;

    // Add the img element to the imageList container
    document.getElementById("imageList").appendChild(img);
  };
  // Read the contents of the uploaded file as a data URL
  reader.readAsDataURL(file);
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
