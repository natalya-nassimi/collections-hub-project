import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collectionsShow, collectionsDelete } from '../../services/collections'
import { UserContext } from '../../contexts/UserContext'
import { itemDelete } from '../../services/items'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import './CollectionShow.css'
import { likeItem, unlikeItem } from '../../services/items'

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

    const toggleLike = async (item) => {
        try {
            const res = item.liked
                ? await unlikeItem(collection.id, item.id)
                : await likeItem(collection.id, item.id)

            setCollection(prev => ({
                ...prev,
                items: prev.items.map(i =>
                    i.id === item.id
                        ? {
                            ...i,
                            liked: !item.liked,
                            likes_count: res.data.likes_count
                        }
                        : i
                )
            }))
        } catch {
            console.log(error.response.data)
            setError('Could not like')
        }

    }

    const renderItemDetails = (item) => {
        if (!item.details) return null

        return Object.entries(item.details).map(([key, value]) => {
            if (!value) return null

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

    if (loading) return <LoadingIcon />
    if (error) return <p>{error}</p>

    return (
        <div className="collection-show">
            <div className='collection-show-content'>
                <h1 className='collection-show-title'>{collection.title}</h1>
                {collection.description && <p className='collection-show-description'>{collection.description}</p>}


                {collection.image && (
                    <img
                        src={collection.image}
                        alt={collection.title}
                        className="collection-image"
                    />
                )}
                <div className='collection-show-actions'>
                    {user && user.id === collection.user && (
                        <Link to={`/collections/${collection.id}/edit`} className='collection-show-edit'>
                            Edit Collection
                        </Link>
                    )}

                    {user && user.id === collection.user && (
                        <button onClick={handleDelete} className='collection-show-delete'>
                            Delete Collection
                        </button>
                    )}
                </div>
            </div>

            <h2 className='item-title'>Items</h2>

            {user && collection.user === user.id && (
                <Link to={`/collections/${collection.id}/items/new`}>
                    Add Item
                </Link>
            )}

            {!user && (
                <>
                    <p className='hint'>Only the owner can add items!</p>
                    <Link to='/sign-in'>Sign in to create your own collection!</Link>
                </>
            )}

            {collection.items.length === 0 ? (
                <p className='empty-state'>No items yet</p>
            ) : (
                <div className="items-grid">
                    {collection.items.map(item => {
                        return (
                            <div key={item.id} className="item-card">
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

                                <p>{item.likes_count} likes</p>
                                {user && (
                                    <button onClick={() => toggleLike(item)}>
                                        {item.liked ? '💔 Unlike' : '❤️ Like'}
                                    </button>
                                )}

                                {user && user.id === collection.user && (
                                    <>
                                        <Link to={`/collections/${collection.id}/items/${item.id}/edit`}>Edit Item</Link>
                                        <button onClick={() => handlDeleteItem(item.id)}>Delete Item</button>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default CollectionShow