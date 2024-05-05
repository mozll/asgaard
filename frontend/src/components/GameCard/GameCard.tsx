import React from 'react'
import skyrimImage from '../../assets/skyrim.png'
import pcIcon from '../../assets/pc-icon.png'
import xboxIcon from '../../assets/xbox-icon.png'
import playstationIcon from '../../assets/playstation-icon.png'
import nintendoIcon from '../../assets/nintendo-icon.png'

const GameCard = () => {
    return (
        <div className="w-full border-2 border-positiveGreen rounded-md">
            <img src={skyrimImage} alt="skyrim image" className="w-full" />
            <h4 className="text-lg font-medium mx-2">
                The Elder Scrolls V Skyrim
            </h4>
            <div className="Icons flex gap-2 mx-2 mt-4">
                <img src={pcIcon} alt="PC icon" />
                <img src={xboxIcon} alt="Xbox icon" />
                <img src={playstationIcon} alt="Playstation icon" />
                <img src={nintendoIcon} alt="Nintendo icon" />
            </div>
            <div className="Tags flex gap-4 mx-2 mt-2 flex-wrap">
                <p className=" bg-qDark300 p-2 rounded-xl">GOTY</p>
                <p className=" bg-qDark300 p-2 rounded-xl">RPG</p>
                <p className=" bg-qDark300 p-2 rounded-xl">Open World</p>
            </div>
            <div className="Metacritic flex mx-2 justify-between">
                <div>
                    <h4 className="font-medium">Metacritic rating</h4>
                    <p className="font-light text-sm">
                        Based on X Critic reviews
                    </p>
                </div>
                <div className="Metacritic-score">
                    <p className="bg-qPrimary400 p-2 rounded-md text-qDark200 font-medium">
                        95
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GameCard
