import React from 'react'

const TopTagsBar = () => {
    const handleTagClick = (tagName) => {
        // Trigger search with the selected tag
        // You can define your search functionality here
        console.log('Search triggered for', tagName)
    }

    return (
        <div>
            <ul className="justify-center font-light flex flex-wrap">
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Free to Play')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Free to Play
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Early Access')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Early Access
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Action')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Action
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Adventure')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Adventure
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Casual')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Casual
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Indie')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Indie
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Multiplayer')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Multiplayer
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Racing')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Racing
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('RPG')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        RPG
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Simulation')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Simulation
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Sports')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Sports
                    </button>
                </li>
                <li className="flex items-center mr-4 mb-2">
                    <button
                        onClick={() => handleTagClick('Strategy')}
                        className="text-xs bg-qDark300 p-2 rounded-xl hover:bg-qDark400 transition-colors"
                    >
                        Strategy
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TopTagsBar
