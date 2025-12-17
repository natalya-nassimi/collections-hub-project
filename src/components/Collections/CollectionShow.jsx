import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collectionsShow, collectionsDelete } from '../../services/collections'
import { UserContext } from '../../contexts/UserContext'
import { itemDelete } from '../../services/items'

const CollectionShow = () => {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [collection, setCollection] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    const renderItemDetails = (item) => {
        if (!item.details) return null

        return Object.entries(item.details).map(([key, value]) => {
            if (!value) return null

            // Make labels human-readable
            const label = key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, char => char.toUpperCase())

            return (
                <p key={key} className="item-detail">
                    <strong>{label}:</strong> {value}
                </p>
            )
        })
    }

    const handleDelete = async () => {
        if (!window.confirm('Delete this collection?')) return

        try {
            await collectionsDelete(collection.id)
            navigate('/collections')
        } catch (error) {
            setError('Could not delete this collection')
        }
    }

    const handlDeleteItem = async (itemId) => {
        if (!window.confirm('Delete this item?')) return

        try {
            await itemDelete(collection.id, itemId)
            setCollection(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== itemId)
            }))
        } catch (error) {
            setError('Could not delete item')
        }
    }

    if (loading) return <p>Loading collection...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="collection-show">
            <h1>{collection.title}</h1>

            {user && user.id === collection.user && (
                <Link to={`/collections/${collection.id}/edit`}>
                    Edit Collection
                </Link>
            )}

            {user && user.id === collection.user && (
                <button onClick={handleDelete}>
                    Delete Collection
                </button>
            )}

            {collection.description && <p>{collection.description}</p>}

            {collection.image && (
                <img
                    src={collection.image}
                    alt={collection.title}
                    className="collection-image"
                />
            )}

            <h2>Items</h2>

            {user && collection.user === user.id && (
                <Link to={`/collections/${collection.id}/items/new`}>
                    Add Item
                </Link>
            )}

            {user && collection.user !== user.id &&(
                <>
                    <p className='hint'>Only the owner can add items!</p>
                    <Link to='/sign-in'>Sign in to create your own collection!</Link>
                </>
            )}

            {collection.items.length === 0 ? (
                <p>No items yet</p>
            ) : (
                <div className="items-grid">
                    {collection.items.map(item => {
                        return(
                        <div key={item.id} className="item-card">
                            {/* Image */}
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="item-image"
                                />
                            )}
                            <h3>{item.title}</h3>
                            <p className="item-type">{item.item_type}</p>

                            <div className="item-details">
                                {renderItemDetails(item)}
                            </div>

                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="item-link"
                                >
                                    Open link
                                </a>
                            )}

                            {user && user.id === collection.user && (
                                <>
                                    <Link to={`/collections/${collection.id}/items/${item.id}/edit`}>Edit Item</Link>

                                    <button onClick={() => handlDeleteItem(item.id)}>Delete Item</button>
                                </>
                            )}
                        </div>
                )})}
                </div>
            )}
        </div>
    )
}

    export default CollectionShow