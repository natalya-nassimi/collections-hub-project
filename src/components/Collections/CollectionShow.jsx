import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collectionsShow } from '../../services/collections'

const CollectionShow = () => {
    const { id } = useParams()

    const [collection, setCollection] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const res = await collectionsShow(id)
                setCollection(res.data)
            } catch (error) {
                console.error(error)
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
            {collection.items.length === 0 ? (
                <p>No items yet</p>
            ) : (
                <ul>
                    {collection.items.map(item => (
                        <li key={item.id}>
                            <p>{item.title}</p> ({item.item_type})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CollectionShow