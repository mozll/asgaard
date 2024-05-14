import React from 'react'
/* 
const TopTagsBar = () => {
    const handleTagClick = (tagName) => {
        // Trigger search with the selected tag
        // You can define your search functionality here
        console.log('Search triggered for', tagName)
    }

    return (
        <div>
            <ul className="justify-center font-light flex flex-wrap">
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Free to Play')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Free to Play
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Early Access')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Early Access
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Action')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Action
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Adventure')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Adventure
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Casual')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Casual
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Indie')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Indie
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Multiplayer')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Multiplayer
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Racing')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Racing
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('RPG')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        RPG
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Simulation')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Simulation
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Sports')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Sports
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Strategy')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Strategy
                    </button>
                </li>
            </ul>
        </div>
    )
} */
import { useEffect, useState } from 'react'
import { getGenres } from '../../../services/api-client'
import { useNavigate } from 'react-router-dom'

const TopTagsBar = () => {
    const [genres, setGenres] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const handleTagClick = (genreName: string) => {
        const genreSlug = genreName.toLowerCase().replace(/ /g, '-') // Convert genre name to slug format
        navigate(`/genre/${genreSlug}`)
    }

    useEffect(() => {
        const fetchGenresData = async () => {
            try {
                const fetchedGenres = await getGenres() // Call  getGenres function from api-client
                setGenres(fetchedGenres) // Update genres state with fetched data
            } catch (error) {
                console.error('Error fetching genres:', error)
                setGenres(['Action', 'Adventure', 'RPG']) // Fallback genres
            } finally {
                setIsLoading(false)
            }
        }

        fetchGenresData() // Call the function to fetch genres
    }, []) // Runs once since empty

    return (
        <div>
            {isLoading ? (
                <div>Loading genres...</div>
            ) : (
                <ul className="justify-center font-light flex flex-wrap lg:mx-64 mx-20">
                    {genres.map((genre) => (
                        <li key={genre} className="flex items-center mr-4 mb-2">
                            <button
                                onClick={() => handleTagClick(genre)}
                                className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                            >
                                {genre}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TopTagsBar
