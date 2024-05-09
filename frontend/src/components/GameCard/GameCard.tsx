import { Link } from 'react-router-dom'
import { Game } from '../../../services/api-client'
import defaultImage from '../../assets/default-image-icon-missing-picture-page-vector-40546530.jpg'
import PlatformIcons from './PlatformIcons'

const GameCard = ({
    id,
    background_image,
    name,
    reviews_count,
    metacritic,
    genres,
    platforms,
}: Game) => {
    const platformNames = platforms.map((platform) => platform.platform.name)
    const renderGenreTags = () => {
        const firstThreeGenreTags = genres.slice(0, 3)
        return firstThreeGenreTags.map((genre, index) => (
            <p key={index} className="text-xs bg-qDark300 p-2 rounded-xl">
                {genre.name}
            </p>
        ))
    }

    return (
        <div
            id={id.toString()}
            className={`w-full border-2 rounded-md ${
                parseInt(metacritic) >= 90
                    ? 'border-qPrimary400'
                    : 'border-qSecondary400'
            } `}
        >
            <Link to={`/game/${id}`}>
                <img
                    src={background_image ? background_image : defaultImage}
                    alt="skyrim image"
                    className="w-full h-48 object-cover rounded-t-md"
                />
                <h4 className="text-xl font-bold mx-2 truncate">{name}</h4>
            </Link>
            <div className="mx-2">
                <PlatformIcons platformNames={platformNames} />
            </div>

            <div className="Tags flex gap-2 mx-2 my-2 flex-wrap">
                {renderGenreTags()}
            </div>
            <div className="Metacritic flex mx-2 justify-between">
                <div>
                    <h4 className="font-medium text-xl">Metacritic rating</h4>
                    <p className="font-light text-xs">
                        {`${reviews_count} reviews`}
                    </p>
                </div>
                <div className="Metacritic-score flex-col">
                    <p
                        className={`${
                            parseInt(metacritic) >= 90
                                ? 'bg-qPrimary400'
                                : 'bg-qSecondary400'
                        } px-2 py-1 my-2 rounded-md text-qDark200 font-medium text-xl `}
                    >
                        {metacritic ? metacritic : 'TBD'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GameCard
