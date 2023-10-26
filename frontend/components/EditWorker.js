import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineSecurity } from "react-icons/md";
import axios from 'axios';
const ModifierArticle = ({ Worker, onClose, openAlert, fetchWorker }) => {
    const [WorkerData, setWorkerData] = useState({
        EmployeeID: Worker.EmployeeID,
        Prenom: Worker.Prenom,
        NomDeFamille: Worker.NomDeFamille,
        NumeroDeContact: Worker.NumeroDeContact,
        Email: Worker.Email,
        Password: '',
        Poste: Worker.Poste,
        Salaire: Worker.Salaire,
        GestionDesEmployes: Worker.GestionDesEmployes,
        GestionDesArticles: Worker.GestionDesArticles,
        GestionDesClient: Worker.GestionDesClient,
        GestionDesFournisseur: Worker.GestionDesFournisseur,
        GestionDeStock: Worker.GestionDeStock,
        GestionDesAchats: Worker.GestionDesAchats,
        GestionDesVentes: Worker.GestionDesVentes,
        GestionDesFactures: Worker.GestionDesFactures,
        GestionDesResourcesHumaine: Worker.GestionDesResourcesHumaine,
    });
    const jobOptions = ['Post 1', 'Post 2', 'Post 3'];
    const [LevelsDropdown, setLevelsDropdown] = useState(false)
    const handlLevelsDropdown = () => {
        setLevelsDropdown(!LevelsDropdown)
    }

    // Handle job selection
    const handleJobChange = (e) => {
        const selectedJob = e.target.value;
        setWorkerData({ ...WorkerData, Poste: selectedJob });
    };

    const handleSauvegarder = async () => {
        try {
            axios.post('http://localhost:3001/api/editWorker',
                {
                    EmployeeID: WorkerData.EmployeeID,
                    Prenom: WorkerData.Prenom,
                    NomDeFamille: WorkerData.NomDeFamille,
                    NumeroDeContact: WorkerData.NumeroDeContact,
                    Email: WorkerData.Email,
                    Password: WorkerData.Password,
                    Poste: WorkerData.Poste,
                    Salaire: WorkerData.Salaire,
                    GestionDesEmployes: WorkerData.GestionDesEmployes,
                    GestionDesArticles: WorkerData.GestionDesArticles,
                    GestionDesClient: WorkerData.GestionDesClient,
                    GestionDesFournisseur: WorkerData.GestionDesFournisseur,
                    GestionDeStock: WorkerData.GestionDeStock,
                    GestionDesAchats: WorkerData.GestionDesAchats,
                    GestionDesVentes: WorkerData.GestionDesVentes,
                    GestionDesFactures: WorkerData.GestionDesFactures,
                    GestionDesResourcesHumaine: WorkerData.GestionDesResourcesHumaine,
                }
            );
            fetchWorker();
            openAlert('Worker Modifiered Successfully');
            // Close the Modifier modal
            onClose();
        } catch (error) {
            console.log('Error Modifiering Worker', error);
        }

    };



    // Handle access level checkbox change
    const handleAccessChange = (e) => {
        const { name, checked } = e.target;
        setWorkerData({ ...WorkerData, [name]: checked ? 1 : 0 });
    };

    const accessLevelsDropdown = (
        <div className="relative inline-block w-full ">
            <div
                className="flex w-full cursor-pointer mt-3 items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={e => handlLevelsDropdown()}
            >
                Access Levels
                <MdOutlineSecurity
                    className="w-5 h-5 flex-shrink-0 transition duration-75"
                />
            </div>
            {LevelsDropdown && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 w-55 origin-top-right overflow-hidden absolute top-[-200px] right-[-90%] w-full min-w-[500px] border border-black rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="access-levels-menu-button"
                >
                    <div className="py-1 grid grid-cols-2 gap-3 " role="none">
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDesEmployes
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDesEmployes"
                                checked={WorkerData.GestionDesEmployes === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDesArticles
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDesArticles"
                                checked={WorkerData.GestionDesArticles === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDesClient
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDesClient"
                                checked={WorkerData.GestionDesClient === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDesFournisseur
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDesFournisseur"
                                checked={WorkerData.GestionDesFournisseur === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDeStock
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDeStock"
                                checked={WorkerData.GestionDeStock === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDesAchats
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDesAchats"
                                checked={WorkerData.GestionDesAchats === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDesVentes
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDesVentes"
                                checked={WorkerData.GestionDesVentes === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            GestionDesFactures
                            <input
                                className="form-checkbox h-5 w-5 text-blue-600"
                                type="checkbox"
                                name="GestionDesFactures"
                                checked={WorkerData.GestionDesFactures === 1}
                                onChange={handleAccessChange}
                            />
                        </label>
                    </div>
                    <label
                        className="flex items-center justify-center gap-5 w-full px-4 py-2 cursor-pointer">
                        GestionDesResourcesHumaine
                        <input
                            className="form-checkbox h-5 w-5 text-blue-600"
                            type="checkbox"
                            name="GestionDesResourcesHumaine"
                            checked={WorkerData.GestionDesResourcesHumaine === 1}
                            onChange={handleAccessChange}
                        />
                    </label>
                    <div
                        className="flex cursor-pointer w-full mt-3 items-center justify-center text-center p-4 border-t border-black  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={e => handlLevelsDropdown()}
                    >
                        Finish
                    </div>
                </motion.div>
            )}

        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/80 z-50"
        >
            <div className="bg-white p-4 rounded-lg w-2/3">
                <h2 className="text-xl font-bold mb-4">Modifier Worker</h2>
                <div className='w-full grid grid-cols-3 gap-3'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prenom</label>
                        <input
                            type="text"
                            name="NomDeLArticle"
                            value={WorkerData.Prenom}
                            onChange={(e) => setWorkerData({ ...WorkerData, Prenom: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            name="Code"
                            value={WorkerData.NomDeFamille}
                            onChange={(e) => setWorkerData({ ...WorkerData, NomDeFamille: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded  border"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Numero De Contact</label>
                        <input
                            type="text"
                            name="Cout"
                            value={WorkerData.NumeroDeContact}
                            onChange={(e) => setWorkerData({ ...WorkerData, NumeroDeContact: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded  border"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            name="PrixDeVente"
                            value={WorkerData.Email}
                            onChange={(e) => setWorkerData({ ...WorkerData, Email: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded  border"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="text"
                            name="PrixDeVente"
                            // value={WorkerData.Password}
                            onChange={(e) => setWorkerData({ ...WorkerData, Password: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded  border"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Poste</label>
                        <select
                            id="Poste"
                            onChange={handleJobChange}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        >
                            <option value={WorkerData.Poste}>{WorkerData.Poste}</option>
                            {jobOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Salaire</label>
                        <input
                            type="text"
                            name="Salaire"
                            value={WorkerData.Salaire}
                            onChange={(e) => setWorkerData({ ...WorkerData, Salaire: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded  border"
                        />
                    </div>
                    <div className='mt-4'>
                        {accessLevelsDropdown}
                    </div>
                </div>
                <div className="flex g-5 justify-between">
                    <button
                        onClick={onClose}
                        className="w-[49%] bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSauvegarder}
                        className="w-[49%] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Sauvegarder
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ModifierArticle;