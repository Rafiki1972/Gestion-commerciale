
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setCookie, getCookie, removeCookie } from '../components/cookie';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    user_type: string;
    created_at: string | null;
    last_modification: string | null;
    // Add other properties if needed
}


export const Form = () => {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter(); // Initialize useRouter
    const [userInput, setuserInput] = useState(true);

    // from

    const [formData, setFormData] = useState({
        type: 'admen', // Default to Admin user type
        username: '',
        password: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'type') {
            setFormData({ ...formData, [name]: value, username: '', password: '' }); // Reset username and password on type change
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if the entered username and password match any user in the state
        const foundUser = users.find(user => user.username === formData.username && user.password === formData.password);

        if (foundUser) {
            setCookie('username', foundUser.username); // Assuming 'user' is the cookie name

            if (formData.type === foundUser.user_type) {
                router.push('./Dashboard'); // Navigate to the Dashboard based on user type
            } else {
                console.log('User type does not match');
                setuserInput(false);
            }
        } else {
            console.log('Invalid username or password');
            setuserInput(false);
        }
    };




    // from
    useEffect(() => {
        axios.get('http://localhost:3001/api/test')
            .then(response => {
                console.log(response.data);
                // Assuming response.data is an array of User objects
                setUsers(response.data); // Update the users state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div className="w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Sign In To Dashboard
                </h3>
                {!userInput && (
                    <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {formData.username === '' || formData.password === '' ? 'Please enter username and password' : 'Invalid username, password, or user type'}
                    </span>
                )}

                <form onSubmit={handleSubmit} className="group">
                    <div className="mb-1 sm:mb-2">
                        <fieldset className="grid grid-cols-2 gap-4">
                            <legend className="sr-only">Type</legend>

                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="admin"
                                    id="DeliveryStandard"
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                    required
                                    checked={formData.type === 'admin'}
                                    onChange={handleChange}
                                />

                                <label
                                    htmlFor="DeliveryStandard"
                                    className="block cursor-pointer rounded-lg border border-purple-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-purple-200 peer-checked:border-purple-500 peer-checked:ring-1 peer-checked:purple-900"

                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-700 cursor-pointer">Admin</p>

                                        <svg
                                            className="hidden h-5 w-5 text-purple-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <input
                                    required
                                    type="radio"
                                    name="type"
                                    value="worker"
                                    id="DeliveryPriority"
                                    className="peer hidden [&:checked_+_label_svg]:block"
                                    checked={formData.type === 'worker'}
                                    onChange={handleChange}
                                />

                                <label
                                    htmlFor="DeliveryPriority"
                                    className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-purple-500 peer-checked:ring-1 peer-checked:ring-purple-500"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-700 cursor-pointer">Worker</p>

                                        <svg
                                            className="hidden h-5 w-5 text-purple-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>

                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <label htmlFor="email" className="inline-block mb-1 font-medium">
                            Username
                        </label>
                        <input
                            placeholder={
                                formData.username ? formData.username : 'Musta hr'
                            }
                            required
                            pattern="[a-zA-Z\s]+"
                            type="text"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-900 focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <label htmlFor="password" className="inline-block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            placeholder={
                                formData.password ? formData.password : ''
                            }
                            required
                            type="password"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-900 focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-900 hover:bg-purple-700 focus:shadow-outline focus:outline-none
                            group-invalid:cursor-not-allowed group-invalid:opacity-30"
                        >
                            Subscribe
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm">
                        Forgot password ?
                    </p>
                </form>
            </div>
        </div>
    );
};