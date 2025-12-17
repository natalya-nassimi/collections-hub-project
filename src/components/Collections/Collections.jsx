import { useContext, useEffect, useState } from 'react'
import { collectionsIndex } from '../../services/collections'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
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

if (loading) return <p>Loading collections...</p>
if (error) return <p>{error}</p>

return (
    <div className='collections-page'>
        <h1 className='collections-title'>Collections</h1>
        {user ? (
            <Link to='/collections/new'>Create collection</Link>
        ) : ( 
            <Link to='/sign-in'>Sign in to create a collection</Link>
        )}
        {collections.length === 0 ? (
            <p>No collections yet</p>
        ) : (
            <div className='collections-grid'>
                {collections.map(collection => (
                    <div key={collection.id} className='collection-card'>
                        {collection.image && (
                            <img
                            src ={collection.image}
                            alt ={collection.title}
                            />
                        )}
                        
                        <div className='collection-content'>
                            <Link to={`/collections/${collection.id}`} className='collection-link'>Link</Link>
                            {collection.title}
                            {collection.description && <p>{collection.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        )}

    </div>
)
}

export default Collections