import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile, updateMyProfile } from '../../services/profile'
import { AVATARS } from '../../constants/avatars'
import { UserContext } from '../../contexts/UserContext'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import './ProfileEdit.css'

const ProfileEdit = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
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
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateMyProfile({ bio, avatar })
            setUser(prev => ({
                ...prev,
                avatar: avatar
            }))
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response.data)
            setError('Could not update profile')
        }
    }

    if (loading) return <LoadingIcon />
    if (error) return <p>{error}</p>

    return (
        <div className='profile-edit'>
            <h1 className='profile-edit-title'>Edit profile</h1>

            <form className='profile-edit-form' onSubmit={handleSubmit}>
                <textarea
                    className='profile-edit-textarea'
                    placeholder='Your bio'
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                />
                <h3 className='profile-edit-subtitle'>Choose an avatar</h3>

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

                <button className='profile-edit-button' type='submit'>Save Profile</button>
            </form>

        </div>
    )
}

export default ProfileEdit