import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { itemUpdate } from '../../services/items'
import { collectionsShow } from '../../services/collections'
import ImageUploadField from '../ImageUploadField/ImageUploadField'

const ITEM_TYPE_FIELDS = {
    book: [
        { name: 'author', label: 'Author' },
        { name: 'pages', label: 'Pages', type: 'number' },
        { name: 'genre', label: 'Genre' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    music: [
        { name: 'artist', label: 'Artist' },
        { name: 'album', label: 'Album' },
        { name: 'genre', label: 'Genre' },
        { name: 'release_year', label: 'Release Year', type: 'number' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    movie: [
        { name: 'director', label: 'Director' },
        { name: 'genre', label: 'Genre' },
        { name: 'release_year', label: 'Release Year', type: 'number' },
        { name: 'rating', label: 'Rating', type: 'number' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    travel: [
        { name: 'country', label: 'Country' },
        { name: 'city', label: 'City' },
        { name: 'destination', label: 'Destination' },
        { name: 'date', label: 'Date', type: 'datetime-local' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    workout: [
        { name: 'exercise', label: 'Exercise' },
        { name: 'muscle_group', label: 'Muscle Group' },
        { name: 'sets', label: 'Sets', type: 'number' },
        { name: 'reps', label: 'Reps', type: 'number' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    restaurant: [
        { name: 'location', label: 'Location' },
        { name: 'cuisine', label: 'Cuisine' },
        { name: 'rating', label: 'Rating', type: 'number' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    product: [
        { name: 'brand', label: 'Brand' },
        { name: 'price', label: 'Price' },
        { name: 'category', label: 'Category' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    event: [
        { name: 'event_name', label: 'Event Name' },
        { name: 'location', label: 'Location' },
        { name: 'date', label: 'Date', type: 'datetime-local' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    game: [
        { name: 'platform', label: 'Platform' },
        { name: 'genre', label: 'Genre' },
        { name: 'release_year', label: 'Release Year', type: 'number' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

    recipe: [
        { name: 'cuisine', label: 'Cuisine' },
        { name: 'rating', label: 'Rating' },
        { name: 'thoughts', label: 'Thoughts' }
    ],

}

const ItemEdit = () => {
    const { collectionId, itemId } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        item_type: '',
        image: '',
        link: '',
        details: {}
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchItemFromCollection = async () => {
            try {
                const res = await collectionsShow(collectionId)
                const item = res.data.items.find(
                    i => i.id === Number(itemId)
                )

                if (!item) {
                    setError('Item not found')
                    return
                }

                setFormData({
                    title: item.title,
                    item_type: item.item_type,
                    image: item.image || '',
                    link: item.link || '',
                    details: item.details || {}
                })
            } catch (error) {
                setError('Could not load item')
            } finally {
                setLoading(false)
            }
        }
        fetchItemFromCollection()
    }, [collectionId, itemId])

    const handleBaseChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDetailsChange = e => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            details: {
                ...prev.details,
                [name]: value
            }
        }))
    }

    const setItemImage = (imageURL) => {
        setFormData({ ...formData, image: imageURL})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await itemUpdate(collectionId, itemId, formData)
            navigate(`/collections/${collectionId}`)
        } catch (error) {
            console.log(error.response.data)
            setError('Could not update item')
        }
    }

    if (loading) return <p>Loading item...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Edit Item</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name='title'
                    value={formData.title}
                    onChange={handleBaseChange}
                    required
                />

                <ImageUploadField
                    labelText="Upload an image"
                    fieldName='Image'
                    setImage={setItemImage}
                    existingImage={formData.image}
                />

                <input
                    name='link'
                    value={formData.link}
                    onChange={handleBaseChange}
                    placeholder='Link'
                />

                {ITEM_TYPE_FIELDS[formData.item_type]?.map(field => (
                    <input
                        key={field.name}
                        name={field.name}
                        type={field.type || 'text'}
                        value={formData.details[field.name] || ''}
                        onChange={handleDetailsChange}
                        placeholder={field.label}
                    />
                ))}

                <button type='submit'>Save Changes</button>

            </form>

        </div>
    )
}

export default ItemEdit