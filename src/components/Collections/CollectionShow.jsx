import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { collectionsShow } from '../../services/collections'
import { UserContext } from '../../contexts/UserContext'

const CollectionShow = () => {
    const { user } = useContext(UserContext)
    const { id } = useParams()

    const [collection, setCollection] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const FIELD_LABELS = {
        thoughts: 'Thoughts',
        rating: 'Rating',
        genre: 'Genre',
        release_year: 'Release year'
    }

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const res = await collectionsShow(id)
                setCollection(res.data)
            } catch (error) {
                setError('Could not load collection')
            } finally {
                setLoading(false)
            }
        }
        fetchCollection()
    }, [id])


    if (loading) return <p>Loading collection...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>{collection.title}</h1>
            {collection.description && <p>{collection.description}</p>}

            {collection.image && (
                <img
                    src={collection.image}
                    alt={collection.title}
                />
            )}

            <h2>Items</h2>

            {!user ? (
                <Link to='/sign-in'>Sign in to add items</Link>
            ) : (
                <Link to={`/collections/${collection.id}/items/new`}>Add item</Link>
            )}

            {collection.items.length === 0 ? (
                <p>No items yet</p>
            ) : (
                <div className='items-grid'>
                    {collection.items.map(item => (
                        <div key={item.id} className='item-card'>
                            {item.image && (
                                <img src={item.image} alt={item.title} />
                            )}


                            <h3>{item.title}</h3>
                            <p className='item-type'>{item.item_type}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CollectionShow