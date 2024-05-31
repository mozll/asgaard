import { useEffect, useState } from 'react'
import '../styles.css'

import SwiperContainer from '../components/SwiperContainer/SwiperContainer'
import FeaturedGameCard from '../components/GameCard/FeaturedGameCard'

import {
    Game,
    getTopMetacriticGames,
    getXboxGames,
    getSmartphoneGames,
    getPopularGames,
    getFeaturedGame,
} from '../../services/api-client'
import TopTagsBar from '../components/Nav/TopTagsBar'

const HomePage = () => {
    const [topMetacriticGames, setTopMetacriticGames] = useState<Game[]>([])
    const [popularGames, setPopularGames] = useState<Game[]>([])
    const [xboxGames, setXboxGames] = useState<Game[]>([])
    const [smartphoneGames, setSmartphoneGames] = useState<Game[]>([])
    const [featuredGame, setFeaturedGame] = useState<Game | null>(null)

    useEffect(() => {
        fetchTopMetacriticGames()
        fetchXboxGames()
        fetchSmartphoneGames()
        fetchPopularGames()
        fetchFeaturedGame()
    }, [])

    const fetchTopMetacriticGames = async () => {
        try {
            const gamesData = await getTopMetacriticGames()
            setTopMetacriticGames(gamesData)
        } catch (error) {
            console.error('Error fetching top metacritic games:', error)
        }
    }
    const fetchPopularGames = async () => {
        try {
            const gamesData = await getPopularGames()
            setPopularGames(gamesData)
        } catch (error) {
            console.error('Error fetching top metacritic games:', error)
        }
    }

    const fetchXboxGames = async () => {
        try {
            const gamesData = await getXboxGames()
            const xboxFilteredGames = gamesData.filter(
                (game: { platforms: { platform: { name: string } }[] }) => {
                    return game.platforms.some(
                        (platform: { platform: { name: string } }) => {
                            const platformName =
                                platform.platform.name.toLowerCase()
                            return platformName.includes('xbox')
                        }
                    )
                }
            )
            setXboxGames(xboxFilteredGames)
        } catch (error) {
            console.error('Error fetching Xbox games:', error)
        }
    }

    const fetchSmartphoneGames = async () => {
        try {
            const gamesData = await getSmartphoneGames()
            setSmartphoneGames(gamesData)
        } catch (error) {
            console.error('Error fetching smartphone games:', error)
        }
    }
    const fetchFeaturedGame = async () => {
        try {
            const gamesData = await getFeaturedGame()
            setFeaturedGame(gamesData)
        } catch (error) {
            console.error('Error fetching FeaturedGame:', error)
        }
    }

    return (
        <>
            <TopTagsBar />
            <div className="ml-8 sm:ml-16">
                <h1 className="mt-8 font-bold">Highest Rated On Metacritic</h1>
                <SwiperContainer games={topMetacriticGames} />

                <h1 className="mt-8 font-bold">Popular games & DLC</h1>
                <SwiperContainer games={popularGames} />
                {featuredGame && (
                    <div className="hidden md:block">
                        {' '}
                        <h1 className="mt-8 font-bold">Featured Game</h1>
                        <FeaturedGameCard {...featuredGame} />
                    </div>
                )}
                <h1 className="mt-8 font-bold">Best Rated Xbox Games</h1>

                <SwiperContainer games={xboxGames} />
                <h1 className="mt-8 font-bold">Smartphone Hits</h1>

                <SwiperContainer games={smartphoneGames} />
            </div>
        </>
    )
}

export default HomePage
