const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

const boxes = document.querySelectorAll(".boxes button"),
boxPlay = document.querySelector(".run");


let boxOrder = [];
let waitForInput = false;
let tempBoxOrder = [];


var blockFunctions = {
    "NOP": function(){
    },
    "brightnessBox": function(){
        var inputValue = document.getElementById("brightnessNumb").value;
        brightness = parseInt(inputValue);
    },
    "saturationBox": function(){
        var inputValue = document.getElementById("saturationNumb").value;
        saturation = parseInt(inputValue);
    },
    "inversionBox": function(){
        var inputValue = document.getElementById("inversionNumb").value;
        inversion = parseInt(inputValue);
    },
    "grayscaleBox": function(){
        var inputValue = document.getElementById("grayscaleNumb").value;
        grayscale = parseInt(inputValue);
    },
    "whenPressedBox": function(){
        tempBoxOrder = [...boxOrder];
        boxOrder = [];
        console.log(boxOrder);
        console.log("whenpressed box");
        waitForInput = true;
    }
};

previewImg.onmousedown = function() {
    if(waitForInput){
        boxOrder = [...tempBoxOrder];
        tempBoxOrder = [];
        waitForInput = false;
        console.log("mouseDown");
        parseBlocks();
    }
};
  
const parseBlocks = () => {
    boxOrder.forEach(element => {
        if(waitForInput){
            return false;
        }
        let index = boxOrder.indexOf(element)
        boxOrder[index] = "NOP";
        blockFunctions[element]();
    });
    applyFilter();
};




let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        const boxToList = document.createElement("p");
        boxToList.innerText = box.innerText + ": " + box.nextElementSibling.value + "%";
        document.getElementById("boxList").appendChild(boxToList);
        boxOrder.push(box.id);
        document.querySelector(".active").classList.remove("active");
        console.log(boxOrder);
    })
});

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
    boxOrder = [];
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

const runBoxes = () => {
    const selectedBox = document.querySelector(".boxFilter .active");

    if(selectedBox.id === "brightnessBox") {
        brightnessFunc();
    } else if(selectedBox.id === "saturationBox") {
        saturationFunc();
    } else if(selectedBox.id === "inversionBox") {
        inversionFunc();
    } else if(selectedBox.id === "grayscaleBox") {
        grayscaleFunc();
    }
    waitForInput = false;
    applyFilter();
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
saveImgBtn.addEventListener("click", savePicture);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
boxPlay.addEventListener("click", parseBlocks);