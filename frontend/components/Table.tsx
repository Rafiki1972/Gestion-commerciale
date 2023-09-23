import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface User {
    SupplierID: number;
    NomDuFournisseur: string;
    NumeroDeContact: string;
    Email: string;
    ConditionsDePaiement: string;
}

interface TableDarkMode {
    DarkMode: boolean
}

export const Table = (props: TableDarkMode) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    let DarkMode = props.DarkMode;

    useEffect(() => {
        fetch('http://localhost:3001/api/Supplier')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const filteredUsers =
        users && users.length > 0 ? (
            users.filter(user =>
                user.NomDuFournisseur.toLowerCase().includes(searchTerm.toLowerCase())
            )
        ) : (
            []
        )

    return (
        <div className="relative overflow-x-auto my-5 shadow-md sm:rounded-lg">
            <h1 className='py-4 font-black text-white whitespace-nowrap'>
                TOP FORNISSEURES
            </h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Fornissor name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`px-4 py-2 border rounded w-full ${DarkMode ? 'bg-gray-700 text-white' : ''}`}
                />
            </div>
            <table
                className="w-full text-sm text-left "
                style={{
                    transition: 'height 0.5s ease-in-out',
                    height: `${filteredUsers.slice(0, 10).length * 50 + 40}px` // Adjust the height calculation as needed
                }}
            >
                <thead className={`text-xs uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
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
                            Conditions De Paiement
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.slice(0, 10).map((user) => (
                        <tr
                            key={user.SupplierID}
                            className={`border-b dark:bg-gray-900 even:bg-gray-50 text-white even:text-black ${DarkMode ? 'bg-gray-500' : 'bg-white'}`}
                        >
                            <td className="px-6 py-4 font-black whitespace-nowrap">
                                {user.NomDuFournisseur}
                            </td>
                            <td className="px-6 py-4">
                                {user.Email}
                            </td>
                            <td className="px-6 py-4">
                                {user.NumeroDeContact}
                            </td>
                            <td className="px-6 py-4">
                                {user.ConditionsDePaiement}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
