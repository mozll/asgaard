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
            <h2 className="mx-16 mt-8 font-bold">
                Based on your answers, we recommend:
            </h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {' '}
                    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4 mx-16">
                        {recommendedGames.map((game) => (
                            <GameCard key={game.id} {...game} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Result
