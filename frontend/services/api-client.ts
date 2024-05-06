import axios from 'axios'

export interface Game {
    id: number
    background_image: string
    name: string
    reviews_count: string
    metacritic: string
}
export interface Genre {
    id: number
    name: string
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
export const getNewlyUpdatedGames = async () => {
    try {
        const response = await axiosInstance.get(
            `/games?key=${RAWG_API_KEY}&ordering=-metacritic`
        )
        console.log('RESPOMNSE', response.data.results)
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching newly updated games: ' + error)
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
