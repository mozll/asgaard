import { NavLink } from 'react-router-dom'

// Interface
import { User } from '../../App'

// assets and styles
import QuestzingLogo from '../../assets/Questzing.svg'
import '../../styles.css'
import { useEffect, useState } from 'react'
import { Game, searchGames } from '../../../services/api-client'

interface NavItems {
    link: string
    title: string
}

interface NavbarProps {
    navItems: NavItems[]
    user: User | null
}

const Navbar = ({ navItems, user }: NavbarProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    // map through searchresults with game cards. Don't know how and where but :D
    const [searchResults, setSearchResults] = useState<Game[]>([])

    useEffect(() => {
        const fetchGames = async () => {
            if (searchTerm.length < 3) {
                setSearchResults([])
                return
            }

            try {
                const results = await searchGames(searchTerm)
                setSearchResults(results)
            } catch (err) {
                console.error('Error fetching games:', err)
            } finally {
            }
        }
        fetchGames()
    }, [searchTerm])

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
                <input
                    className="text-qDark200"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for games..."
                />
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
