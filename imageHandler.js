// This file contains a common interface to handle images
function splitImage(fileURL, xDivider, yDivider = 0, gridSize = 100, gridPadding = 5) {
    // crop images
    dropZone = document.getElementById("drop_zone");
    parentElem = document.getElementById('image_display');
    var image = new Image()
    image.src = fileURL;
    image.onload = function () {
        // Remove message element
        messageElem = document.getElementById("drop_message")
        messageElem.remove();
        // Compute yDivider 
        yDivider = yDivider == 0 ? computeYDivider(xDivider, image.width, image.height) : yDivider;
        // Set grid attribute on parent
        var columnStyle = "";
        var rowStyle = "";
        var width = 0.0;
        var height = 0.0;
        for(var i = 0; i < xDivider; i++)
        {
            columnStyle += (gridSize+gridPadding) + "px ";
            width += gridSize + gridPadding;
        }
        for(var i = 0; i < yDivider; i++)
        {
            rowStyle += (gridSize+gridPadding) + "px ";
            height += gridSize + gridPadding;
        }
        // resize dropzone
        dropZone.style.width = width+8+"px";
        dropZone.style.height = height+8+"px";
        parentElem.style.gridTemplateColumns = columnStyle;
        parentElem.style.gridTemplateRows = rowStyle;

        for (var j = 0; j < yDivider; j++) {
            for (var i = 0; i < xDivider; i++) {
                canvasId = 'cropped-' + i + '-' + j;
                canvas = document.createElement('canvas');
                canvas.setAttribute('id', canvasId);
                parentElem.appendChild(canvas);
                ctx = canvas.getContext('2d');

                const xStep = this.width / xDivider;
                const yStep = this.height / yDivider;
                ctx.canvas.width= gridSize;
                ctx.canvas.height = gridSize;
                const xOffset = xStep * i;
                const yOffset = yStep * j;
                ctx.drawImage(image,
                    xOffset, yOffset,   // Start at 70/20 pixels from the left and the top of the image (crop),
                    xStep, yStep,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                    0, 0,     // Place the result at 0, 0 in the canvas,
                    gridSize, gridSize); // With as width / height: 100 * 100 (scale) 
            }
        }
    };
}

function computeYDivider(xDivider, imgWidth, imageHeight)
{
    step = imgWidth / xDivider;
    return Math.ceil(imageHeight / step);

}