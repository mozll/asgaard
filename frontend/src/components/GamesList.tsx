import { useEffect, useState } from 'react'
import { getTopMetacriticGames, Game } from '../../services/api-client'

function GamesList() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        fetchTopMetacriticGames()
    }, [])

    const fetchTopMetacriticGames = async () => {
        try {
            const gamesData = await getTopMetacriticGames()
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
