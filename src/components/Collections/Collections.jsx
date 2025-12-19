import { useContext, useEffect, useState } from 'react'
import { collectionsIndex } from '../../services/collections'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import './Collections.css'

const Collections = () => {
    const { user } = useContext(UserContext)
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await collectionsIndex()
                setCollections(res.data)
            }
            catch (error) {
                console.error(error)
                setError('Could not load collections')
            }
            finally {
                setLoading(false)
            }
        }
        fetchCollections()
    }, [])

    if (loading) return <LoadingIcon />
    if (error) return <p>{error}</p>

    return (
        <div className='collections-page'>
            <div className='collections-header'>
                {user ? (
                    <Link to='/collections/new' className='primary-action'>+ Create a Collection</Link>
                ) : (
                    <Link to='/sign-in' className='primary-action'>Sign in to create a collection</Link>
                )}
            </div>
            {collections.length === 0 ? (
                <p>No collections yet</p>
            ) : (
                <div className='collections-grid'>
                    {collections.map(collection => (
                        <Link
                            key={collection.id}
                            to={`/collections/${collection.id}`}
                            className='collection-card'
                        >

                            {collection.image && (
                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className='collection-card-image'
                                />
                            )}

                            <div className='collection-card-content'>
                                <h3>{collection.title}</h3>
                                {collection.description && (
                                    <p className='collection-description'>{collection.description}</p>
                                )}
                                <p className='collection-owner'>by <span>@{collection.username}</span></p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Collections