import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import './Navbar.css'
import logo from '../../assets/my_logo.png'
import { AVATARS } from '../../constants/avatars'

const Navbar = () => {
    const { user, signOut } = useContext(UserContext)
    const navigate = useNavigate()

    const avatarSource = AVATARS.find(a => a.key === user?.avatar)?.src ||
        AVATARS.find(a => a.key === 'defaultAvatar')?.src

    const handleSignOut = () => {
        signOut()
        navigate('/collections')
    }

    return (
        <nav className='navbar'>
            <div className='logo'>
                <Link to="/collections" className='logo-link'>
                    <img src={logo} alt='app logo' className='navbar-logo' />
                </Link>
            </div>

            <div className='nav-links'>
                {!user ? (
                    <>
                        <Link to='/sign-in' className='sign-in-link'>Sign In</Link>
                        <Link to='/sign-up' className='sign-up-link'>Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link to='/dashboard' className='dashboard-link'>My Dashboard</Link>
                        <Link to='/collections/new' className='create-link'>Create Collection</Link>
                        <button onClick={handleSignOut} className='sign-out-button'>Sign Out</button>
                        <Link to='/dashboard'>
                            <img
                                src={avatarSource}
                                alt='user avatar'
                                className='navbar-avatar'
                            />
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar