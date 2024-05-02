import axios from 'axios'

export interface Game {
    id: number
    name: string
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
        return response.data.results
    } catch (error) {
        throw new Error('Error fetching games: ' + error)
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
