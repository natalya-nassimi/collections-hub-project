import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Navbar = () => {
    const { user, signOut } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        navigate('/')
    }

    return (
        <nav className='navbar'>
            <Link to={ user ? '/collections' : '/'}>
                <h2 className='logo'>Collections</h2>
            </Link>

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
                        <button on onClick={handleSignOut}>Sign Out</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar