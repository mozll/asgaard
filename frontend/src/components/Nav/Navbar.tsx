import React from 'react'
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

    return (
        <div className="flex justify-between mx-16 my-8 items-center">
            <div>
                <NavLink to="/">
                    <img src={QuestzingLogo} alt="Questzing logo" />
                </NavLink>
            </div>
            <div className="flex-grow flex justify-center items-center gap-10">
                <nav className="flex gap-10 text-lg">
                    {navItems.map((navItem, index) => (
                        <NavLink key={index} to={navItem.link}>
                            {navItem.title}
                        </NavLink>
                    ))}
                </nav>
                <div className="relative">
                    <input
                        ref={inputRef}
                        className="text-qDark200 rounded-md px-4 py-1 mb-1"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for games..."
                    />
                    {showDropdown && searchResults.length > 0 ? (
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
                    ) : null}
                </div>
            </div>
            <div>
                {user ? (
                    <NavLink to="/profile" className="text-lg">
                        {user.name}
                    </NavLink>
                ) : (
                    <NavLink to="/login" className="text-lg">
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Navbar
