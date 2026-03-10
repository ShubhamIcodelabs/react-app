import React, { useEffect, useState } from 'react'

function BackToTop() {
    const [visible, setVisible] = useState();

    useEffect(()=>{
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };

    return (
        <>
            {visible && 
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 cursor-pointer"
                >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
                    </svg>
                </button>
            }
        </>
    )
}

export default BackToTop