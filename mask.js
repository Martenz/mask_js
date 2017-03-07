   
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var bkg_logo, tessuto;
var newColor = "purple";
var hhc = $('canvas').height();

var imageURLs = [];
var imagesOK = 0;
var imgs = [];

var fabrics = [];

var nimg = 0;

var overlay = new Image();

overlay.src = "./imgs/b01_overlay.png";

imageURLs.push("./imgs/fabric/t1.png");
imageURLs.push("./imgs/fabric/t2.png");
imageURLs.push("./imgs/fabric/t3.png");

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
        start();
    }
};


function start() {

    // save the context state
    ctx.save();

    //clean the canvas
    ctx.clearRect(0, 0, hhc, hhc);
   
    // draw the overlay
    ctx.drawImage(overlay,0,0,hhc,hhc);
   
    // change composite mode to source-in
    // any new drawing will only overwrite existing pixels
    ctx.globalCompositeOperation = "source-in";

    // draw a purple rectangle the size of the canvas
    // Only the overlay will become purple
    //ctx.fillStyle = newColor;
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    // change the composite mode to destination-atop
    // any new drawing will not overwrite any existing pixels
    ctx.globalCompositeOperation = "destination-atop";

    // draw the full tessuto
    // This will NOT overwrite any existing purple overlay pixels
    //ctx.drawImage(tessuto, 0, 0,hhc,hhc);
    ctx.drawImage(imgs[nimg], 0, 0,hhc,hhc);

    // draw the bkg_logo
    // This will NOT replace any existing pixels
    // The purple overlay will not be overwritten
    // The blue logo will not be overwritten
    //ctx.drawImage(bkg_logo, 0, 0,hhc,hhc);

    // restore the context to it's original state
    ctx.restore();

}

/*$("#canvas").click(function(){
            nimg += 1; 
            //..the last element of the array is the main mask
            if ( nimg > imgs.length-1){
              nimg = 0;
            }
            //console.log(nimg);
            //newColor='#'+Math.floor(Math.random()*16777215).toString(16);
            start();
});*/

for (var i = 0; i < imageURLs.length; i++) {
   $('#tessuti').append('<img class="f-imgs" f_id=' + i.toString() + ' src="' + imageURLs[i] + '" width="30%"></img>')
}

$(".f-imgs").click(function(){
   //console.log($(this).attr("f_id"));
   nimg = parseInt($(this).attr("f_id"));
   start();
});

$('canvas').css('width','80%');
$('canvas').css('height','80%');
