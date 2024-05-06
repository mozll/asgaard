import React from 'react'
import dragonageImg from '../../assets/Dragon_Age_Origins_cover 2.png'
import pcIcon from '../../assets/pc-icon.png'
import xboxIcon from '../../assets/xbox-icon.png'
import playstationIcon from '../../assets/playstation-icon.png'
import nintendoIcon from '../../assets/nintendo-icon.png'

function FeaturedGameCard() {
    return (
        <div className="mr-16">
            <h1 className="flex-grow mt-8 font-bold">Featured</h1>
            <div className="flex mt-2">
                <img src={dragonageImg} alt="" className="h-full w-6/12" />
                <div className="ml-2">
                    <h4 className="GameTitle font-bold text-xl">
                        Dragon Age Origins
                    </h4>
                    <p className="GameDescription font-light mt-2">
                        Set in the fictional kingdom of Ferelden during a period
                        of civil strife, the game puts the player in the role of
                        a warrior, mage, or rogue coming from an elven, human,
                        or dwarven background. The player character is recruited
                        into the Grey Wardens, an ancient order that stands
                        against monstrous forces known as "Darkspawn", and is
                        tasked with defeating the Archdemon that commands them
                        and ending their invasion. The game is played from a
                        third-person perspective that can be shifted to a
                        top-down perspective. Throughout the game, players
                        encounter various companions, who play major roles in
                        the game's plot and gameplay.
                    </p>
                    <div className="Icons flex gap-2 mt-4">
                        <img src={pcIcon} alt="PC icon" />
                        <img src={xboxIcon} alt="Xbox icon" />
                        <img src={playstationIcon} alt="Playstation icon" />
                        <img src={nintendoIcon} alt="Nintendo icon" />
                    </div>

                    <div className="Tags flex gap-2 mt-2 flex-wrap">
                        <p className="text-xs bg-qDark300 p-2 rounded-xl">
                            GOTY
                        </p>
                        <p className="text-xs bg-qDark300 p-2 rounded-xl">
                            RPG
                        </p>
                        <p className="text-xs bg-qDark300 p-2 rounded-xl">
                            Open World
                        </p>
                    </div>
                    <div className="Metacritic flex">
                        <div>
                            <h4 className="font-bold">Metacritic rating</h4>
                            <p className="font-light text-sm">
                                Based on X Critic reviews
                            </p>
                        </div>
                        <div className="Metacritic-score">
                            <p className="bg-qPrimary400 py-2 px-4 rounded-md text-qDark200 font-bold text-lg ml-2">
                                95
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedGameCard
