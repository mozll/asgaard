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

// interface SwiperContainerProps {
//     className: string
// }

const SwiperContainer = () => {
    const [slidesPerView, setSlidesPerView] = useState(4.5)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth

            if (screenWidth <= 768) {
                setSlidesPerView(1.5)
            } else if (screenWidth <= 1024) {
                setSlidesPerView(2.5)
            } else {
                setSlidesPerView(3.5)
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
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
            <SwiperSlide>
                <GameCard />
            </SwiperSlide>
        </Swiper>
    )
}

export default SwiperContainer
