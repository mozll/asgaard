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

const isProduction = process.env.NODE_ENV === 'production'
const apiUrl = isProduction
    ? // ? 'http://139.144.73.204:8081'
      'https://questzing-be.vercel.app/'
    : 'http://localhost:8081'

export const VITE_QUESTZING_API_URL = apiUrl

console.log('API URL:', VITE_QUESTZING_API_URL)
console.log('isProduction apiURL', apiUrl)

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
                platforms: 1, // platform ID for Xbox
                ordering: '-rating',
                page_size: 25,
                exclude_additions: true, // We dont want DLC or expansions
            },
        })
        response.data.results = response.data.results.filter((game: Game) => {
            const minReviewsCount = 1000 // We want atleast 1000 reviews on the xbox games

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
                page_size: 50,
                ratings: '>4.5',
            },
        })

        // select a random game from the fetched results
        const randomIndex = Math.floor(
            Math.random() * response.data.results.length
        )

        const gameId = response.data.results[randomIndex].id

        // call the api to get the description based on the game ID
        const getDescription = await axiosInstance.get(`/games/${gameId}`, {
            params: {
                key: RAWG_API_KEY,
            },
        })

        const description = getDescription.data.description_raw

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

        // extract the data from the game response
        const gameData = gameResponse.data

        // fetch the screenshots of the game
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

        // extract the screenshots data and gives us 5 screenshots
        const screenshots = screenshotsResponse.data.results
        const limitedScreenshots = screenshots.slice(0, 5)
        // extract the stores data and gives us 10
        const stores = storesResponse.data.results
        const limitedStores = stores.slice(0, 10)

        // combine the game data with the screenshots and stores data
        const combinedData = {
            ...gameData,
            screenshots: limitedScreenshots,
            stores: limitedStores,
        }

        return combinedData
    } catch (error) {
        console.error('Error fetching game data:', error)
        throw error
    }
}

// defining genre and platform mappings
const genreMappings: {
    [questionIndex: number]: { [answerIndex: number]: string }
} = {
    0: {
        0: 'action',
        1: 'adventure',
        2: 'role-playing-games-rpg',
        3: 'strategy',
        4: 'shooter',
        5: 'puzzle',
        6: 'simulation',
        7: 'sports',
    },
    1: {
        0: 'action',
        1: 'adventure',
        2: 'role-playing-games-rpg',
        3: 'strategy',
        4: 'shooter',
        5: 'puzzle',
        6: 'simulation',
        7: 'sports',
    },
    2: {
        0: 'shooter',
        1: 'role-playing-games-rpg',
        2: 'strategy',
        3: 'adventure',
        4: 'simulation',
        5: 'adventure',
        6: 'puzzle',
        7: 'strategy',
    },
}

const platformMappings: {
    [questionIndex: number]: { [answerIndex: number]: number[] }
} = {
    3: {
        0: [4], // PC
        1: [18, 187, 1, 186], // newer consoles
        2: [7], // switch
        3: [3, 21], // mobile
        4: [16, 14], // older consoles
        5: [8, 9], // nintendo 3ds & ps vita
        6: [24, 74], // old gaming systems
    },
}

export const getQuizGamesList = async (userAnswers: number[]) => {
    const selectedGenres: string[] = []
    const selectedPlatforms: number[] = []

    // iterate through each user answer and its corresponding question index.
    userAnswers.forEach((answer, questionIndex) => {
        const genre = genreMappings[questionIndex]?.[answer]
        if (genre) selectedGenres.push(genre) // if a valid genre is found, add it to the list

        const platforms = platformMappings[questionIndex]?.[answer]
        if (platforms) selectedPlatforms.push(...platforms) // if platforms are found, add each one to the list
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
            },
        })

        console.log('API Response:', response.data.results)

        return response.data.results
    } catch (error) {
        console.error('Error fetching games:', error)
        throw new Error('Error fetching games: ' + error)
    }
}
