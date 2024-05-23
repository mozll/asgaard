import React, { useState, useEffect } from 'react'
import { getQuizGamesList } from '../../../services/api-client'
import GameCard from '../GameCard/GameCard'
import { Game } from '../../../services/api-client'

interface ResultProps {
    answers: number[]
}

const Result = ({ answers }: ResultProps) => {
    const [recommendedGames, setRecommendedGames] = useState<Game[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getGames = async () => {
            try {
                const games = await getQuizGamesList(answers)
                setRecommendedGames(games)
            } catch (error) {
                console.error('Error fetching games:', error)
            } finally {
                setIsLoading(false)
            }
        }

        getGames()
    }, [answers])

    return (
        <div>
            <h2>Based on your answers, we recommend:</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {recommendedGames.map((game) => (
                        <GameCard
                            key={game.id}
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
                </div>
            )}
        </div>
    )
}

export default Result
