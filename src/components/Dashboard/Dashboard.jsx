import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { getMyProfile } from '../../services/profile'
import { collectionsIndex } from '../../services/collections'

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [profile, setProfile] = useState(null)
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        if (!user) navigate('sign-in')
    }, [user, navigate])
    
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const [profileRes, collectionsRes] = await Promise.all([
                    getMyProfile(),
                    collectionsIndex()
                ])

                setProfile(profileRes.data)

                const myCollections = collectionsRes.data.filter(
                    c => c.user === user.id
                )

                setCollections(myCollections)
            } finally {
                setLoading(false)
            }    
        }

        if (user) fetchDashboard()
        } ,[user])

        if (!user) return null
        if(loading) return <p>Loading dashboard...</p>

    return (
        <div>
            <h1>{user.username}'s Dashboard</h1>

            <section>
                <h2>Profile</h2>
                <p>{profile?.bio || 'Edit your profile to add a bio'}</p>
                <Link to='profile/edit'>Edit profile</Link>
            </section>

            <section>
                <h2>My Collections</h2>
                {collections.length === 0 ? (
                    <p>You have not created any collections yet</p>
                ) : (
                    <ul>
                        {collections.map(c => (
                            <li key={c.id}>
                                <Link to={`/collections/${c.id}`}>{c.title}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default Dashboard

