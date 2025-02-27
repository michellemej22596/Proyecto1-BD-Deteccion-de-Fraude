import { useState, useEffect } from 'react';
import { IoArrowUp } from 'react-icons/io5';

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button onClick={scrollToTop} className="fixed bottom-3 right-3 border-2 border-yellow-400 hover:bg-yellow-500 text-white rounded-full p-3 shadow-md focus:outline-none">
                    <IoArrowUp className="text-xs" />
                </button>
            )}
        </div>
    );
};

export default ScrollButton;
