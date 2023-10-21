// components/AddProductForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdOutlineSecurity } from "react-icons/md";
interface AddWorkerPorps {
    closeAddWorker: () => void;
    fetchWorkers(): void;
    openAlert(): void;
}
const AddWorkerForm = ({ openAlert, closeAddWorker, fetchWorkers }: AddWorkerPorps) => {
    const [WorkerData, setWorkerData] = useState({
        Prenom: '',
        NomDeFamille: '',
        NumeroDeContact: '',
        Email: '',
        Password: '',
        Poste: '',
        Salaire: '',
        GestionDesEmployes: 0,
        GestionDesArticles: 0,
        GestionDesClient: 0,
        GestionDesFournisseur: 0,
        GestionDeStock: 0,
        GestionDesAchats: 0,
        GestionDesVentes: 0,
        GestionDesFactures: 0,
        GestionDesResourcesHumaine: 0,
    });
    const [LevelsDropdown, setLevelsDropdown] = useState(false)
    const handlLevelsDropdown = () => {
        setLevelsDropdown(!LevelsDropdown)
    }


    // Define a list of job options
    const jobOptions = ['Job 1', 'Job 2', 'Job 3'];

    // Handle job selection
    const handleJobChange = (e: any) => {
        const selectedJob = e.target.value;
        setWorkerData({ ...WorkerData, Poste: selectedJob });
    };


    // Handle access level checkbox change
    const handleAccessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setWorkerData({ ...WorkerData, [name]: checked ? 1 : 0 });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (WorkerData.Poste === '') {
            alert('Select a post first')
            return
        }
        try {
            const response = await axios.post('http://localhost:3001/api/addWorker', {
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
            });
        } catch (error) {
            console.log('Error adding product');
        }
        openAlert();
        closeAddWorker()
        fetchWorkers();
    };




    const accessLevelsDropdown = (
        <div className="relative inline-block w-full ">
            <div
                className="flex  w-full mt-3 items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
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
                    className="mt-2 w-55 origin-top-right absolute top-[-200px] right-[-90%] w-full border border-black rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="access-levels-menu-button"
                >
                    <div className="py-1 grid grid-cols-2 gap-3 " role="none">
                        <label
                            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                            Gestion Des Employes
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
                            Gestion Des Articles
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
                            Gestion Des Fournisseur
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
                            Gestion De Stock
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
                            Gestion Des Achats
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
                            Gestion Des Factures
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
                        Gestion Des ResourcesHumaine
                        <input
                            className="form-checkbox h-5 w-5 text-blue-600"
                            type="checkbox"
                            name="GestionDesResourcesHumaine"
                            checked={WorkerData.GestionDesResourcesHumaine === 1}
                            onChange={handleAccessChange}
                        />
                    </label>
                    <div
                        className="flex w-full mt-3 items-center justify-center text-center p-4 border border-black rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={e => handlLevelsDropdown()}
                    >
                        Fini
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
            transition={{ duration: 0.3 }}
            className="bg-black/80 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50"
        >
            <div className='bg-white p-4 rounded-lg min-w-[500px] max-w-[950px]'>
                <h2 className="text-xl font-bold mb-4">Ajouter Un Nouveau Employe</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Prenom">Prénom d'employee</label>
                            <input
                                required
                                type="text"
                                id="Prenom"
                                value={WorkerData.Prenom}
                                className="mt-1 p-2 w-full border-gray-300 rounded border"
                                onChange={(e) => setWorkerData({ ...WorkerData, Prenom: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="NomDeFamille">Nom d'employee</label>
                            <input
                                required
                                type="text"
                                id="NomDeFamille"
                                value={WorkerData.NomDeFamille}
                                onChange={(e) => setWorkerData({ ...WorkerData, NomDeFamille: e.target.value })}
                                className="mt-1 p-2 w-full border-gray-300 rounded border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="NumeroDeContact">Numero De Contact</label>
                            <input
                                required
                                type="text"
                                id="NumeroDeContact"
                                value={WorkerData.NumeroDeContact}
                                onChange={(e) => setWorkerData({ ...WorkerData, NumeroDeContact: e.target.value })}
                                className="mt-1 p-2 w-full border-gray-300 rounded border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Email">Email</label>
                            <input
                                required
                                type="mail"
                                id="Email"
                                value={WorkerData.Email}
                                onChange={(e) => setWorkerData({ ...WorkerData, Email: e.target.value })}
                                className="mt-1 p-2 w-full border-gray-300 rounded border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Poste">
                                Poste
                            </label>
                            <select
                                required
                                id="Poste"
                                value={WorkerData.Poste}
                                onChange={handleJobChange}
                                className="mt-1 p-2 w-full border-gray-300 rounded border"
                            >
                                <option value="">Select a job</option>
                                {jobOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="Poste">Salaire</label>
                            <input
                                required
                                type="text"
                                id="Salaire"
                                value={WorkerData.Salaire}
                                onChange={(e) => setWorkerData({ ...WorkerData, Salaire: e.target.value })}
                                className="mt-1 p-2 w-full border-gray-300 rounded border"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mt-5" htmlFor="Password">Mots De Pass</label>
                        <input
                            required
                            type="text"
                            id="Password"
                            value={WorkerData.Password}
                            onChange={(e) => setWorkerData({ ...WorkerData, Password: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <div className="mb-4">
                            {accessLevelsDropdown}
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddWorker}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                        >
                            Annuler
                        </button>
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4" type="submit">
                            Sauvegarde
                        </button>
                    </div>
                </form>
            </div >
        </motion.div >
    );
};

export default AddWorkerForm;
