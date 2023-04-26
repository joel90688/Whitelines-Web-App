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

function toggleEditor() {
    var element = document.getElementById("editorContainer");
    if (element.style.display === "none") {
      element.style.display = "block";
      editor.refresh();
    } else {
      element.style.display = "none";
    }
  }

  function toggleHtml() {
    var htmlEditorWindow = document.getElementById("htmlEditorDiv");
    var cssEditorWindow = document.getElementById("cssEditorDiv");
    var jsEditorWindow = document.getElementById("jsEditorDiv");

    var htmlButton = document.getElementById("html");
    var cssButton = document.getElementById("css");
    var jsButton = document.getElementById("js");

    htmlButton.style.color = "#fe5000";
    htmlButton.style.backgroundColor = "#000000";
    cssButton.style.color = "#000000";
    cssButton.style.backgroundColor = "#ffffff";
    jsButton.style.color = "#000000";
    jsButton.style.backgroundColor = "#ffffff";

    cssEditorWindow.style.display = "none";
    jsEditorWindow.style.display = "none";
    htmlEditorWindow.style.display = "block";

    editor.refresh();
  }

  function toggleCss() {
    var htmlEditorWindow = document.getElementById("htmlEditorDiv");
    var cssEditorWindow = document.getElementById("cssEditorDiv");
    var jsEditorWindow = document.getElementById("jsEditorDiv");

    var htmlButton = document.getElementById("html");
    var cssButton = document.getElementById("css");
    var jsButton = document.getElementById("js");

    cssButton.style.color = "#fe5000";
    cssButton.style.backgroundColor = "#000000";
    htmlButton.style.color = "#000000";
    htmlButton.style.backgroundColor = "#ffffff";
    jsButton.style.color = "#000000";
    jsButton.style.backgroundColor = "#ffffff";

    htmlEditorWindow.style.display = "none";
    cssEditorWindow.style.display = "block";
    jsEditorWindow.style.display = "none";

    editor.refresh();
  }

  function toggleJs() {
    var htmlEditorWindow = document.getElementById("htmlEditorDiv");
    var cssEditorWindow = document.getElementById("cssEditorDiv");
    var jsEditorWindow = document.getElementById("jsEditorDiv");

    var htmlButton = document.getElementById("html");
    var cssButton = document.getElementById("css");
    var jsButton = document.getElementById("js");

    jsButton.style.color = "#fe5000";
    jsButton.style.backgroundColor = "#000000";
    cssButton.style.color = "#000000";
    cssButton.style.backgroundColor = "#ffffff";
    htmlButton.style.color = "#000000";
    htmlButton.style.backgroundColor = "#ffffff";
    
    htmlEditorWindow.style.display = "none";
    cssEditorWindow.style.display = "none";
    jsEditorWindow.style.display = "block";

    editor.refresh();
  }