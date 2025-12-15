import { useEffect, useState } from 'react'
import { collectionsIndex } from '../../services/collections'
import { Link } from 'react-router-dom'

const Collections = () => {
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
    <div>
        <h1>Collections</h1>
        <Link to='/collections/new'>Create collection</Link>
        {collections.length === 0 ? (
            <p>No collections yet</p>
        ) : (
            <ul>
                {collections.map(collection => (
                    <li key={collection.id}>
                        <h3>
                            <Link to={`/collections/${collection.id}`}>
                            {collection.title}
                            </Link>
                        </h3>
                        {collection.description && (
                            <p>{collection.description}</p>
                        )}

                        {collection.image && (
                            <img
                            src ={collection.image}
                            alt ={collection.title}
                            />
                        )}
                    </li>
                ))}
            </ul>
        )}

    </div>
)
}

export default Collections