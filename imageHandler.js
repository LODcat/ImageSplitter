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
            const xStep = this.imageWidth() / xDivider;
            const yStep = this.imageHeight() / yDivider;
            const xOffset = xStep * element.i;
            const yOffset = yStep * element.j;
            //console.log(this.imageWidth());
            this.crop(xStep, yStep, xOffset, yOffset);

            this.brightness(10).render();
        });

    });



}