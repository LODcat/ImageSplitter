// This file contains a common interface to handle images
function splitImage(fileURL, xDivider, yDivider) {
    // Create cavans
    parentElem = document.getElementById('cropped');
    cropViewports = [];
    for (var j = 0; j < yDivider; j++) {
        for (var i = 0; i < xDivider; i++) {
            canvasId = 'cropped-' + i + '-' + j;
            canvasElem = document.createElement('canvas');
            canvasElem.setAttribute('id', canvasId);
            parentElem.appendChild(canvasElem);
            cropViewports.push(
                {
                    'canvasId': canvasId,
                    'i': i,
                    'j': j
                }
            );
        }
    }

    // crop images
    var image = new Image()
    image.src = fileURL;
    image.onload = function () {
        cropViewports.forEach(element => {
            canvas = document.getElementById(element.canvasId);
            ctx = canvas.getContext('2d');
            const xStep = this.width / xDivider;
            const yStep = this.height / yDivider;
            const xOffset = xStep * (element.i);
            const yOffset = yStep * (element.j);
            ctx.drawImage(image,
                xOffset, yOffset,   // Start at 70/20 pixels from the left and the top of the image (crop),
                xStep, yStep,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                0, 0,     // Place the result at 0, 0 in the canvas,
                100, 100); // With as width / height: 100 * 100 (scale) 
        });
    };
}