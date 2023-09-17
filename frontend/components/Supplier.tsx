import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddSupplierForm from './AddSupplierForm';
import Alert from './Alert'
import EditSupplier from './EditSupplier'


interface Supplier {
    DarkMode: boolean;
}

export default function Supplier(props: Supplier) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [Supplier, setSupplier] = useState([]);
    const [AddSupplier, setAddSupplier] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);



    function fetchSupplier() {
        fetch('http://localhost:3001/api/Supplier')
            .then((res) => res.json())
            .then((data) => setSupplier(data));
    }
    fetchSupplier();

    const openEditSupplier = (Supplier: any) => {
        setSelectedSupplier(Supplier);
    };

    const closeOpenEditSupplier = () => {
        setSelectedSupplier(null);
    };


    const handleAddSupplier = () => {
        setAddSupplier(!AddSupplier);
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


    //delete a Supplier....

    const handleDelete = (SupplierID: any) => {
        var confirmDelete = confirm('Sure you want to delete this Supplier ??');
        if (confirmDelete) {

            try {
                axios.post('http://localhost:3001/api/deleteSupplier', {
                    SupplierID: SupplierID,
                });
                openAlert('Supplier Deleted Successfully');
                fetchSupplier();
            } catch (error) {
                console.log('Error deleting Supplier');
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
            {AddSupplier && (
                <AddSupplierForm openAlert={() => openAlert('Supplier added Successfully')} closeAddSupplier={handleAddSupplier} fetchSupplier={fetchSupplier} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            {selectedSupplier && (
                <EditSupplier Supplier={selectedSupplier} onClose={closeOpenEditSupplier} openAlert={openAlert} fetchSupplier={fetchSupplier} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Supplier</p>
                    <button onClick={handleAddSupplier} title="Add Supplier"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>

            <h1 className='py-4 font-black text-white whitespace-nowrap'>
                LISTS DES FORNISSEURES
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
                    {Supplier && Supplier.length > 0 ? (
                        Supplier.map((user) => (
                            <tr
                                key={user['SupplierID']}
                                className={`border-b dark:bg-gray-900 even:bg-gray-50 even:text-black  ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {user['Prenom']} {user['NomDuFournisseur']}
                                </td>
                                <td className="px-6 py-4">
                                    {user['NumeroDeContact']}
                                </td>
                                <td className="px-6 py-4">
                                    {user['Email']}
                                </td>
                                <td className="px-6 py-4">
                                    {user['ConditionsDePaiement']}
                                </td>
                                <td className="px-1 py-4">
                                    <button className='px-3 py-2 text-white bg-cyan-500 rounded transition hover:bg-cyan-500/50 border border-white hover:border-black'
                                        onClick={() => openEditSupplier(user)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-1 py-4">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(user['SupplierID'])}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${DarkMode ? 'bg-gray-500' : 'bg-white'}`}
                        >
                            <td className="px-4 py-4  text-gray-800">
                                Add Suppliers first
                            </td>
                            <td className="px-1 py-4  text-gray-800"></td>
                            <td className="px-1 py-4  text-gray-800"></td>
                            <td className="px-1 py-4  text-gray-800"></td>
                            <td className="px-1 py-4  text-gray-800"></td>
                            <td className="px-1 py-4  text-gray-800"></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </motion.div>
    );
};