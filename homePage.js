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