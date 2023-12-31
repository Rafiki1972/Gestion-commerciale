
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setCookie } from '../components/cookie';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
const bcrypt = require('bcryptjs');


interface User {
    user_id: number;
    username: string;
    Prenom: string;
    Email: string;
    EmployeeID: string;
    Password: string;
    user_type: string;
    created_at: string | null;
    last_modification: string | null;
}


export const Form = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [worker, setWorker] = useState<User[]>([]);
    const router = useRouter(); // Initialize useRouter
    const [userInput, setuserInput] = useState(true);
    const [errorAnimation, setErrorAnimation] = useState(false);

    // from

    const [formData, setFormData] = useState({
        type: 'admin', // Default to Admin user type
        Email: '',
        Password: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorAnimation(false); // Reset errorAnimation to false


        if (formData.type === 'admin') {
            const foundUser = Array.isArray(users)
                ? users.find(user => user.Email === formData.Email) || undefined
                : undefined;

            if (foundUser) {
                const passwordMatch = await bcrypt.compare(formData.Password, foundUser.Password);

                if (passwordMatch) {
                    // Passwords match, set cookies and navigate to Dashboard
                    setCookie('username', foundUser.username);
                    setCookie('usertype', 'admin');
                    setCookie('userId', foundUser.user_id);

                    router.push('./Dashboard');
                } else {
                    console.log('Invalid username or password');
                    setErrorAnimation(true); // Set errorAnimation to true
                    setuserInput(false);
                }
            } else {
                console.log('Invalid username or password');
                setErrorAnimation(true); // Set errorAnimation to true
                setuserInput(false);
            }
        } else if (formData.type === 'worker') {
            const foundWorker = Array.isArray(worker)
                ? worker.find(w => w.Email === formData.Email) || undefined
                : undefined;

            if (foundWorker) {
                const passwordMatch = await bcrypt.compare(formData.Password, foundWorker.Password);
                console.log(passwordMatch);

                if (passwordMatch) {
                    // Passwords match, set cookies and navigate to Dashboard
                    setCookie('usertype', 'worker');
                    setCookie('username', foundWorker.Prenom);
                    setCookie('userId', foundWorker.EmployeeID);

                    router.push('./Dashboard');
                } else {
                    setErrorAnimation(true); // Set errorAnimation to true
                    console.log('Invalid username or password');
                    setErrorAnimation(true); // Set errorAnimation to true
                    setuserInput(false);
                }
            } else {
                setErrorAnimation(true); // Set errorAnimation to true
                console.log('Invalid username or password');
                setErrorAnimation(true); // Set errorAnimation to true
                setuserInput(false);
            }
        }
        setTimeout(() => {
            setErrorAnimation(true);
            setuserInput(false);
        }, 500);
    };





    // from
    useEffect(() => {
        axios.get('http://localhost:3001/api/admin')
            .then(response => {
                // Assuming response.data is an array of User objects
                setUsers(response.data); // Update the users state with the fetched data

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        axios.get('http://localhost:3001/api/worker')
            .then(response => {
                // Assuming response.data is an array of User objects
                setWorker(response.data); // Update the users state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div className={`w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${errorAnimation && 'form-animation'}`}>
            <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Connectez-Vous Au Tableau De Bord
                </h3>
                {!userInput && (
                    <div className="my-5 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {formData.Email === '' || formData.Password === '' ? "Veuillez entrer votre nom d'utilisateur et votre mot de passe" : "Nom d'utilisateur, mot de passe ou type d'utilisateur invalide"}
                    </div>
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
                                    className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-purple-500 peer-checked:ring-1 peer-checked:ring-purple-500"
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
                                        <p className="text-gray-700 cursor-pointer">Employee</p>

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
                            Email
                        </label>
                        <input
                            placeholder={
                                formData.Email ? formData.Email : 'Your Mail'
                            }
                            required
                            // pattern="[a-zA-Z\s]+"
                            type="Email"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-900 focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 "
                            id="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <label htmlFor="password" className="inline-block mb-1 font-medium">
                            Mots De Pass
                        </label>
                        <input
                            placeholder={
                                formData.Password ? formData.Password : 'Your Password'
                            }
                            required
                            type="password"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-900 focus:outline-none focus:shadow-outline"
                            id="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-900 hover:bg-purple-700 focus:shadow-outline focus:outline-none
                            group-invalid:cursor-not-allowed group-invalid:opacity-30"
                        >
                            Se Connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
