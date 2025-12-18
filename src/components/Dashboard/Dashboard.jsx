import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { getMyProfile } from '../../services/profile'
import { collectionsIndex } from '../../services/collections'
import { AVATARS } from '../../constants/avatars'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import './Dashboard.css'

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [profile, setProfile] = useState(null)
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(true)

    const avatarKey = profile?.avatar
    const avatarSource = AVATARS.find(a => a.key === avatarKey)?.src ||
        AVATARS.find(a => a.key === 'defaultAvatar')?.src

    useEffect(() => {
        if (!user) navigate('/collections')
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
    }, [user])

    if (!user) return null
    if (loading) return <LoadingIcon />

    return (
        <div className='dashboard-page'>
            <header className='dashboard-header'>
                    <img src={avatarSource}
                        className='dashboard-avatar'
                        alt='user-avatar'
                    />

                <div className='dashboard-user'>
                    <h1>{user.username}</h1>
                    <p className='dashboard-bio'>{profile?.bio || 'Edit your profile to add a bio'}</p>
                    <Link to='/profile/edit' className='edit-profile'>Edit profile</Link>
                </div>
            </header>

            <section className='dashboard-collections'>
                <h2>My Collections</h2>
                {collections.length === 0 ? (
                    <p className='empty-state'>You have not created any collections yet</p>
                ) : (
                    <div className='collections-grid'>
                        {collections.map(c => (
                            <Link
                                to={`/collections/${c.id}`}
                                key={c.id}
                                className='collection-card'
                            >
                                {c.image && (
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        className='collection-card-image'
                                    />
                                )}
                                <div className='collection-card-content'>
                                    <h3 className='collection-card-title'>{c.title}</h3>
                                    <p className='collection-card-description'>{c.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Dashboard

