import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


interface ProfileProps {
    DarkMode: boolean
}

interface UserProfile {
    username: string;
    Email: string;
}

const Profile = ({ DarkMode }: ProfileProps) => {
    // State to manage username and password
    const [users, setUsers] = useState<UserProfile[]>([]);


    // State to manage whether Modifiering is enabled
    const [isModifiering, setIsModifiering] = useState(false);

    const hendleIsModifiering = () => {
        setIsModifiering(!isModifiering)
    }

    // Function to handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };



    // from
    useEffect(() => {
        fetch('http://localhost:3001/api/admin')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
                <div>
                    <h1 className='py-4 font-black text-white whitespace-nowrap uppercase'>
                        Personal Information
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className='w-[70%] float-right px-20 space-y-8 border-l border-l-gray-600'>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="Prenom"
                            className={`mt-1 p-2 w-full border-gray-300 rounded border ${!isModifiering ? 'text-white bg-transparent border-b border-gray-600' : ''}`}
                            value={users.length > 0 ? users[0].username : ''}
                            readOnly={!isModifiering}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="Email"
                            className={`mt-1 p-2 w-full border-gray-300 rounded border ${!isModifiering ? 'text-white bg-transparent border-b border-gray-600' : ''}`}
                            value={users.length > 0 ? users[0].Email : ''}
                            readOnly={!isModifiering}
                        />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        {isModifiering ? (
                            <>
                                <button
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                                    onClick={hendleIsModifiering}
                                >
                                    Annuler
                                </button>
                                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4" type="submit">
                                    Sauvegarder
                                </button>
                            </>
                        ) : (
                            <button
                                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                                onClick={hendleIsModifiering}
                            >
                                Modifier
                            </button>
                        )
                        }
                    </div>
                </form>
        </motion.div>
    );
};

export default Profile;
