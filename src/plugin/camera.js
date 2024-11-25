import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

const pickImage = async () => {
    try {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri, // Use .Uri to get the image's URI
            source: CameraSource.Photos, // Use the Photos source to pick from gallery
        });

        const imageUrl = image.webPath;

        document.getElementById("selectedImage").src = imageUrl;

    } catch (error) {
        console.error("error picking imahe hhh", error)
    }
}

document.getElementById('uploadButton').addEventListener('click', pickImage);

/* 
 
  <img id="selectedImage" src="" alt="Selected Image" />
  <button id="imagePickerButton">Pick an Image</button>
*/