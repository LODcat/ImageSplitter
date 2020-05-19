// This file contains a common interface to handle images
function splitImage(fileURL, xDivider, yDivider) {
    // Create cavans
    parentElem = document.getElementById('cropped');
    cropViewports = [];
    for (var i = 0; i < xDivider; i++) {
        for (var j = 0; j < yDivider; j++) {
            canvasId = 'cropped-' + i + '-' + j;
            canvasElem = document.createElement('canvas');
            canvasElem.setAttribute('id', canvasId);
            parentElem.appendChild(canvasElem);
            cropViewports.push(
                {
                    'canvasId': '#' + canvasId,
                    'i': i,
                    'j': j
                }
            );
        }
    }

    // crop images
    cropViewports.forEach(element => {
        Caman(element.canvasId, fileURL, function () {
            var xStep = this.imageWidth() / xDivider;
            var yStep = this.imageHeight() / yDivider;
            var xOffset = xStep * (element.i+1);
            var yOffset = yStep * (element.j+1);
            console.log(canvasId+": "+xOffset+"-"+yOffset);
            this.crop(xStep, yStep, xOffset, yOffset);
            //this.crop(150, 150, 300, 300);
            this.render();
        });

    });



}