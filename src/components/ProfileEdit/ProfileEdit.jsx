import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyProfile, updateMyProfile } from '../../services/profile'

const ProfileEdit = () => {
    const navigate = useNavigate()

    const [bio, setBio] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMyProfile()
                setBio(res.data.bio || '')
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
            await updateMyProfile({ bio })
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

                <button type='submit'>Save Profile</button>
            </form>

        </div>
    )
}

export default ProfileEdit