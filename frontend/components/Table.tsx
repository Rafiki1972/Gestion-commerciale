import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TbHexagonLetterC , TbHexagonLetterS } from "react-icons/tb";

interface User {
    SupplierID: number;
    ClientID: number;
    NomDuFournisseur: string;
    Prenom: string;
    NumeroDeContact: string;
    Email: string;
    ConditionsDePaiement: string;
}


interface TableDarkMode {
    DarkMode: boolean;
}

export const Table = (props: TableDarkMode) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    let DarkMode = props.DarkMode;

    useEffect(() => {
        // Make separate requests to both APIs
        Promise.all([
            fetch('http://localhost:3001/api/Supplier').then((res) => res.json()),
            fetch('http://localhost:3001/api/Client').then((res) => res.json())
        ])
        .then(([supplierData, clientData]) => {
            // Combine the results from both APIs
            const combinedData = [...supplierData, ...clientData];
            setUsers(combinedData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const filteredUsers =
    users && users.length > 0 ? (
        users.filter(user => {
            const nomDuFournisseur = user.NomDuFournisseur ? user.NomDuFournisseur.toLowerCase() : '';
            const prenom = user.Prenom ? user.Prenom.toLowerCase() : '';
            return nomDuFournisseur.includes(searchTerm.toLowerCase()) || prenom.includes(searchTerm.toLowerCase());
        })
    ) : [];


    return (
        <div className="relative overflow-x-auto my-5 shadow-md sm:rounded-lg">
            <h1 className='py-4 font-black text-white whitespace-nowrap'>
                TOP FORNISSEURES & CLIENTS
            </h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Fornissor or Client name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`px-4 py-2 border border-gray-500  rounded w-full ${DarkMode ? 'bg-gray-700 text-white' : ''}`}
                />
            </div>
            <table
                className="w-full text-sm text-left "
                style={{
                    transition: 'height 0.5s ease-in-out',
                    height: `${filteredUsers.slice(0, 10).length * 50 + 40}px`
                }}
            >
                <thead className={`text-xs uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fornissor / Client
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
                            key={user.SupplierID || user.ClientID}
                            className={`border-b dark:bg-gray-900 even:bg-gray-50 even:text-black hover:opacity-50 ${DarkMode ? 'bg-gray-500' : 'bg-white text-gray-500'}`}
                        >
                            <td className="px-6 py-4">
                                { user.NomDuFournisseur && 
                                <TbHexagonLetterC className="w-[30px] h-[30px]" />}
                                { user.Prenom && 
                                <TbHexagonLetterS className="w-[30px] h-[30px]" />}
                            </td>
                            <td className="px-6 py-4 font-black whitespace-nowrap">
                                {user.NomDuFournisseur || user.Prenom}
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
