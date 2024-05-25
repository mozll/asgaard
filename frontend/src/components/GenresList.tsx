import React, { useEffect, useState } from 'react'
import { getGenresList, Game } from '../../services/api-client'
import '../styles.css'

function GenresList() {
    const [genres, setGenres] = useState<Game[]>([]) // using Game type from api client as the type for genres

    useEffect(() => {
        fetchGenresList()
    }, [])

    const fetchGenresList = async () => {
        try {
            const genresData = await getGenresList()
            setGenres(genresData)
        } catch (error) {
            console.error('Error fetching Genres:', error)
        }
    }

    return (
        <div>
            <h1 className="text-blue-600 font-bold">Genres List</h1>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default GenresList
