import axios from 'axios'

export interface Game {
    id: number
    background_image: string
    name: string
    reviews_count: string
    metacritic: string
    genres: Genre[]
    ratings_count: number
    tags: Tag[]
    platforms: Platform[]
    description?: string
}
interface Genre {
    games_count: number
    id: number
    image_background: string
    name: string
    slug: string
}
interface Tag {
    id: number
    name: string
    slug: string
    language: string
    games_count: number
}

interface Platform {
    platform: {
        id: number
        name: string
        slug: string
    }
}

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
})

export const getGamesList = async () => {
    try {
        const response = await axiosInstance.get(`/games?key=${RAWG_API_KEY}`)
        console.log(response)
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching games: ' + error)
    }
}
export const getTopMetacriticGames = async () => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                ordering: '-metacritic',
                page_size: 25, // Limit to 10 games
            },
        })
        response.data.results = response.data.results.filter(
            (game: Game) => parseInt(game.reviews_count) > 0
        )
        console.log(
            'RESPONSE FROM getTopMetacriticGames ',
            response.data.results
        )
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching top metacritic games: ' + error)
    }
}
export const getPopularGames = async () => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                ordering: '-rating_count', // You can change this to other metrics like '-ratings_count'
                page_size: 20, // Limit to 25 games
            },
        })
        console.log('Popular games ', response.data.results)
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching popular games: ' + error)
    }
}

export const getGenresList = async () => {
    try {
        const response = await axiosInstance.get(`/genres?key=${RAWG_API_KEY}`)
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching genres: ' + error)
    }
}
export const getXboxGames = async () => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                platforms: 1, // Xbox platform ID
                ordering: '-rating',
                page_size: 25,
                exclude_additions: true, // Exclude DLC and expansions
            },
        })
        response.data.results = response.data.results.filter((game: Game) => {
            const minReviewsCount = 1000 // Adjust this value as needed

            return game.ratings_count >= minReviewsCount
        })

        console.log('RESPONSE FROM getXboxGames ', response.data.results)
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching Xbox games: ' + error)
    }
}

export const getSmartphoneGames = async () => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                platforms: '21,3', // Include platform IDs for Android (21) and iOS (3)
            },
        })
        console.log('RESPONSE FROM getSmartphoneGames ', response.data.results)
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching smartphone games: ' + error)
    }
}

export const getFeaturedGame = async () => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                page_size: 50, // Fetch a larger set of games
                ratings: '>4.5',
            },
        })

        // Select a random game from the fetched results
        const randomIndex = Math.floor(
            Math.random() * response.data.results.length
        )

        const gameId = response.data.results[randomIndex].id
        console.log('FEATURE', response.data.results[randomIndex])

        // Call the api to get the description based on the game ID
        const getDescription = await axiosInstance.get(`/games/${gameId}`, {
            params: {
                key: RAWG_API_KEY,
            },
        })

        const description = getDescription.data.description

        // Return the selected game along with the description
        return {
            ...response.data.results[randomIndex],
            description: description,
        }
    } catch (error) {
        throw new Error('Error fetching featured game: ' + error)
    }
}
