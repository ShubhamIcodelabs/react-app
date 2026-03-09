import { useState, useEffect } from "react";

const dummyData = [
    {
        id: 1,
        title: "React Course",
        description: "Learn React step by step",
        image: "https://picsum.photos/400/200?1"
    },
    {
        id: 2,
        title: "JavaScript Guide",
        description: "Master JavaScript fundamentals",
        image: "https://picsum.photos/400/200?2"
    },
    {
        id: 3,
        title: "Node.js Backend",
        description: "Build APIs with Node.js",
        image: "https://picsum.photos/400/200?3"
    },
    {
        id: 4,
        title: "MongoDB Basics",
        description: "Understand NoSQL databases",
        image: "https://picsum.photos/400/200?4"
    },
    {
        id: 5,
        title: "Tailwind CSS",
        description: "Build modern UI faster",
        image: "https://picsum.photos/400/200?5"
    },
    {
        id: 6,
        title: "Next.js Guide",
        description: "Server-side React applications",
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
        <div>
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-2xl mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredData.map((item) => {
                        const isFavorite = favorites.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative"
                            >
                                {/* Favorite Icon */}
                                <button
                                    onClick={() => toggleFavorite(item.id)}
                                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
                                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 cursor-pointer"
                                        fill={isFavorite ? "red" : "none"}
                                        viewBox="0 0 24 24"
                                        stroke={isFavorite ? "red" : "currentColor"}
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {item.description}
                                    </p>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div class="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
                    <div class="flex flex-1 justify-between sm:hidden">
                        <a href="#" class="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">Previous</a>
                        <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">Next</a>
                    </div>
                    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm text-gray-300">
                                Showing
                                <span class="font-medium">1</span>
                                to
                                <span class="font-medium">10</span>
                                of
                                <span class="font-medium">97</span>
                                results
                            </p>
                        </div>
                        <div>
                            <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md">
                                <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                                    <span class="sr-only">Previous</span>
                                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                        <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">1</a>
                                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">2</a>
                                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                                <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 inset-ring inset-ring-gray-700 focus:outline-offset-0">...</span>
                                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">9</a>
                                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">10</a>
                                <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                                    <span class="sr-only">Next</span>
                                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5">
                                        <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
