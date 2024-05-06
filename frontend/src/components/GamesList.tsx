import React, { useEffect, useState } from 'react'
import { getNewlyUpdatedGames, Game } from '../../services/api-client'

function GamesList() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        fetchNewlyUpdatedGames()
    }, [])

    const fetchNewlyUpdatedGames = async () => {
        try {
            const gamesData = await getNewlyUpdatedGames()
            setGames(gamesData)
        } catch (error) {
            console.error('Error fetching games:', error)
        }
    }

    return (
        <div>
            <h1 className="text-green-600 font-bold">Games List</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default GamesList
