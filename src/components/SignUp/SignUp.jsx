import { useState } from 'react'
import { signUpService } from '../../services/auth'
import { useNavigate } from 'react-router'
import './SignUp.css'

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: null })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signUpService(formData)
            navigate('/sign-in')

        } catch (error) {
            console.log('SIGN UP ERROR:', error.response?.data)
            if (error.response && error.response.data) {
                setError((error.response.data))
            } else {
                setError({ message: 'Something went wrong' })
            }
        }
    }

    return (
        <>
            <div className='signup-container'>
                <h1>Create an account</h1>
                <form className='signup-form' onSubmit={handleSubmit}>

                    <div className='form-control-sign-up'>
                        <label hidden htmlFor='username'>Username</label>
                        <input type='text' name='username' id='username' placeholder='Username' onChange={handleChange} required />
                        {error.username && (
                            <p className="error-message">
                                {Array.isArray(error.username) ? error.username[0] : error.username}
                            </p>
                        )}

                    </div>

                    <div className='form-control-sign-up'>
                        <label hidden htmlFor='email'>Email</label>
                        <input type='text' name='email' id='email' placeholder='Email' onChange={handleChange} required />
                        {error.email && (
                            <p className="error-message">
                                {Array.isArray(error.email) ? error.email[0] : error.email}
                            </p>
                        )}
                    </div>

                    <div className='form-control-sign-up'>
                        <label hidden htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' placeholder='Password' onChange={handleChange} required />
                        {error.password && (
                            <p className="error-message">
                                {Array.isArray(error.password) ? error.password[0] : error.password}
                            </p>
                        )}
                    </div>

                    <div className='form-control-sign-up'>
                        <label hidden htmlFor='confirm_password'>Re enter your password</label>
                        <input type='password' name='confirm_password' id='confirm_password' placeholder='Re enter your password' onChange={handleChange} required />
                        {error.confirm_password && (
                            <p className="error-message">
                                {Array.isArray(error.confirm_password)
                                    ? error.confirm_password[0]
                                    : error.confirm_password}
                            </p>
                        )}
                    </div>

                    <button className='signup-btn' type='submit'>Create account</button>

                    {error.non_field_errors && (
                        <p className="error-message">
                            {Array.isArray(error.non_field_errors)
                                ? error.non_field_errors[0]
                                : error.non_field_errors}
                        </p>
                    )}

                </form>
            </div>
        </>
    )
}

export default SignUp