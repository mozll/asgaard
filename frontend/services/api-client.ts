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

export interface GameDetails extends Game {
    description_raw: string
    developers: Developers[]
    publishers: Publishers[]
    released: string
    esrb_rating: esrb_rating
    screenshots: Screenshot[]
    stores: Store[]
    reddit_url: string
    website: string
}

interface esrb_rating {
    id: number
    name: string
    slug: string
}

interface Screenshot {
    height: number
    id: number
    image: string
    is_deleted: boolean
    width: number
}
interface Store {
    game_id: number
    id: number
    store_id: number
    url: string
}

interface Developers {
    games_count?: string
    id: string
    image_background: string
    name: string
    slug: string
}
interface Publishers {
    games_count?: string
    id: string
    image_background: string
    name: string
    slug: string
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
    name: string
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
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching games: ' + error)
    }
}

export const getGameGenreList = async (genreSlug: string) => {
    try {
        const response = await axiosInstance.get(
            `/games?genres=${genreSlug}&key=${RAWG_API_KEY}&page_size=40`
        )
        return response.data.results // Assuming the API returns game results
    } catch (error) {
        console.error('Error fetching games by genre:', error)
        throw error
    }
}

export const getGenres = async () => {
    try {
        const response = await axiosInstance.get(
            `/genres?key=${RAWG_API_KEY}`,
            {}
        )
        const genreNames = response.data.results.map(
            (genre: { name: string }) => genre.name
        )

        return genreNames
    } catch (error) {
        console.error('Error fetching genres:', error)
        throw error // Re-throw the error to handle it in your component
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

        // Call the api to get the description based on the game ID
        const getDescription = await axiosInstance.get(`/games/${gameId}`, {
            params: {
                key: RAWG_API_KEY,
            },
        })

        const description = getDescription.data.description_raw

        // Return the selected game along with the description
        return {
            ...response.data.results[randomIndex],
            description: description,
        }
    } catch (error) {
        throw new Error('Error fetching featured game: ' + error)
    }
}

export const getAllGameData = async (gameId: string) => {
    try {
        // First, fetch the game data
        const gameResponse = await axiosInstance.get(`/games/${gameId}`, {
            params: {
                key: RAWG_API_KEY,
            },
        })

        // Extract the necessary data from the game response
        const gameData = gameResponse.data

        // Next, fetch the screenshots of the game
        const screenshotsResponse = await axiosInstance.get(
            `/games/${gameId}/screenshots`,
            {
                params: {
                    key: RAWG_API_KEY,
                },
            }
        )
        const storesResponse = await axiosInstance.get(
            `/games/${gameId}/stores`,
            {
                params: {
                    key: RAWG_API_KEY,
                },
            }
        )

        // Extract the screenshots data
        const screenshots = screenshotsResponse.data.results
        const limitedScreenshots = screenshots.slice(0, 5)
        // Extract the stores data
        const stores = storesResponse.data.results
        const limitedStores = stores.slice(0, 5)

        // Combine the game data with the screenshots data
        const combinedData = {
            ...gameData,
            screenshots: limitedScreenshots,
            stores: limitedStores,
        }

        // Return the combined data

        return combinedData
    } catch (error) {
        console.error('Error fetching game data:', error)
        throw error
    }
}
