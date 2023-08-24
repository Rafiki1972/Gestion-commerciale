import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface User {
    id: number;
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    phone: string;
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
    };
}

interface TableDarkMode {
    DarkMode : boolean
}

export const Table = (props : TableDarkMode) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    let DarkMode = props.DarkMode;

    useEffect(() => {
        fetch('https://fakestoreapi.com/users')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative overflow-x-auto my-5 shadow-md sm:rounded-lg">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Fornissor name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`px-4 py-2 border rounded w-full ${ DarkMode ? 'bg-gray-700 text-white' : ''}`}
                />
            </div>
            <table 
            className="w-full text-sm text-left "
            style={{
                transition: 'height 0.5s ease-in-out',
                height: `${filteredUsers.length * 50 + 40}px` // Adjust the height calculation as needed
            }}
            >
                <thead className={`text-xs uppercase ${ DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Fornissor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Adress
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr
                            key={user.id}
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${ DarkMode ? 'bg-gray-500' : 'bg-white'}`}
                        >
                            <td className="px-6 py-4 font-black text-gray-900 whitespace-nowrap">
                                {user.name.firstname} {user.name.lastname}
                            </td>
                            <td className="px-6 py-4  text-gray-800">
                                {user.email}
                            </td>
                            <td className="px-6 py-4  text-gray-800">
                                {user.phone}
                            </td>
                            <td className="px-6 py-4  text-gray-800">
                                {user.address.city} . {user.address.street} . {user.address.number} . {user.address.zipcode}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
