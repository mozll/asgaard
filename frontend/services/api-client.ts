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
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
            },
        })
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching games: ' + error)
    }
}

// Search game api. get query from the users input in search bar
export const searchGames = async (query: string) => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                search: query,
            },
        })
        console.log('this is a search result', response.data.results)
        return response.data.results
    } catch (error) {
        throw new Error('Error searching games: ' + error)
    }
}

export const getGameGenreList = async (
    genreSlug: string,
    platformId?: string
) => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                genres: genreSlug,
                platform: platformId,
                key: RAWG_API_KEY,
                page_size: 40,
            },
        })
        return response.data.results
    } catch (error) {
        console.error('Error fetching games by genre:', error)
        throw error
    }
}

export const getGenres = async () => {
    try {
        const response = await axiosInstance.get('/genres', {
            params: { key: RAWG_API_KEY },
        })

        const genreNames = response.data.results.map(
            (genre: { name: string }) => genre.name
        )

        return genreNames
    } catch (error) {
        console.error('Error fetching genres:', error)
        throw error
    }
}

export const getPlatforms = async () => {
    try {
        const response = await axiosInstance.get('/platforms', {
            params: { key: RAWG_API_KEY },
        })

        const platformNames = response.data.results.map(
            (platform: { id: string; name: string; slug: string }) => ({
                id: platform.id,
                name: platform.name,
                slug: platform.slug,
            })
        )

        return platformNames
    } catch (error) {
        console.error('Error fetching platforms:', error)
        throw error
    }
}

export const getTopMetacriticGames = async () => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                ordering: '-metacritic',
                page_size: 25,
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
                ordering: '-rating_count',
                page_size: 20,
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
        const limitedStores = stores.slice(0, 10)

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

// Define genre and platform mappings
const genreMappings: {
    [questionIndex: number]: { [answerIndex: number]: string }
} = {
    0: {
        0: 'action', // Hero’s journey with epic battles
        1: 'adventure', // Exploring mysterious and unknown worlds
        2: 'role-playing-games-rpg', // Deep and immersive character development
        3: 'strategy', // Strategic thinking and planning
        4: 'shooter', // Fast-paced and intense action
        5: 'puzzle', // Solving complex puzzles and challenges
        6: 'simulation', // Building and managing systems
        7: 'sports', // Engaging in competitive sports scenarios
    },
    1: {
        0: 'action', // Immersive graphics and realism
        1: 'adventure', // Strong narrative and story
        2: 'role-playing-games-rpg', // Character customization and progression
        3: 'strategy', // Strategic decision-making
        4: 'shooter', // Quick reflexes and precision
        5: 'puzzle', // Mental challenges and logic puzzles
        6: 'simulation', // Creative freedom and sandbox elements
        7: 'sports', // Team-based and competitive play
    },
    2: {
        0: 'shooter', // Modern and futuristic settings
        1: 'role-playing-games-rpg', // Fantasy and mythical worlds
        2: 'strategy', // Historical and realistic settings
        3: 'adventure', // Sci-fi and outer space adventures
        4: 'simulation', // Urban and city landscapes
        5: 'adventure', // Nature and wilderness exploration
        6: 'puzzle', // Cartoonish and whimsical worlds
        7: 'strategy', // Underground and dystopian themes
    },
}

const platformMappings: {
    [questionIndex: number]: { [answerIndex: number]: number }
} = {
    3: {
        0: 4, // High-end gaming PC
        1: 18, // Home console (e.g., PlayStation, Xbox)
        2: 7, // Portable console (e.g., Nintendo Switch)
        3: 3, // Mobile device (e.g., smartphone, tablet)
        4: 13, // Older consoles (e.g., PlayStation 3, Xbox 360)
        5: 8, // Handheld consoles (e.g., Nintendo 3DS, PS Vita)
        6: 24, // Retro gaming systems (e.g., Atari, Commodore)
    },
}

export const getQuizGamesList = async (userAnswers: number[]) => {
    const selectedGenres: string[] = []
    const selectedPlatforms: number[] = []

    userAnswers.forEach((answer, questionIndex) => {
        const genre = genreMappings[questionIndex]?.[answer]
        if (genre) selectedGenres.push(genre)

        const platform = platformMappings[questionIndex]?.[answer]
        if (platform) selectedPlatforms.push(platform)
    })

    const genresParam = selectedGenres.join(',')
    const platformsParam = selectedPlatforms.join(',')

    console.log('Selected Genres:', genresParam)
    console.log('Selected Platforms:', platformsParam)

    try {
        const response = await axiosInstance.get('/games', {
            params: {
                key: RAWG_API_KEY,
                genres: genresParam || undefined,
                platforms: platformsParam || undefined,
                // I can decide the ordering, but the default is relevance, which is decided by RAWG.ios complex algorithm. Which is a mix of Match by Query Parameters, Popularity, Release Date
                // ordering: '-released', This is for ordering by release date
            },
        })

        console.log('API Response:', response.data.results)

        return response.data.results
    } catch (error) {
        console.error('Error fetching games:', error)
        throw new Error('Error fetching games: ' + error)
    }
}
