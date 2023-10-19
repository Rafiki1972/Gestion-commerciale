import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';


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

interface DataComponentProps {
    data: []; // Replace YourDataType with the actual data type
}

export const Table = (props: TableDarkMode) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    let DarkMode = props.DarkMode;

    useEffect(() => {
        // Make separate requests to both APIs
        Promise.all([
            fetch('http://localhost:3001/api/Supplier').then((res) => res.json())
        ])
            .then(([supplierData]) => {
                setUsers(supplierData);
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
                TOP FORNISSEURES
            </h1>
            {/*
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Fornissor or Client name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`px-4 py-2 border border-gray-500  rounded w-full ${DarkMode ? 'bg-gray-700 text-white' : ''}`}
                /> 
                
                </div>
            */}
            <SearchBar DarkMode={DarkMode} searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
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
                            Fornisseur
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telephone
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
                            className={`border-b hover:opacity-90 ${DarkMode ? 'odd:bg-gray-600 even:bg-gray-500 even:text-white odd:text-gray-200' : 'odd:bg-gray-200 even:bg-white even:text-gray-900 odd:text-gray-800'}`}
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
