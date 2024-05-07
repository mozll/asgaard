import { Game } from '../../../services/api-client'
import defaultImage from '../../assets/default-image-icon-missing-picture-page-vector-40546530.jpg'
import PlatformIcons from './PlatformIcons'

const FeaturedGameCard = ({
    id,
    background_image,
    name,
    reviews_count,
    metacritic,
    genres,
    platforms,
    description,
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

    // Sanitize description from RAWG because we get it with html tags
    const sanitizeDescription = (description: string) => {
        const div = document.createElement('div')
        div.innerHTML = description
        return div.textContent || div.innerText || ''
    }

    // If you add a description then use the sanitize function and sanitize the description we get
    const sanitizedDescription = description && sanitizeDescription(description)

    return (
        <div id={id.toString()} className={`flex w-full rounded-md mt-8`}>
            <div className="w-6/12">
                <img
                    src={background_image ? background_image : defaultImage}
                    alt="skyrim image"
                    className="w-auto h-full object-cover"
                />
            </div>
            <div className="w-6/12 ml-4 mr-16 flex flex-col justify-between">
                <div>
                    <h4 className="text-xl font-bold truncate">{name}</h4>
                    <p className="font-light mt-2 line-clamp-6">
                        {sanitizedDescription}
                    </p>
                </div>
                <div>
                    <PlatformIcons platformNames={platformNames} />
                    <div className="Tags flex gap-2 my-2 mt-4 flex-wrap">
                        {renderGenreTags()}
                    </div>
                    <div className="Metacritic flex justify-between mt-4 ">
                        <div>
                            <h4 className="font-medium text-xl">
                                Metacritic rating
                            </h4>
                            <p className="font-light text-xs">
                                {`${reviews_count} reviews`}
                            </p>
                        </div>
                        <div className="Metacritic-score flex flex-col">
                            <p
                                className={`${
                                    parseInt(metacritic) >= 97
                                        ? 'bg-qPrimary400'
                                        : 'bg-qSecondary400'
                                } px-2 py-1 my-2 rounded-md text-qDark200 font-medium text-xl`}
                            >
                                {metacritic ? metacritic : 'TBD'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedGameCard
