import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import './Navbar.css'
import logo from '../../assets/logo_new.png'

const Navbar = () => {
    const { user, signOut } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/')
    }

    return (
        <nav className='navbar'>
            <div className='logo'>
                <Link to= "/collections" className='logo-link'>
                <img src={logo} alt='app logo' className='navbar-logo' />
                </Link>
            </div>

            <div className='nav-links'>
                {!user ? (
                    <>
                    <Link to='/sign-in'>Sign In</Link>
                    <Link to='/sign-up'>Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link to='/dashboard'>My Dashboard</Link>
                        <Link to='/collections/new'>Create Collection</Link>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar