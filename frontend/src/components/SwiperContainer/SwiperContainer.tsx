import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css'
import skyrimImage from '../../assets/skyrim.png'
import pcIcon from '../../assets/pc-icon.png'
import xboxIcon from '../../assets/xbox-icon.png'
import playstationIcon from '../../assets/playstation-icon.png'
import nintendoIcon from '../../assets/nintendo-icon.png'

import { FreeMode, Scrollbar } from 'swiper/modules'
import GameCard from '../GameCard/GameCard'
import { Game } from '../../../services/api-client'

interface SwiperContainerProps {
    games: Game[]
}

const SwiperContainer = ({ games }: SwiperContainerProps) => {
    const [slidesPerView, setSlidesPerView] = useState(4.5)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth

            if (screenWidth <= 480) {
                setSlidesPerView(1.1)
            } else if (screenWidth <= 640) {
                setSlidesPerView(1.7)
            } else if (screenWidth <= 768) {
                setSlidesPerView(1.5)
            } else if (screenWidth <= 1024) {
                setSlidesPerView(2.4)
            } else if (screenWidth <= 1280) {
                setSlidesPerView(3.3)
            } else if (screenWidth <= 1536) {
                setSlidesPerView(4.3)
            } else {
                setSlidesPerView(5.3)
            }
        }

        handleResize() // Call once initially to set the initial slidesPerView

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={10}
            freeMode={true}
            scrollbar={{ hide: true }}
            modules={[FreeMode, Scrollbar]}
            className="mySwiper"
        >
            {games.map((game, index) => (
                <SwiperSlide key={index}>
                    <GameCard
                        id={game.id}
                        background_image={game.background_image}
                        name={game.name}
                        reviews_count={game.reviews_count}
                        metacritic={game.metacritic}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperContainer
