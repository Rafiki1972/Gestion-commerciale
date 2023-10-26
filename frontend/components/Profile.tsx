import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


interface ProfileProps {
    DarkMode: boolean
}

interface UserProfile {
    username: string;
    Email: string;
    Password: string;
}

const Profile = ({ DarkMode }: ProfileProps) => {
    // State to manage username and password
    const [userProfile, setUserProfile] = useState<UserProfile>({
        username: '',
        Email: '',
        Password: '',
    });




    // Function to handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };



    // from
    useEffect(() => {
        fetch('http://localhost:3001/api/admin')
            .then((res) => res.json())
            .then((data) => setUserProfile(data[0]));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfile({ ...userProfile, [name]: value });
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
            <div className='flex gap-10 items-start justify-between'>
                <div>
                    <h1 className='py-4 font-black text-white whitespace-nowrap uppercase'>
                        Informations Personelles
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={`px-20 mt-10 w-full space-y-8 border-l ${ DarkMode ? 'border-l-gray-600' : 'border-l-white'}`}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="Prenom"
                            name="username"
                            className={`mt-1 p-2 w-full rounded border ${DarkMode ? 'border-gray-300' : 'border-white'}`}
                            value={userProfile.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            id="Email"
                            name="Email"
                            className={`mt-1 p-2 w-full rounded border ${DarkMode ? 'border-gray-300' : 'border-white'}`}
                            value={userProfile.Email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="Email"
                            placeholder='Mots de passe'
                            className={`mt-1 p-2 w-full rounded border ${DarkMode ? 'border-gray-300' : 'border-white'}`}
                        />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                            onClick={handleSubmit}
                        >
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Profile;
