import React, { useState, useEffect } from 'react'
import { getQuizGamesList } from '../../../services/api-client'
import GameCard from '../GameCard/GameCard'

interface ResultProps {
    answers: number[]
}

const Result: React.FC<ResultProps> = ({ answers }) => {
    const [recommendedGames, setRecommendedGames] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const games = await getQuizGamesList(answers)
                setRecommendedGames(games)
            } catch (error) {
                console.error('Error fetching games:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchGames()
    }, [answers])

    return (
        <div>
            <h2>Based on your answers, we recommend:</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {recommendedGames.map((game, index) => (
                        <GameCard key={index} {...game} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Result
