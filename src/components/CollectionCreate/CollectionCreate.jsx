import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collectionsCreate } from '../../services/collections'

const CollectionCreate = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    })

    const [error, setError] = useState(null)

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await collectionsCreate(formData)
            navigate(`/collections/${res.data.id}`)
        } catch (error) {
            console.error(error)
            setError('Could not create collection')
            
        }
    }

    return (
        <div>
            <h1>Create Collection</h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input name ='title' placeholder='Title' value={formData.title} onChange={handleChange} required />
                <textarea name='description' placeholder='Description (optional)' value={formData.description} onChange={handleChange} />
                <input name='image' placeholder='Image (optional)' value={formData.image} onChange={handleChange} />
                <button type='submit'>Create</button>
            </form>

        </div>
    )
}

export default CollectionCreate