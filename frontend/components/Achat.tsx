import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddAchatForm from './AddAchatForm';
import Alert from './Alert'
import Product from './Product'
import { BiShowAlt } from "react-icons/bi";


interface Achat {
    DarkMode: boolean;
}

export default function Achat(props: Achat) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [Achat, setAchat] = useState([]);
    const [AddAchat, setAddAchat] = useState(false);
    const [productData, setProductData] = useState([]);
    const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);


    // Function to open the product popup and set the product data.

    const handleOpenProductPopup = (data: any) => {
        setProductData(data);
        setIsProductPopupOpen(true);
    };

    // Function to close the product popup.

    const handleCloseProductPopup = () => {
        setIsProductPopupOpen(false);
    };

    function fetchAchat() {
        fetch('http://localhost:3001/api/Achat')
            .then((res) => res.json())
            .then((data) => setAchat(data));
    }
    fetchAchat();



    const handleAddAchat = () => {
        setAddAchat(!AddAchat);
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


    //delete a Achat....

    const hadleDelete = (AchatID: any) => {
        let confirmSupprimer = confirm('sûr vous souhaitez supprimer cette acha ??');
        if (confirmSupprimer) {

            try {
                axios.post('http://localhost:3001/api/deleteAchat', {
                    AchatID: AchatID,
                });
                openAlert('Achat Supprimerd Successfully');
                fetchAchat();
            } catch (error) {
                console.log('Error deleting Achat');
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
            {AddAchat && (
                <AddAchatForm openAlert={() => openAlert('Achat added Successfully')} closeAddAchat={handleAddAchat} fetchAchat={fetchAchat} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            {isProductPopupOpen && (
                <Product productData={productData} closeProduct={handleCloseProductPopup} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Achat</p>
                    <button onClick={handleAddAchat} title="Add Achat"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>

            <h1 className='py-4 font-black text-white whitespace-nowrap uppercase tracking-wider'>
                LISTS DES ACHATS
            </h1>


            <table
                className="w-full text-sm text-left "
            >
                <thead className={`text-xs uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date D'achat
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fornisseur
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Montant Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Notes
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Produits
                        </th>
                        <th>

                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Achat && Achat.length > 0 ? (
                        Achat.map((Achat) => (
                            <tr
                                key={Achat['PurchaseID']}
                                className={`border-b hover:opacity-90 ${DarkMode ? 'odd:bg-gray-600 even:bg-gray-500 even:text-white odd:text-gray-200' : 'odd:bg-gray-200 even:bg-white even:text-gray-900 odd:text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {new Date(Achat['DateDAchat']).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td className="px-6 py-4 ">
                                    {Achat['NomDuFournisseur']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {Achat['MontantTotal']} DH
                                </td>
                                <td className="px-6 py-4 ">
                                    {Achat['Notes']}
                                </td>

                                <td className="px-6 py-4 flex items-center justify-center">
                                    <div
                                        className="flex items-center justify-center cursor-pointer border hover:border-black w-10 items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                        onClick={() => handleOpenProductPopup(Achat['Products'])}
                                    >
                                        <BiShowAlt className="w-5 h-5 flex-shrink-0 transition duration-75" />
                                    </div>
                                </td>
                                <td className="px-1 py-4 ">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => hadleDelete(Achat['PurchaseID'])}
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
                            <td className="px-6 py-4">
                                Aucun Donnees Desponibles
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