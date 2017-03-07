   
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var bkg_logo, tessuto;
var newColor = "purple";

var imageURLs = [];
var imagesOK = 0;
var imgs = [];
imageURLs.push("./imgs/fabric/t2.jpg");
imageURLs.push("./imgs/fabric/t1.jpg");
imageURLs.push("./imgs/tx/b01_overlay.png");
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
        bkg_logo = imgs[0];
        tessuto = imgs[1];
        overlay = imgs[2];
        start();
    }
};


function start() {

    // save the context state
    ctx.save();

    // draw the overlay
    ctx.drawImage(overlay,0,0);
   
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

    // draw the full tessuto
    // This will NOT overwrite any existing purple overlay pixels
    ctx.drawImage(tessuto, 0, 0);

    // draw the bkg_logo
    // This will NOT replace any existing pixels
    // The purple overlay will not be overwritten
    // The blue logo will not be overwritten
    ctx.drawImage(bkg_logo, 0, 0);

    // restore the context to it's original state
    ctx.restore();

}
        $("#canvas").click(function(){
            newColor='#'+Math.floor(Math.random()*16777215).toString(16);
            start();
        });       

