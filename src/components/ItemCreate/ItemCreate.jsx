import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { itemCreate } from '../../services/items'
import ImageUploadField from '../ImageUploadField/ImageUploadField';
import './ItemCreate.css'

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

const REQUIRED_FIELDS = {
    'book': ['author', 'pages'],
    'music': ['artist'],
    'movie': ['director'],
    'game': ['platform'],
    'restaurant': ['cuisine', 'location'],
    'travel': ['country'],
    'workout': ['exercise'],
    'product': ['brand'],
    'event': ['event_name'],
}

const ItemCreate = () => {
    const { collectionId } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        item_type: '',
        image: '',
        link: '',
        details: {},
    })

    const [error, setError] = useState(null)

    const handleBaseChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'item_type' ? { details: {} } : {})
        }))
    }

    const handleDetailsChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            details: {
                ...prev.details,
                [name]: value,
            }
        }))
    }

    const setItemImage = (imageURL) => {
        setFormData({ ...formData, image: imageURL})
    }

    const validateForm = () => {
        const requiredFields = REQUIRED_FIELDS[formData.item_type] || []
        const missing = requiredFields.filter(
            field => !formData.details[field]
        )

        if (missing.length > 0) {
            setError(`Missing required fields: ${missing.join(', ')}`)
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        try {
            await itemCreate(collectionId, formData)
            navigate(`/collections/${collectionId}`)
        } catch (error) {
            console.log('FULL ERROR:', error.response?.data)
            console.error(error)
            setError('Could not create item')
        }
    }

    const item_type = formData.item_type

    return (
        <div className='item-create'>
            <h1 className='item-create-title'>Add Item</h1>

            {error && <p className='item-create-error'>{error}</p>}

            <form className='item-create-form' onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleBaseChange}
                    className='item-create-input'
                    required
                />

                <select
                    name="item_type"
                    value={formData.item_type}
                    onChange={handleBaseChange}
                    className='item-create-select'
                    required
                >
                    <option value="">Select type</option>
                    {Object.keys(ITEM_TYPE_FIELDS).map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                
                <div className='item-create-image'>
                <p className='item-create-pic-message'>Upload an Image Below (optional)</p>
                <ImageUploadField
                    labelText=""
                    fieldName='Image'
                    setImage={setItemImage}
                    existingImage={formData.image}
                />
                </div>

                <input
                    type='text'
                    name='link'
                    placeholder='Link'
                    value={formData.link}
                    onChange={handleBaseChange}
                    className='item-create-input'
                />

                {formData.item_type &&
                    ITEM_TYPE_FIELDS[formData.item_type].map(field => (
                        <input
                            key={field.name}
                            name={field.name}
                            placeholder={field.label}
                            type={field.type || 'text'}
                            value={formData.details[field.name] || ''}
                            onChange={handleDetailsChange}
                            className='item-create-input'
                        />
                    ))}

                <button type="submit" className='item-create-button'>Create Item</button>
            </form>
        </div>
    )

}

export default ItemCreate