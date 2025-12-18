import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { collectionsShow, collectionsUpdate } from '../../services/collections'
import ImageUploadField from '../ImageUploadField/ImageUploadField'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import './CollectionEdit.css'

const CollectionEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const res = await collectionsShow(id)
                setFormData({
                    title: res.data.title,
                    description: res.data.description || '',
                    image: res.data.image || ''
                })
            } catch (error) {
                console.log(error.response.data)
                setError('Could not load collection')
            } finally {
                setLoading(false)
            }
        }

        fetchCollection()
    }, [id])

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const setCollectionImage = (imageURL) => {
        setFormData({ ...formData, image: imageURL})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await collectionsUpdate(id, formData)
            navigate(`/collections/${id}`)
        } catch (error) {
            setError('Could not update collection')
        }
    }

    if (loading) return <LoadingIcon />

    return (
        <div className='collection-edit'>
            <h1 className='collection-edit-title'>Edit Collection</h1>
            {error && <p className='collection-edit-error'>{error}</p>}

            <form className='collection-edit-form' onSubmit={handleSubmit}>
                <input
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    className='collection-edit-input'
                    required
                />

                <textarea
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    className='collection-edit-textarea'
                />
                
                <p className='collection-edit-pic-message'>Upload an image below (optional)</p>
                <div className='collection-edit-image'>
                <ImageUploadField
                    labelText=""
                    fieldName='Image'
                    setImage={setCollectionImage}
                    existingImage={formData.image}
                />
                </div>

                <button className='collection-edit-button' type='submit'>Save Changes</button>

            </form>
        </div>
    )
}

export default CollectionEdit