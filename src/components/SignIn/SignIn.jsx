import { UserContext } from '../../contexts/UserContext'
import { signInService } from '../../services/auth'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { getUserFromToken } from '../../utils/token'

const SignIn = () => {

    const [ formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInService(formData)
            setUser(getUserFromToken())
            navigate('/collections')
        } catch (error) {
            if(error.response?.data) {
                setError(error.response.data)
            } else {
                setError({ message: 'Invalid credentials' })
            }
        }
    }
    
    return (
        <>
        <div className='signin-container'>
            <h1>Sign In</h1>
            <form className='signin-form' onSubmit={handleSubmit}>

                <div className='form-control-sign-in'>
                    <label hidden htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' placeholder='Username' onChange={handleChange} required />
                </div>

                <div className='form-control-sign-in'>
                    <label hidden htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='Password' onChange={handleChange} required />
                </div>

                <button className='signin-btn' type='submit'>Sign In</button>

                {error.detail && <p className='error-message'>{error.detail}</p>}
                {error.message && <p className='error-message'>{error.message}</p> }

            </form>
        </div>
        </>
    )
}

export default SignIn