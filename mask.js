   
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var truck, logo, overlay;
var newColor = "purple";

var imageURLs = [];
var imagesOK = 0;
var imgs = [];
imageURLs.push("./imgs/b01_cn.png");
imageURLs.push("./imgs/tx/b01_t01.png");
loadAllImages();

function loadAllImages() {
    for (var i = 0; i < imageURLs.length; i++) {
        var img = new Image();
        imgs.push(img);
        img.onload = function () {
            imagesOK++;
            imagesAllLoaded();
        };
        img.src = imageURLs[i];
    }
}

var imagesAllLoaded = function () {
    if (imagesOK == imageURLs.length) {
        // all images are fully loaded an ready to use
        truck = imgs[0];
        logo = imgs[1];
        start();
    }
};


function start() {

    // save the context state
    ctx.save();

    // change composite mode to source-in
    // any new drawing will only overwrite existing pixels
    ctx.globalCompositeOperation = "source-in";

    // draw a purple rectangle the size of the canvas
    // Only the overlay will become purple
    ctx.fillStyle = newColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // change the composite mode to destination-atop
    // any new drawing will not overwrite any existing pixels
    ctx.globalCompositeOperation = "destination-atop";

    // draw the full logo
    // This will NOT overwrite any existing purple overlay pixels
    ctx.drawImage(logo, 0, 0, 500, 500);

    // draw the truck
    // This will NOT replace any existing pixels
    // The purple overlay will not be overwritten
    // The blue logo will not be overwritten
    ctx.drawImage(truck, 0, 0, 500, 500);

    // restore the context to it's original state
    ctx.restore();

}
        $("#canvas").click(function(){
            newColor='#'+Math.floor(Math.random()*16777215).toString(16);
            start();
        });       

