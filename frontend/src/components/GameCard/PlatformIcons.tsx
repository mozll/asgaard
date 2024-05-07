import React from 'react'
import pcIcon from '../../assets/pc-icon.png'
import xboxIcon from '../../assets/xbox-icon.png'
import playstation4Icon from '../../assets/PlayStation4.jpg'
import nintendoIcon from '../../assets/nintendo-icon.png'
import iosIcon from '../../assets/ios.jpg'
import androidIcon from '../../assets/android.png'
import linuxIcon from '../../assets/linux.png'
import WiiIcon from '../../assets/Wii.png'
import GameCubeIcon from '../../assets/GameCube.svg.png'
import xbox360Icon from '../../assets/xbox360.ico'
import nintendo64Icon from '../../assets/Nintendo_64_Logo.svg.png'
import playstationOldIcon from '../../assets/emblem-PlayStation.png'

interface PlatformIconsProps {
    platformNames: string[]
}

const PlatformIcons: React.FC<PlatformIconsProps> = ({ platformNames }) => {
    return (
        <div className="Icons flex gap-2 my-2">
            {platformNames.includes('PC') && (
                <img src={pcIcon} alt="PC icon" className="w-6 h-6" />
            )}
            {(platformNames.includes('Xbox One') ||
                platformNames.includes('Xbox Series X') ||
                platformNames.includes('Xbox Series S')) && (
                <img src={xboxIcon} alt="Xbox icon" className="w-6 h-6" />
            )}
            {(platformNames.includes('PlayStation 3') ||
                platformNames.includes('PlayStation 4')) && (
                <img
                    src={playstation4Icon}
                    alt="PlayStation icon"
                    className="w-6 h-6"
                />
            )}
            {platformNames.includes('Nintendo Switch') && (
                <img
                    src={nintendoIcon}
                    alt="Nintendo icon"
                    className="w-6 h-6"
                />
            )}{' '}
            {platformNames.includes('Android') && (
                <img src={androidIcon} alt="Android icon" className="w-6 h-6" />
            )}
            {(platformNames.includes('iOS') ||
                platformNames.includes('macOS')) && (
                <img
                    src={iosIcon}
                    alt="iOS or macOS icon"
                    className="w-6 h-6"
                />
            )}
            {platformNames.includes('Linux') && (
                <img src={linuxIcon} alt="Linux icon" className="w-6 h-6" />
            )}
            {platformNames.includes('Wii') && (
                <img src={WiiIcon} alt="Wii icon" className="w-6 h-6" />
            )}
            {platformNames.includes('GameCube') && (
                <img
                    src={GameCubeIcon}
                    alt="GameCube icon"
                    className="w-6 h-6"
                />
            )}
            {(platformNames.includes('Xbox 360') ||
                platformNames.includes('Xbox')) && (
                <img
                    src={xbox360Icon}
                    alt="Original Xbox or 360 icon"
                    className="w-6 h-6"
                />
            )}
            {platformNames.includes('Nintendo 64') && (
                <img
                    src={nintendo64Icon}
                    alt="Nintendo 64 icon"
                    className="w-6 h-6"
                />
            )}
            {(platformNames.includes('PlayStation') ||
                platformNames.includes('PlayStation 2')) && (
                <img
                    src={playstationOldIcon}
                    alt="Playstation 1 or 2 icon"
                    className="w-6 h-6"
                />
            )}
        </div>
    )
}

export default PlatformIcons
