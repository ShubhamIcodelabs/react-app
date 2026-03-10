import { useState, useEffect } from "react";

const dummyData = [
    {
        id: 1,
        title: "React Course",
        description: "Learn React step by step",
        discountPrice: "100",
        price: "90",
        image: "https://picsum.photos/400/200?1"
    },
    {
        id: 2,
        title: "JavaScript Guide",
        description: "Master JavaScript fundamentals",
        discountPrice: "$50",
        price: "45",
        image: "https://picsum.photos/400/200?2"
    },
    {
        id: 3,
        title: "Node.js Backend",
        description: "Build APIs with Node.js",
        discountPrice: "160",
        price: "140",
        image: "https://picsum.photos/400/200?3"
    },
    {
        id: 4,
        title: "MongoDB Basics",
        description: "Understand NoSQL databases",
        discountPrice: "290",
        price: "240",
        image: "https://picsum.photos/400/200?4"
    },
    {
        id: 5,
        title: "Tailwind CSS",
        description: "Build modern UI faster",
        discountPrice: "150",
        price: "130",
        image: "https://picsum.photos/400/200?5"
    },
    {
        id: 6,
        title: "Next.js Guide",
        description: "Server-side React applications",
        discountPrice: "300",
        price: "260",
        image: "https://picsum.photos/400/200?6"
    }
];

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

    const filteredData = dummyData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const toggleFavorite = (id) => {
        const item = dummyData.find(data => data.id === id);
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
            <div class="container m-auto py-10 hidden xl:block">
                <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                <div class="mt-6 grid grid-cols-4 gap-4 sm:mt-8">
                    {dummyData.map((item, i) => {
                        const isFavorite = favorites.includes(item.id);
                        return (
                            <div key={i} class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <a href="#" class="overflow-hidden rounded">
                                    <img
                                        src={item.image}
                                        alt="imac image"
                                        class="mx-auto h-44 dark:hidden"
                                        />
                                    <img
                                        src={item.image}
                                        alt="imac image"
                                        class="mx-auto hidden h-44 dark:block"
                                    />
                                </a>
                                <div className="mt-10">
                                    <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{item.title}</a>
                                    <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                                <div>
                                    <p class="text-lg font-bold text-gray-900 dark:text-white">
                                        <span class="line-through">&#8377; {item.discountPrice} </span>
                                    </p>
                                    <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">&#8377; {item.price}</p>
                                </div>
                                <div class="mt-6 flex items-center gap-2.5">
                                    <button
                                        data-tooltip-target="favourites-tooltip-3"
                                        type="button"
                                        onClick={() => toggleFavorite(item.id)}
                                        class="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                        <svg
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            fill={isFavorite ? "red" : "none"}
                                            stroke={isFavorite ? "red" : "currentColor"}
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                        </svg>
                                    </button>
                                    {/* <div
                                        id="favourites-tooltip-3"
                                        role="tooltip"
                                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                        Add to favourites
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div> */}

                                    <button type="button" class="inline-flex w-full items-center justify-center rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] px-5 py-2.5 text-sm font-medium text-white cursor-pointer">
                                        <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
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
