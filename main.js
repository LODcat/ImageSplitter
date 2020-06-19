const fileSelect = document.getElementById("drop_zone"),
  fileElem = document.getElementById("fileElem"),
  imageCanvas = document.getElementById("imageCanvas");

function handleFile(fileURL) {
  splitImage(fileURL, 3, 0, 600, 1);
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

// Create glsl canvas
var canvas = document.getElementById("glsl");
var sandbox = new GlslCanvas(canvas);
// Load only the Fragment Shader
var string_frag_code = "void main(){gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}";
sandbox.load(string_frag_code);

//// Load a Fragment and Vertex Shader
//var string_vert_code = "attribute vec4 a_position; main(){\ggl_Position = a_position;\n}\n";
//sandbox.load(string_frag_code, string_vert_code);
