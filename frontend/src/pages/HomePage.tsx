import React, { useEffect, useState } from 'react'
import '../styles.css' // Import your global styles
import Sidebar from '../components/Sidebar/Sidebar'
import SwiperContainer from '../components/SwiperContainer/SwiperContainer'
import FeaturedGameCard from '../components/GameCard/FeaturedGameCard'
import GameCard from '../components/GameCard/GameCard'
import skyrimImage from '../assets/skyrim.png'
import { Game, getNewlyUpdatedGames } from '../../services/api-client'

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

    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        fetchNewlyUpdatedGames()
    }, [])

    const fetchNewlyUpdatedGames = async () => {
        try {
            const gamesData = await getNewlyUpdatedGames()
            setGames(gamesData)
        } catch (error) {
            console.error('Error fetching games:', error)
        }
    }

    return (
        <div className="ml-16">
            <h1 className="mt-8 font-bold">Highest rated</h1>
            <SwiperContainer games={games} />

            <h1 className="mt-8 font-bold">Newly Updated</h1>
            <SwiperContainer games={games} />
            <FeaturedGameCard />
            <h1 className="mt-8 font-bold">Xbox</h1>

            <SwiperContainer games={games} />
            <h1 className="mt-8 font-bold">Smartphone</h1>

            <SwiperContainer games={games} />
        </div>
    )
}

export default HomePage
