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
            </div>
        </div>
    );
}

export default SearchPage;
