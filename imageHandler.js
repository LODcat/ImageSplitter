// This file contains a common interface to handle images
// It returns the canvases that contains these tiles
function splitImage(fileURL, xDivider, yDivider = 0, gridSize = 200, gridPadding = 5) {
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
        for (var i = 0; i < xDivider; i++) {
            columnStyle += (gridSize + gridPadding) + "px ";
            width += gridSize + gridPadding;
        }
        for (var i = 0; i < yDivider; i++) {
            rowStyle += (gridSize + gridPadding) + "px ";
            height += gridSize + gridPadding;
        }
        // resize dropzone
        dropZone.style.width = width + 8 + "px";
        dropZone.style.height = height + 8 + "px";
        parentElem.style.gridTemplateColumns = columnStyle;
        parentElem.style.gridTemplateRows = rowStyle;

        var outputCanvases = [];
        for (var j = 0; j < yDivider; j++) {
            for (var i = 0; i < xDivider; i++) {
                canvasId = 'cropped-' + i + '-' + j;
                canvas = document.createElement('canvas');
                canvas.setAttribute('id', canvasId);
                parentElem.appendChild(canvas);
                ctx = canvas.getContext('2d');

                const xStep = this.width / xDivider;
                const yStep = this.height / yDivider;
                ctx.canvas.width = gridSize;
                ctx.canvas.height = gridSize;
                const xOffset = xStep * i;
                const yOffset = yStep * j;
                ctx.drawImage(image,
                    xOffset, yOffset,
                    xStep, yStep,
                    0, 0,
                    gridSize, gridSize);
                outputCanvases.push(canvas);
            }
        }

        // Add image to zip file
        var zip = new JSZip();
        var img = zip.folder("images");

        outputCanvases.forEach((canvas, idx) => {
            var imgData = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
            img.file(idx.toString().padStart(3, '0') + ".png", imgData, { base64: true });
        });

        var button = document.createElement("button"),
        icon = "<i class='fas fa-download'></i>";
        button.innerHTML = icon+" Download";
        button.addEventListener("click", function () {
            // Export to download
            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    // see FileSaver.js
                    saveAs(content, "splittedImages.zip");
                });
        });
        document.getElementById("dl_button").appendChild(button);
    };
}

function computeYDivider(xDivider, imgWidth, imageHeight) {
    step = imgWidth / xDivider;
    return Math.ceil(imageHeight / step);

}
