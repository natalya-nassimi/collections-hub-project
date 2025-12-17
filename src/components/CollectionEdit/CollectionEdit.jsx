import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { collectionsShow, collectionsUpdate } from '../../services/collections'
import ImageUploadField from '../ImageUploadField/ImageUploadField'

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

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <h1>Edit Collection</h1>
            {error & <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                />

                <ImageUploadField
                    labelText="Upload an image"
                    fieldName='Image'
                    setImage={setCollectionImage}
                    existingImage={formData.image}
                />

                <button type='submit'>Save Changes</button>

            </form>
        </div>
    )
}

export default CollectionEdit