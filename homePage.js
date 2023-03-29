var images = [{number: 1, link: "dasdasd"}, 
{number: 2, link: "dasdxxxsd"},
{number: 3, link: "dasdasd"}, 
{number: 4, link: "dasdxxxsd"},
{number: 5, link: "dasdasd"},
{number: 6, link: "dasdasd"}, 
{number: 7, link: "dasdxxxsd"},
{number: 8, link: "dasdasd"},
{number: 9, link: "dasdxxxsd"}];

images.forEach(image => {
    const img = document.createElement("img");
    img.src = "images/logo.png";
    img.id = "image" + image.number;
    img.style.cssText = 'width:100%;float: left;width: 25%;padding: 5px';
    img.class = "column";
    document.getElementById("imageList").appendChild(img);
});