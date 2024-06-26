import { useEffect, useState } from 'react'
import { getGenres } from '../../../services/api-client'
import { useNavigate, useParams } from 'react-router-dom'

const TopTagsBar = () => {
    const [genres, setGenres] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const { genreSlug: activeGenreFromUrl } = useParams()
    const [activeGenre, setActiveGenre] = useState(activeGenreFromUrl)

    const handleTagClick = (genreName: string) => {
        const genreSlug = genreName.toLowerCase().replace(/ /g, '-')
        navigate(`/genre/${genreSlug}`)
        setActiveGenre(genreSlug)
    }

    useEffect(() => {
        const fetchGenresData = async () => {
            try {
                const fetchedGenres = await getGenres() // Call  getGenres function from api-client
                setGenres(fetchedGenres) // Update genres state with fetched data
            } catch (error) {
                console.error(
                    'Error fetching genres:',
                    error,
                    'loading status',
                    isLoading
                )
                setGenres(['Action', 'Adventure', 'RPG']) // fallback genres, only applied if earlier call failed
            } finally {
                setIsLoading(false)
            }
        }

        fetchGenresData()
    }, [])

    return (
        <div>
            <ul className="justify-center font-light flex flex-wrap mx-8 sm:mx-14 gap-2 my-5">
                {genres.map((genre) => (
                    <li key={genre} className="flex items-center mb-2">
                        <button
                            onClick={() => handleTagClick(genre)}
                            className={`text-xs bg-qDark300 p-2 rounded-xl hover:bg-qPrimary300 font-normal hover:text-qDark200 transition-colors ${
                                genre.toLowerCase().replace(/ /g, '-') ===
                                activeGenre
                                    ? 'bg-qPrimary300 text-qDark200 font-normal transform scale-110'
                                    : ''
                            }`}
                        >
                            {genre}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TopTagsBar
