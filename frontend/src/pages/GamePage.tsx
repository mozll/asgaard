import React from 'react'
import PlatformIcons from '../components/GameCard/PlatformIcons'
import ReviewGame from '../components/ReviewSection/ReviewGame'
import { GameDetails, getAllGameData } from '../../services/api-client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const GamePage = () => {
    const [activeTab, setActiveTab] = useState('Reviews')
    const [gameDetails, setGameDetails] = useState<GameDetails>()
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const getGameDetails = async () => {
            try {
                if (!id) return
                const gameDetails = await getAllGameData(id)
                setGameDetails(gameDetails)
            } catch (error) {
                console.error('Error fetching game data: ', error)
            }
        }

        getGameDetails()
    }, [id])

    const platformNames = gameDetails?.platforms.map(
        (platform) => platform.platform.name
    )

    const developers = gameDetails?.developers.map(
        (developer) => developer.name
    )

    const publishers = gameDetails?.publishers.map(
        (publisher) => publisher.name
    )

    const renderGenreTags = () => {
        const firstThreeGenreTags = gameDetails?.genres.slice(0, 3)
        return firstThreeGenreTags?.map((genre, index) => (
            <p key={index} className="text-xs bg-qDark300 p-2 rounded-xl">
                {genre.name}
            </p>
        ))
    }

    return (
        <div>
            {gameDetails ? (
                <div className="sm:mx-16">
                    <div
                        id={gameDetails.id.toString()}
                        className="sm:flex h-auto rounded-md mt-8 "
                    >
                        <div className="sm:w-6/12 w-full">
                            <img
                                src={gameDetails.background_image}
                                alt={`image of ${gameDetails.name}`}
                                className="w-auto h-full object-cover rounded-lg"
                            />
                        </div>
                        <div></div>
                        <div className="sm:w-6/12 w-full flex flex-col justify-between ">
                            <div className="ml-4">
                                <h4 className="text-xl font-bold truncate">
                                    {gameDetails.name}
                                </h4>
                                <p className="font-light mt-2">
                                    {gameDetails.description_raw}
                                </p>
                            </div>
                            <div className="ml-4">
                                {platformNames && (
                                    <PlatformIcons
                                        platformNames={platformNames}
                                    />
                                )}
                                <div className="Tags flex gap-2 my-2 mt-4 flex-wrap">
                                    {renderGenreTags()}
                                </div>
                                <div className="Metacritic flex justify-between mt-4 ">
                                    <div>
                                        <h4 className="font-medium text-xl">
                                            Metacritic rating
                                        </h4>
                                        <p className="font-light text-xs">
                                            {`${gameDetails.reviews_count} reviews`}
                                        </p>
                                    </div>
                                    <div className="Metacritic-score flex-col ">
                                        <p
                                            className={`${
                                                parseInt(
                                                    gameDetails.metacritic
                                                ) >= 90
                                                    ? 'bg-qPrimary400'
                                                    : 'bg-qSecondary400'
                                            } px-2 py-1 my-2 rounded-md text-qDark200 font-medium text-xl `}
                                        >
                                            {gameDetails.metacritic
                                                ? gameDetails.metacritic
                                                : 'TBD'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    <div className="screenshot-container sm:flex gap-2  mt-4">
                        {gameDetails.screenshots.map((screenshot) => (
                            <img
                                className="sm:flex-grow sm:object-cover sm:w-28 sm:h-auto rounded-lg mt-4 transform transition duration-300 hover:scale-110"
                                key={screenshot.id}
                                src={screenshot.image}
                                alt="Screenshot"
                            />
                        ))}
                    </div>
                    <div className="sm:flex">
                        <div className="sm:w-7/12 mt-8">
                            <button
                                className={`mr-8 hover:underline hover:underline-offset-8 ${
                                    activeTab === 'Reviews'
                                        ? 'font-bold underline underline-offset-8 mb-4'
                                        : ''
                                }`}
                                onClick={() => setActiveTab('Reviews')}
                            >
                                Reviews
                            </button>

                            <button
                                className={`mr-8 hover:underline hover:underline-offset-8 ${
                                    activeTab === 'News'
                                        ? 'font-bold underline underline-offset-8 mb-4'
                                        : ''
                                }`}
                                onClick={() => setActiveTab('News')}
                            >
                                News
                            </button>

                            <button
                                className={` hover:underline hover:underline-offset-8 ${
                                    activeTab === 'Forum'
                                        ? 'font-bold underline-offset-8 mb-4'
                                        : ''
                                }`}
                                onClick={() => setActiveTab('Forum')}
                            >
                                Forum
                            </button>
                            {activeTab === 'Reviews' && (
                                <ReviewGame
                                    gameId={gameDetails.id}
                                    gameName={gameDetails.name}
                                />
                            )}

                            {activeTab === 'News' && (
                                <h1>News page component here</h1>
                            )}
                            {activeTab === 'Forum' && (
                                <h1>Forum page component here</h1>
                            )}
                        </div>

                        <div className="sm:w-5/12 sm:ml-16 mt-8 font-light">
                            {gameDetails.stores &&
                                gameDetails.stores.length > 0 && (
                                    <div>
                                        <h4 className="font-bold text-lg">
                                            Buy {gameDetails.name}
                                        </h4>
                                        {gameDetails.stores.map((store) => (
                                            <a
                                                key={store.id}
                                                href={store.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex truncate mt-2 text-qPrimary400 hover:underline "
                                            >
                                                {store.url}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            {gameDetails.website && (
                                <h4 className="font-bold text-lg mt-2">
                                    Official {gameDetails.name} Website
                                </h4>
                            )}
                            <a
                                href={gameDetails.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex truncate mt-2 text-qPrimary400 hover:underline "
                            >
                                {gameDetails.website}
                            </a>
                            {gameDetails.reddit_url && (
                                <h4 className="font-bold text-lg mt-2">
                                    Official {gameDetails.name} Reddit
                                </h4>
                            )}
                            <a
                                href={gameDetails.reddit_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex truncate mt-2 text-qPrimary400 hover:underline "
                            >
                                {gameDetails.reddit_url}
                            </a>
                            <h4 className="font-bold text-lg mt-2">
                                Additional Details
                            </h4>

                            <ul className="mt-2">
                                <li className=" ">Developer: {developers}</li>
                                <li className=" ">Publisher: {publishers}</li>
                                <li className=" ">
                                    Release date: {gameDetails.released}
                                </li>

                                <li className="">
                                    ESRB:{' '}
                                    {gameDetails?.esrb_rating?.name ||
                                        'Not Rated'}
                                </li>

                                <ul>
                                    <p>Playable on:</p>
                                    {platformNames?.map(
                                        (platformName, index) => (
                                            <li
                                                key={index}
                                                className="list-disc ml-5"
                                            >
                                                {platformName},
                                            </li>
                                        )
                                    )}
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading.....</p>
            )}
        </div>
    )
}

export default GamePage
