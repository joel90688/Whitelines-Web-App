//const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

previewImg.src = localStorage.getItem("picture");

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

let waitForInput = false;


var jsEditor = CodeMirror.fromTextArea(document.getElementById("jscode"), {
    lineNumbers: true,
    mode: "html"
  });
  
jsEditor.setSize("100%", "100%");

const hamburger = document.getElementById('hamburger')
const sidebar = document.getElementById('sidebar')
const overlay = document.getElementById('overlay')

const filterPanelButton = document.getElementById('filterPanelButton')
const filterPanel = document.getElementById('filterPanel')
const filterPanelButtonAfter = filterPanelButton.querySelector('#filterPanelButton::after');

let panelOpen = false

function changeHoverColor(color) {
    var styleElement = document.createElement('style');
    styleElement.innerHTML = "#filterPanelButton:hover::after { background-color: " + color + "; }";
    document.head.appendChild(styleElement);
}

function openFilterPanel() {
    panelOpen = true
    filterPanel.style.width = '15vw'
    filterPanelButton.style.marginRight = '15.5vw'
    filterPanelButton.style.transform = 'rotate(360deg)'

    changeHoverColor('#aba8a6');
    setTimeout(function () {
        changeHoverColor('#ffffff9b');
    }, 300);
}

function closeFilterPanel() {
    panelOpen = false
    filterPanel.style.width = '0px'
    filterPanelButton.style.marginRight = '1vw'
    filterPanelButton.style.transform = 'rotate(180deg)'

    changeHoverColor('#aba8a6');
    setTimeout(function () {
        changeHoverColor('#ffffff9b');
    }, 300);
}

filterPanelButton.addEventListener('click', function () {
    if (!panelOpen) {
        openFilterPanel()
    } else {
        closeFilterPanel()
    }
})


let menuOpen = false

function openMenu() {
  menuOpen = true
  overlay.style.display = 'block'
  sidebar.style.width = '50vw'
  setTimeout(function() {
    jsEditor.refresh();
  },100);
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
  localStorage.setItem('prevEditSave', localStorage.getItem('savedEditCode'));
  localStorage.setItem('savedEditCode', code);
  location.reload();

  });

document.getElementById('prevSaveButton').addEventListener('click', () => {

    localStorage.setItem('savedEditCode', localStorage.getItem('prevEditSave'));
    location.reload();
  
});

document.getElementById('resetButton').addEventListener('click', () => {

    localStorage.setItem('savedEditCode', '');
    location.reload();
  
});
  
  window.addEventListener('DOMContentLoaded', (event) => {
  // retrieve the saved code from local storage
  const savedEditCode = localStorage.getItem('savedEditCode');
  if (savedEditCode) {
    // if there's saved code, load it into the editor
    jsEditor.setValue(savedEditCode);
    jsEditor.refresh;
  }
});


let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;


const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

const brightnessFunc = () => {
    brightness = 50;
}

const saturationFunc = () => {
    saturation = 50;
}

const inversionFunc = () => {
    inversion = 50;
}

const grayscaleFunc = () => {
    grayscale = 50;
}

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", removeImage);


if(!(localStorage.getItem('savedEditCode')===null)){
    console.log(localStorage.getItem('savedEditCode'));
    eval(localStorage.getItem('savedEditCode'));
};