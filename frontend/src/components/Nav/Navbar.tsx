import { NavLink } from 'react-router-dom'

// Interface
import { User } from '../../App'

// assets and styles
import QuestzingLogo from '../../assets/Questzing.svg'
import '../../styles.css'

interface NavItems {
    link: string
    title: string
}

interface NavbarProps {
    navItems: NavItems[]
    user: User | null
}

const Navbar = ({ navItems, user }: NavbarProps) => {
    return (
        <div className="flex justify-between mx-16 my-8">
            <NavLink to="/">
                <img src={QuestzingLogo} alt="Questzing logo" />
            </NavLink>
            <div className="flex gap-10">
                <nav className="flex gap-10 text-lg">
                    {navItems.map((navItem, index) => (
                        <NavLink key={index} to={navItem.link}>
                            {navItem.title}
                        </NavLink>
                    ))}
                </nav>
                <button className="text-lg">GQ</button>
            </div>

            {user ? (
                // to="/profile/${user.id}" if access to other user profiles neccessary
                <NavLink to="/profile" className="text-lg">
                    {user.name}
                </NavLink>
            ) : (
                <NavLink to="/login" className="text-lg">
                    Login
                </NavLink>
            )}
        </div>
    )
}

export default Navbar
