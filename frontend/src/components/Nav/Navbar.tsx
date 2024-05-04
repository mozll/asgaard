import { NavLink } from 'react-router-dom'
import QuestzingLogo from '../../assets/Questzing.svg'
import '../../styles.css'

interface NavItems {
    link: string
    title: string
}

interface NavbarProps {
    navItems: NavItems[]
}

const Navbar = ({ navItems }: NavbarProps) => {
    return (
        <div className="flex justify-between m-10">
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
            <NavLink to="/login" className="text-lg">
                Login
            </NavLink>
        </div>
    )
}

export default Navbar
