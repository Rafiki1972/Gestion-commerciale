import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddClientForm from './AddClientForm';
import Alert from './Alert'
import EditClient from './EditClient'
import SearchBar from './SearchBar';


interface Client {
    ClientID: number;
    DarkMode: boolean;
    Prenom: string;
    NomDeFamille: string;
    NumeroDeContact: string;
    Email: string;
    ConditionsDePaiement: string;
}

export default function Client(props: Client) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [client, setClient] = useState<Client[]>([]);
    const [AddClient, setAddClient] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState<string>('');



    function fetchClient() {
        fetch('http://localhost:3001/api/Client')
            .then((res) => res.json())
            .then((data) => setClient(data));
    }
    fetchClient();

    const openEditClient = (client: any) => {
        setSelectedClient(client);
    };

    const closeopenEditClient = () => {
        setSelectedClient(null);
    };


    const handleAddClient = () => {
        setAddClient(!AddClient);
    };


    // alert 
    const openAlert = (text: any) => {
        setAlertState(text);
        setTimeout(() => {
            setAlertState(null);
        }, 3000);
    };
    const closeAlert = () => {
        setAlertState(null);
    };


    //delete a client....

    const handleDelete = (ClientID: any) => {
        var confirmSupprimer = confirm('Sûr vous souhaitez supprimer ce client ??');
        if (confirmSupprimer) {

            try {
                axios.post('http://localhost:3001/api/deleteClient', {
                    ClientID: ClientID,
                });
                openAlert('Client Supprimerd Successfully');
                fetchClient();
            } catch (error) {
                console.log('Error deleting client');
            }
        }
    }

    const filteredClient =
        client && client.length > 0 ? (
            client.filter(cl => {
                const prenom = cl.Prenom ? cl.Prenom.toLowerCase() : '';
                const nomDeFamille = cl.NomDeFamille ? cl.NomDeFamille.toLowerCase() : '';
                return prenom.includes(searchTerm.toLowerCase()) || nomDeFamille.includes(searchTerm.toLowerCase());
            })
        ) : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
            {AddClient && (
                <AddClientForm openAlert={() => openAlert('Client added Successfully')} closeAddClient={handleAddClient} fetchClients={fetchClient} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            {selectedClient && (
                <EditClient client={selectedClient} onClose={closeopenEditClient} openAlert={openAlert} fetchClient={fetchClient} />
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

            <h1 className='py-4 font-black text-white whitespace-nowrap uppercase tracking-wider'>
                LISTS DES CLIENTS
            </h1>

            <SearchBar DarkMode={DarkMode} searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

            <table
                className="w-full text-sm text-left"
                style={{
                    transition: 'height 0.5s ease-in-out',
                    height: `${filteredClient.length * 50 + 40}px`
                }}
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
                    {filteredClient && filteredClient.length > 0 ? (
                        filteredClient.map((clientData) => (
                            <tr
                                key={clientData.ClientID}
                                className={`border-b hover:opacity-90 ${DarkMode ? 'odd:bg-gray-600 even:bg-gray-500 even:text-white odd:text-gray-200' : 'odd:bg-gray-200 even:bg-white even:text-gray-900 odd:text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {clientData.Prenom} {clientData.NomDeFamille}
                                </td>
                                <td className="px-6 py-4 ">
                                    {clientData.NumeroDeContact}
                                </td>
                                <td className="px-6 py-4 ">
                                    {clientData.Email}
                                </td>
                                <td className="px-6 py-4 ">
                                    {clientData.ConditionsDePaiement}
                                </td>
                                <td className="px-1 py-4 ">
                                    <button className='px-3 py-2 text-white bg-cyan-500 rounded transition hover:bg-cyan-500/50 border border-white hover:border-black'
                                        onClick={() => openEditClient(clientData)}
                                    >
                                        Modifier
                                    </button>
                                </td>
                                <td className="px-1 py-4 ">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(clientData.ClientID)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                        >
                            <td className="px-4 py-4">
                                Aucun donnes desponible
                            </td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </motion.div>
    );
};