const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem"),
  imageCanvas = document.getElementById("imageCanvas");

function handleFile(fileURL) {
  imageCanvas.innerHTML = "";
  const img = document.createElement("img");
  imageCanvas.appendChild(img);
  img.src = fileURL;
  console.log(img.src);
  img.height = 300;
  splitImage(fileURL, 2, 2);

  // Revoke URL
  //img.onload = function () {
  //    URL.revokeObjectURL(this.src);
  //}
}
function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        handleFile(URL.createObjectURL(file));
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      //console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      handleFile(URL.createObjectURL(ev.dataTransfer.files[i]));
    }
  }
}

function dragOverHandler(ev) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

// Handle file upload

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
  if (!this.files.length) {
    imageCanvas.innerHTML = "<p>No files selected!</p>";
  } else {
    handleFile(URL.createObjectURL(this.files[0]));
  }
}