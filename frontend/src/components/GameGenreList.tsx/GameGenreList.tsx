import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
    Game,
    getGameGenreList,
    getPlatforms,
} from '../../../services/api-client'
import GameCard from '../GameCard/GameCard'
import TopTagsBar from '../Nav/TopTagsBar'

interface Platform {
    id: string
    name: string
    slug?: string
}

const GameGenreList = () => {
    const [platforms, setPlatforms] = useState<Platform[]>([])
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
        null
    )
    const { genreSlug } = useParams()
    const [games, setGames] = useState<Game[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGamesByGenre = async () => {
            try {
                if (genreSlug) {
                    let games
                    if (
                        selectedPlatform &&
                        selectedPlatform.id !== 'allPlatforms'
                    ) {
                        games = await getGameGenreList(
                            genreSlug,
                            selectedPlatform.id
                        )
                    } else {
                        games = await getGameGenreList(genreSlug)
                    }

                    setGames(games)
                } else {
                    setError('Invalid genre.')
                }
            } catch (error) {
                console.error('Error fetching games by genre:', error)
                setError('Failed to fetch games. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchGamesByGenre()
    }, [genreSlug, selectedPlatform?.id])

    useEffect(() => {
        const fetchPlatformsData = async () => {
            try {
                const fetchedPlatforms = await getPlatforms()
                setPlatforms(fetchedPlatforms)
            } catch (error) {
                console.error('Error fetching Platforms:', error)
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 404
                ) {
                    setError('Platforms data not found.')
                } else {
                    setError(
                        'Failed to fetch platforms. Please try again later.'
                    )
                }
            }
        }
        fetchPlatformsData()
    }, [])

    const handlePlatformChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedId = event.target.value
        const selectedOption = event.target.options[event.target.selectedIndex]
        const selectedName = selectedOption.text

        setSelectedPlatform({ id: selectedId, name: selectedName })
        console.log('platform', selectedId)
    }

    // Filter games based on selected platform
    const filteredGames =
        selectedPlatform && selectedPlatform.id !== 'allPlatforms'
            ? games.filter((game) =>
                  game.platforms.some(
                      (platform) =>
                          // If platform.platform.id from type Game (from api-client) matches with the selectedPlatform.id that was selected in the dropdown, then filter the games on the available platforms
                          platform.platform.id.toString() ===
                          selectedPlatform.id
                  )
              )
            : games

    return (
        <div>
            {isLoading ? (
                <div>Loading games...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <TopTagsBar />

                    {/* Platform Dropdown */}
                    <select
                        value={selectedPlatform?.id || ''}
                        onChange={handlePlatformChange}
                        className="block ml-16 px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="allPlatforms">All Platforms</option>
                        {platforms.map((platform) => (
                            <option key={platform.slug} value={platform.id}>
                                {platform.name}
                            </option>
                        ))}
                    </select>

                    {/* Game List with Filtering */}
                    <h1 className="ml-16 mt-10 font-bold text-lg">
                        Results for "{genreSlug}" on{' '}
                        {selectedPlatform?.name || 'All Platforms'}
                    </h1>
                    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4 mx-16">
                        {filteredGames.map((game) => (
                            <GameCard key={game.id} {...game} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default GameGenreList
