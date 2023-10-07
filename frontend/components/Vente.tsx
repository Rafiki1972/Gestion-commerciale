import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddVenteForm from './AddVenteForm';
import Alert from './Alert'
import EditVente from './EditVente'


interface Vente {
    DarkMode: boolean;
}

export default function Vente(props: Vente) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [Vente, setVente] = useState([]);
    const [AddVente, setAddVente] = useState(false);
    const [selectedVente, setSelectedVente] = useState(null);



    function fetchVente() {
        fetch('http://localhost:3001/api/Vente')
            .then((res) => res.json())
            .then((data) => setVente(data));
    }
    fetchVente();

    const openEditVente = (Vente: any) => {
        setSelectedVente(Vente);
    };

    const closeOpenEditVente = () => {
        setSelectedVente(null);
    };


    const handleAddVente = () => {
        setAddVente(!AddVente);
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


    //delete a Vente....

    const handleDelete = (VenteID: any) => {
        var confirmDelete = confirm('Sure you want to delete this Vente ??');
        if (confirmDelete) {

            try {
                axios.post('http://localhost:3001/api/deleteVente', {
                    VenteID: VenteID,
                });
                openAlert('Vente Deleted Successfully');
                fetchVente();
            } catch (error) {
                console.log('Error deleting Vente');
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
            {AddVente && (
                <AddVenteForm openAlert={() => openAlert('Vente added Successfully')} closeAddVente={handleAddVente} fetchVentes={fetchVente} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            {selectedVente && (
                <EditVente Vente={selectedVente} onClose={closeOpenEditVente} openAlert={openAlert} fetchVente={fetchVente} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Vente</p>
                    <button onClick={handleAddVente} title="Add Vente"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>

            <h1 className='py-4 font-black text-white whitespace-nowrap'>
                LISTS DES Vente
            </h1>


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
                    {Vente && Vente.length > 0 ? (
                        Vente.map((user) => (
                            <tr
                                key={user['VenteID']}
                                className={`border-b dark:bg-gray-900 even:bg-gray-50 even:text-black  ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {user['Prenom']} {user['NomDeFamille']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user['NumeroDeContact']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user['Email']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {user['ConditionsDePaiement']}
                                </td>
                                <td className="px-1 py-4 ">
                                    <button className='px-3 py-2 text-white bg-cyan-500 rounded transition hover:bg-cyan-500/50 border border-white hover:border-black'
                                        onClick={() => openEditVente(user)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-1 py-4 ">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(user['VenteID'])}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                        >
                            <td className="px-1 py-4">
                                Add Ventes first
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