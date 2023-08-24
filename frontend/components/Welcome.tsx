import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

export const Welcome = ({ name }: any) => {
    const [isOpen, setIsOpen] = useState(true);
    const [newName, setHtml] = useState<string>("")
    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const data = window.localStorage.getItem('WelcomeState');
        if (data !== null) setIsOpen(JSON.parse(data));
    }, []);


    useEffect(() => {
        window.localStorage.setItem('WelcomeState', JSON.stringify(isOpen));
    }, [isOpen]);

    useEffect(() => {
        setHtml(name)
    }, [newName])
    return (
        <>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.5 }}
                >
                    <aside
                        className="fixed bottom-4 end-4 z-50 flex items-center justify-center gap-4 rounded-lg bg-black px-5 py-3 text-white"
                    >
                        <p>
                            👋 Logged in as {newName}
                            {/* Welcome back {newName}*/}
                        </p>

                        <button className="rounded bg-white/20 p-1 hover:bg-white/10"
                            onClick={toggleDropdown}>
                            <span className="sr-only">Close</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </aside>
                </motion.div>
            )}
        </>
    );
}