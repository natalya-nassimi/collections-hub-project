import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile, updateMyProfile } from '../../services/profile'
import { AVATARS } from '../../constants/avatars'
import './ProfileEdit.css'

const ProfileEdit = () => {
    const navigate = useNavigate()

    const [bio, setBio] = useState('')
    const [avatar, setAvatar] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMyProfile()
                setBio(res.data.bio || '')
                setAvatar(res.data.avatar || '')
            } catch (error) {
                setError('Could not load profile')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [] )

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateMyProfile({ bio, avatar })
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response.data)
            setError('Could not update profile')
        }
    }

    if (loading) return <p>Loading profile...</p>
    if (error) return <p>{error}</p>

    return (
        <div className='profile-edit'>
            <h1>Edit profile</h1>

            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder='Your bio'
                    value={bio}
                    onChange={e => setBio(e.target.value)}
            />
            <h3>Choose an avatar</h3>

            <div className='avatar-grid'>
                {AVATARS.map(a => (
                    <img
                        key={a.key}
                        src={a.src}
                        alt={a.key}
                        className={`avatar-option ${avatar === a.key ? 'selected' : ''}`}
                        onClick={() => setAvatar(a.key)}
                    />
                ))}

            </div>

                <button type='submit'>Save Profile</button>
            </form>

        </div>
    )
}

export default ProfileEdit