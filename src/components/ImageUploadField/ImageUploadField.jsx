import { uploadImage } from '../../services/cloudinary'
import './ImageUploadField.css'

export default function ImageUploadField({ labelText = 'Upload an image', fieldName = 'image', setImage, existingImage }) {
    
    const handleFileUpload = async(e) => {
        try {
            const file = e.target.files[0]
            const { data } = await uploadImage(file)
            setImage(data.secure_url)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className='form-control'>
            <label htmlFor={fieldName}>{labelText}</label>
            {existingImage && (
                <img src={existingImage} alt="currentImage" className="image-upload-preview" />
            )}
            <input type='file' name={fieldName} id={fieldName} onChange={handleFileUpload} />
        </div>
        </>
    )
}