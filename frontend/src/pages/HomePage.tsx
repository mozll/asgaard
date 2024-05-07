import React, { useEffect, useState } from 'react'
import '../styles.css' // Import your global styles
import Sidebar from '../components/Sidebar/Sidebar'
import SwiperContainer from '../components/SwiperContainer/SwiperContainer'
import FeaturedGameCard from '../components/GameCard/FeaturedGameCard'
import GameCard from '../components/GameCard/GameCard'
import skyrimImage from '../assets/skyrim.png'
import {
    Game,
    getTopMetacriticGames,
    getXboxGames,
    getSmartphoneGames,
    getPopularGames,
    getFeaturedGame,
} from '../../services/api-client'

// other imports and components

interface Test {
    user_name: string
    user_id: number
    user_email: string
}

const HomePage = () => {
    // const games = [
    //     {
    //         id: 1,
    //         gameImg: skyrimImage,
    //         title: 'The Elder Scrolls V Skyrim',
    //         numberOfCritics: 'X',
    //         metacriticScore: '70',
    //     },
    //     {
    //         id: 2,
    //         gameImg: skyrimImage,
    //         title: 'Fallout',
    //         numberOfCritics: 'X',
    //         metacriticScore: '80',
    //     },
    //     {
    //         id: 3,
    //         gameImg: skyrimImage,
    //         title: 'Animal Crossing',
    //         numberOfCritics: 'X',
    //         metacriticScore: '65',
    //     },
    //     {
    //         id: 4,
    //         gameImg: skyrimImage,
    //         title: 'God of War',
    //         numberOfCritics: 'X',
    //         metacriticScore: '55',
    //     },
    //     {
    //         id: 5,
    //         gameImg: skyrimImage,
    //         title: 'God of War',
    //         numberOfCritics: 'X',
    //         metacriticScore: '55',
    //     },
    //     {
    //         id: 6,
    //         gameImg: skyrimImage,
    //         title: 'God of War',
    //         numberOfCritics: 'X',
    //         metacriticScore: '55',
    //     },
    // ]

    // const [games, setGames] = useState<Game[]>([])

    // useEffect(() => {
    //     fetchNewlyUpdatedGames()
    // }, [])

    // const fetchNewlyUpdatedGames = async () => {
    //     try {
    //         const gamesData = await getNewlyUpdatedGames()
    //         setGames(gamesData)
    //     } catch (error) {
    //         console.error('Error fetching games:', error)
    //     }
    // }

    const [topMetacriticGames, setTopMetacriticGames] = useState<Game[]>([])
    const [popularGames, setPopularGames] = useState<Game[]>([])
    const [xboxGames, setXboxGames] = useState<Game[]>([])
    const [smartphoneGames, setSmartphoneGames] = useState<Game[]>([])
    const [featuredGame, setFeaturedGame] = useState<Game[]>([])

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
        <div className="ml-16">
            <h1 className="mt-8 font-bold">Highest Rated On Metacritic</h1>
            <SwiperContainer games={topMetacriticGames} />

            <h1 className="mt-8 font-bold">Popular games & DLC</h1>
            <SwiperContainer games={popularGames} />
            {featuredGame && (
                <div className="hidden md:block">
                    <FeaturedGameCard
                        id={0}
                        background_image={''}
                        name={''}
                        reviews_count={''}
                        metacritic={''}
                        genres={[]}
                        ratings_count={0}
                        tags={[]}
                        platforms={[]}
                        {...featuredGame}
                    />
                </div>
            )}
            <h1 className="mt-8 font-bold">Xbox Exclusives</h1>

            <SwiperContainer games={xboxGames} />
            <h1 className="mt-8 font-bold">Smartphone Hits</h1>

            <SwiperContainer games={smartphoneGames} />
        </div>
    )
}

export default HomePage
