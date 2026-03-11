import { useState, useEffect } from "react";
import db from "../../../db.json";

const courseData = db.courses;

function SearchPage() {
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            const favItems = JSON.parse(storedFavorites);
            setFavorites(favItems.map(item => item.id));
        }
    }, []);

    const filteredData = courseData.filter((item) =>
        // item.title.toLowerCase().includes(search.toLowerCase())
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.price.toString().includes(search)
    );
    
    const toggleFavorite = (id) => {
        const item = courseData.find(data => data.id === id);
        const storedFavorites = localStorage.getItem('favorites');
        let favItems = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (favorites.includes(id)) {
            // Remove from favorites
            favItems = favItems.filter(favItem => favItem.id !== id);
            setFavorites(prev => prev.filter(favId => favId !== id));
        } else {
            // Add to favorites
            favItems.push(item);
            setFavorites(prev => [...prev, id]);
        }

        localStorage.setItem('favorites', JSON.stringify(favItems));
    };

    return (
        <div className="bg-[#111827]">
            <div className="container m-auto py-10 hidden xl:block">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Search Courses
                </h3>
                <div className="mt-4 mb-6">
                    <input 
                        type="text" 
                        placeholder="Search for a course..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4 sm:mt-8">
                    {filteredData.map((item, i) => {
                        const isFavorite = favorites.includes(item.id);

                        return (
                            <div key={i} 
                            className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <a href="#" className="overflow-hidden rounded">
                                    <img
                                        src={item.image}
                                        alt="imac image"
                                        className="mx-auto h-44 dark:hidden"
                                        />
                                    <img
                                        src={item.image}
                                        alt="imac image"
                                        className="mx-auto hidden h-44 dark:block"
                                    />
                                </a>
                                <div className="mt-10">
                                    <a 
                                        href="#" 
                                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                                            {item.title}
                                    </a>
                                    <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                                        <span className="line-through">
                                            &#8377; {item.discountPrice || Math.round(item.price * 1.2)} 
                                        </span>
                                        <span className="ml-3 text-4xl font-bold text-gray-900 dark:text-white">
                                            &#8377; {item.price}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => toggleFavorite(item.id)}
                                        dataTooltipTarget="favourites-tooltip-3"
                                        className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                        <svg
                                            className="h-5 w-5"
                                            ariaHidden="true"
                                            viewBox="0 0 24 24"
                                            fill={isFavorite ? "red" : "none"}
                                            stroke={isFavorite ? "red" : "currentColor"}
                                        >
                                            <path
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                        </svg>
                                    </button>
                                    {/* <div
                                        id="favourites-tooltip-3"
                                        role="tooltip"
                                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                        Add to favourites
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div> */}

                                    <button 
                                        type="button" 
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] px-5 py-2.5 text-sm font-medium text-white cursor-pointer"
                                    >
                                        <svg 
                                            className="-ms-2 me-2 h-5 w-5" 
                                            ariaHidden="true" 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="24" 
                                            height="24" 
                                            fill="none" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                stroke="currentColor" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
