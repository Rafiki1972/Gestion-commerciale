import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddClientForm from './AddClientForm';


interface Client {
    DarkMode: boolean;
}

export default function Client(props: Client) {

    const [client, setClient] = useState([]);
    let DarkMode = props.DarkMode;
    const [AddClient, setAddClient] = useState(false);

    function fetchClient() {
        fetch('http://localhost:3001/api/Client')
            .then((res) => res.json())
            .then((data) => setClient(data));
    }
    fetchClient();


    const handleAddClient = () => {
        setAddClient(!AddClient);
    };


    //delete a client....

    const handleDelete = async () => {
        var confirmDelete = confirm('Sure you want to delete this client ??');
        if (confirmDelete) {

            try {
                axios.post('http://localhost:3001/api/deleteClient', {
                    ClientID: client.ClientID,
                });
                fetchClients();
            } catch (error) {
                console.log('Error deleting client');
            }
        }
    }

    return (
        <div className="p-4 w-9/12 min-h-[100vh] ml-auto relative overflow-x-auto my-5 shadow-md sm:rounded-lg">
            {AddClient && (
                <AddClientForm closeAddClient={handleAddClient} fetchClients={fetchClient} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Client</p>
                    <button onClick={handleAddClient} title="Add Client"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>


            <table
                className="w-full text-sm text-left "
            >
                <thead className={`text-xs uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Conditions De Paiement
                        </th>
                        <th>

                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {client.map((user) => (
                        <tr
                            key={user['ClientID']}
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${DarkMode ? 'bg-gray-500' : 'bg-white'}`}
                        >
                            <td className="px-6 py-4 font-black text-gray-900 whitespace-nowrap">
                                {user['Prenom']} {user['NomDeFamille']}
                            </td>
                            <td className="px-6 py-4  text-gray-800">
                                {user['NumeroDeContact']}
                            </td>
                            <td className="px-6 py-4  text-gray-800">
                                {user['Email']}
                            </td>
                            <td className="px-6 py-4  text-gray-800">
                                {user['ConditionsDePaiement']}
                            </td>
                            <td className="px-1 py-4  text-gray-800">
                                <button className='px-3 py-2 text-white bg-cyan-500 rounded'>Edit</button>
                             </td>
                            <td className="px-1 py-4  text-gray-800">
                            <button className='px-3 py-2 text-white bg-red-500 rounded' onClick={handleDelete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};