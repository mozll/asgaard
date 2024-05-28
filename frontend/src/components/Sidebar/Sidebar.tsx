const Sidebar = () => {
    return (
        <div className="hidden sm:block">
            <div>
                <h4 className="font-medium">Recommended</h4>
                <ul className="font-light">
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="By Friends"
                            id="byfriends"
                        />
                        <label htmlFor="byfriends" className="ml-2">
                            By Friends
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="By Curators"
                            id="bycurators"
                        />
                        <label htmlFor="bycurators" className="ml-2">
                            By Curators
                        </label>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-medium">Browse Categories</h4>
                <ul className="font-light">
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Top Sellers"
                            id="topsellers"
                        />
                        <label htmlFor="topsellers" className="ml-2">
                            Top Sellers
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="New Releases"
                            id="newreleases"
                        />
                        <label htmlFor="newreleases" className="ml-2">
                            New Releases
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Upcoming" id="upcoming" />
                        <label htmlFor="upcoming" className="ml-2">
                            Upcoming
                        </label>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-medium">Browse by genre</h4>
                <ul className="font-light">
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Free to Play"
                            id="freetoplay"
                        />
                        <label htmlFor="freetoplay" className="ml-2">
                            Free to Play
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Early Access"
                            id="earlyaccess"
                        />
                        <label htmlFor="earlyaccess" className="ml-2">
                            Early Access
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Action" id="action" />
                        <label htmlFor="action" className="ml-2">
                            Action
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Adventure"
                            id="adventure"
                        />
                        <label htmlFor="adventure" className="ml-2">
                            Adventure
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Casual" id="casual" />
                        <label htmlFor="casual" className="ml-2">
                            Casual
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Indie" id="indie" />
                        <label htmlFor="indie" className="ml-2">
                            Indie
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Multiplayer"
                            id="multiplayer"
                        />
                        <label htmlFor="multiplayer" className="ml-2">
                            Multiplayer
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Racing" id="racing" />
                        <label htmlFor="racing" className="ml-2">
                            Racing
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="RPG" id="rpg" />
                        <label htmlFor="rpg" className="ml-2">
                            RPG
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Simulation"
                            id="simulation"
                        />
                        <label htmlFor="simulation" className="ml-2">
                            Simulation
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Sports" id="sports" />
                        <label htmlFor="sports" className="ml-2">
                            Sports
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Strategy" id="strategy" />
                        <label htmlFor="strategy" className="ml-2">
                            Strategy
                        </label>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-medium">Browse by platform</h4>
                <ul className="font-light">
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Smartphone"
                            id="smartphone"
                        />
                        <label htmlFor="smartphone" className="ml-2">
                            Smartphone
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input
                            type="checkbox"
                            name="Playstation"
                            id="playstation"
                        />
                        <label htmlFor="playstation" className="ml-2">
                            Playstation
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Xbox" id="xbox" />
                        <label htmlFor="xbox" className="ml-2">
                            Xbox
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="PC" id="pc" />
                        <label htmlFor="pc" className="ml-2">
                            PC
                        </label>
                    </li>
                    <li className="flex items-center ">
                        <input type="checkbox" name="Nintendo" id="nintendo" />
                        <label htmlFor="nintendo" className="ml-2">
                            Nintendo
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
