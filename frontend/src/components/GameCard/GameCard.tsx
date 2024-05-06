import React, { useEffect, useState } from 'react'
import pcIcon from '../../assets/pc-icon.png'
import xboxIcon from '../../assets/xbox-icon.png'
import playstationIcon from '../../assets/playstation-icon.png'
import nintendoIcon from '../../assets/nintendo-icon.png'
import { Game } from '../../../services/api-client'
import defaultImage from '../../assets/default-image-icon-missing-picture-page-vector-40546530.jpg'

const GameCard = ({
    id,
    background_image,
    name,
    reviews_count,
    metacritic,
}: Game) => {
    return (
        <div
            id={id.toString()}
            className={`w-full border-2 rounded-md ${
                parseInt(metacritic) >= 97
                    ? 'border-qPrimary400'
                    : 'border-qSecondary400'
            } `}
        >
            <img
                src={background_image ? background_image : defaultImage}
                alt="skyrim image"
                className="w-full h-full object-cover"
            />
            <h4 className="text-xl font-bold mx-2">{name}</h4>
            <div className="Icons flex gap-2 mx-2 my-2">
                <img src={pcIcon} alt="PC icon" />
                <img src={xboxIcon} alt="Xbox icon" />
                <img src={playstationIcon} alt="Playstation icon" />
                <img src={nintendoIcon} alt="Nintendo icon" />
            </div>
            <div className="Tags flex gap-2 mx-2 my-2 flex-wrap">
                <p className="text-xs bg-qDark300 p-2 rounded-xl">GOTY</p>
                <p className="text-xs bg-qDark300 p-2 rounded-xl">RPG</p>
                <p className="text-xs bg-qDark300 p-2 rounded-xl">Open World</p>
            </div>
            <div className="Metacritic flex mx-2 justify-between">
                <div>
                    <h4 className="font-medium text-xl">Metacritic rating</h4>
                    <p className="font-light text-xs">
                        {`${reviews_count} reviews`}
                    </p>
                </div>
                <div className="Metacritic-score">
                    <p
                        className={`${
                            parseInt(metacritic) >= 97
                                ? 'bg-qPrimary400'
                                : 'bg-qSecondary400'
                        } px-2 py-1 my-2 rounded-md text-qDark200 font-medium text-xl`}
                    >
                        {metacritic}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GameCard
