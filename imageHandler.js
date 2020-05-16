// This file contains a common interface to handle images
function cropImage(fileURL, width, height)
{
    Caman("#cropped", fileURL, function () {
        // manipulate image here
        //this.resize({
        //    width: 40,
        //    height: 40
        //  });
        // w, h, x, y
        this.crop(100, 100, 100, 100);
          
        this.brightness(10).render();
      });


}