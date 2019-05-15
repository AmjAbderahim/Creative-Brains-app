document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
   document.getElementById('cameraTakePicture').addEventListener('click', cameraTakePicture);
}

function cameraTakePicture() { 
    navigator.camera.getPicture(onSuccess, onFail, 
                                {  
                                    quality: 75,
                                    destinationType: Camera.DestinationType.DATA_URL,
                                    sourceType: Camera.PictureSourceType.CAMERA,
                                    allowEdit: true,
                                    encodingType: Camera.EncodingType.JPEG,
                                    targetWidth: 300,
                                    targetHeight: 300,
                                    popoverOptions: CameraPopoverOptions,
                                    saveToPhotoAlbum: false
                                });  
    
    function onSuccess(imageData) { 
       var image = document.getElementById('img_post_preview'); 
       image.src = "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
}