import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collectionsCreate } from '../../services/collections'
import { UserContext } from '../../contexts/UserContext'
import ImageUploadField from '../ImageUploadField/ImageUploadField';
import './CollectionCreate.css'

const CollectionCreate = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user) {
            navigate('/sign-in')
        }
    }, [user, navigate])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    })
    
    const [error, setError] = useState(null)
    if (!user) return null

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }


    const setCollectionImage = (imageURL) => {
        setFormData({ ...formData, image: imageURL})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await collectionsCreate(formData)
            navigate(`/collections/${res.data.id}`)
        } catch (error) {
            setError('Could not create collection')

        }
    }

    return (
        <div className='collection-create'>
            <h1 className='collection-create-title'>Create Collection</h1>

            {error && <p className='collection-create-error'>{error}</p>}

            <form onSubmit={handleSubmit} className='collection-create-form'>
                <input className='collection-create-input' name='title' placeholder='Title' value={formData.title} onChange={handleChange} required />
                
                <textarea className='collection-create-textarea' name='description' placeholder='Description (optional)' value={formData.description} onChange={handleChange} />
                
                <p className='collection-create-pic-message'>Upload an Image Below (optional)</p>
                <ImageUploadField
                    className='collection-create-image'
                    labelText=""
                    fieldName='Image'
                    setImage={setCollectionImage}
                    existingImage={formData.image}
                />
                
                <button className='collection-create-button' type='submit'>Create</button>
            </form>

        </div>
    )
}

export default CollectionCreate