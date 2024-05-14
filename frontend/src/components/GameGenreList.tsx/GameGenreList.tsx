import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Game, getGameGenreList } from '../../../services/api-client'
import GameCard from '../GameCard/GameCard'
import TopTagsBar from '../Nav/TopTagsBar'

const GameGenreList = () => {
    const { genreSlug } = useParams()
    const [games, setGames] = useState<Game[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null) // State for error message

    useEffect(() => {
        const fetchGamesByGenre = async () => {
            try {
                if (genreSlug) {
                    const games = await getGameGenreList(genreSlug)
                    setGames(games)
                } else {
                    setError('Invalid genre.') // Handle missing genre slug
                }
            } catch (error) {
                console.error('Error fetching games by genre:', error)
                setError('Failed to fetch games. Please try again later.') // Generic error message
            } finally {
                setIsLoading(false)
            }
        }

        fetchGamesByGenre()
    }, [genreSlug])

    return (
        <div>
            {isLoading ? (
                <div>Loading games...</div>
            ) : error ? ( // Display error message if there's an error
                <div>{error}</div>
            ) : (
                <div>
                    <TopTagsBar />
                    <h1 className="ml-16 mt-10 font-bold text-lg">
                        Results for "{genreSlug}"
                    </h1>{' '}
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-16">
                        {games.map((game) => (
                            <GameCard
                                id={game.id}
                                background_image={game.background_image}
                                name={game.name}
                                reviews_count={game.reviews_count}
                                metacritic={game.metacritic}
                                genres={game.genres}
                                ratings_count={game.ratings_count}
                                tags={game.tags}
                                platforms={game.platforms}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default GameGenreList
