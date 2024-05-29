import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { User } from '../../App'
import QuestzingLogo from '../../assets/Questzing.svg'
import '../../styles.css'
import { useEffect, useRef, useState } from 'react'
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
    const [searchResults, setSearchResults] = useState<Game[]>([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchGames = async () => {
            if (searchTerm.length < 3) {
                setSearchResults([])
                setShowDropdown(false)
                return
            }

            try {
                const results = await searchGames(searchTerm)
                setSearchResults(results)
                setShowDropdown(true)
            } catch (err) {
                console.error('Error fetching games:', err)
                setShowDropdown(false)
            }
        }

        fetchGames()
    }, [searchTerm])

    const handleDocumentClick = (event: MouseEvent) => {
        if (
            inputRef.current &&
            inputRef.current.contains(event.target as Node)
        ) {
            if (searchResults.length > 0) {
                setShowDropdown(true)
            }
        } else if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setShowDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick)
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }, [searchResults])

    const handleGameClick = (gameId: number) => {
        navigate(`/game/${gameId}`)
        setShowDropdown(false)
        setSearchTerm('') // Clear the search area after click
    }

    // useEffect to handle URL changes and reset the search state
    useEffect(() => {
        setSearchTerm('')
        setSearchResults([])
        setShowDropdown(false)
    }, [location.pathname])

    const handleToggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className="flex justify-between mx-8 sm:mx-16 my-8 items-center">
            <div className="">
                <NavLink to="/">
                    <img
                        className="hidden lg:block h-7 mr-8"
                        src={QuestzingLogo}
                        alt="Questzing logo"
                    />
                </NavLink>
            </div>
            <div className="flex-grow flex items-center gap-10 ">
                {/* Search input and results */}
                <div className="relative flex-grow md:flex-grow-0 sm:order-2 ">
                    <input
                        ref={inputRef}
                        className="text-qDark200 rounded-md w-full px-4 py-1 mb-1"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for games..."
                    />
                    {showDropdown && searchResults.length > 0 && (
                        <div
                            ref={dropdownRef}
                            className="absolute top-full left-0 bg-white rounded-md shadow-md z-10 w-full max-h-64 overflow-y-auto text-black"
                        >
                            <ul>
                                {searchResults.map((game) => (
                                    <li
                                        key={game.id}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleGameClick(game.id)}
                                    >
                                        {game.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Hamburger button for small screens */}
                <button
                    className="block md:hidden text-2xl order-3"
                    onClick={handleToggleMenu}
                >
                    &#9776; {/* Hamburger icon */}
                </button>
                {/* Navbar links and user profile/login */}
                <nav
                    className={`flex flex-col md:flex-row gap-5 md:p-0 p-4 md:gap-10 text-lg z-10 ${
                        showMenu ? 'flex' : 'hidden md:flex'
                    } absolute md:relative top-20 md:top-auto right-0 sm:right-20 md:right-auto order-4 md:order-1 sm:mx-auto
    ${showMenu ? 'rounded bg-qDark300' : ''} `}
                >
                    {navItems.map((navItem, index) => (
                        <NavLink
                            key={index}
                            to={navItem.link}
                            onClick={() => setShowMenu(false)}
                        >
                            {navItem.title}
                        </NavLink>
                    ))}
                    {user ? (
                        <NavLink
                            to="/profile"
                            className="text-lg"
                            onClick={() => setShowMenu(false)}
                        >
                            {/* {user.name} */}
                            Profile
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/login"
                            className="text-lg"
                            onClick={() => setShowMenu(false)}
                        >
                            Login
                        </NavLink>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Navbar
