import React, { useEffect, useState } from 'react'
import { getGamesList, Game } from '../../services/api-client' // Import as default export
import '../styles.css'

function GamesList() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        fetchGamesList()
    }, [])

    const fetchGamesList = async () => {
        try {
            const gamesData = await getGamesList()
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
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default GamesList
