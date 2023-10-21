// components/AddProductForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
interface AddClientPorps {
    closeAddClient: () => void;
    fetchClients(): void;
    openAlert(): void;
}
const AddClientForm = ({ openAlert, closeAddClient, fetchClients }: AddClientPorps) => {
    const [clientData, setClientData] = useState({
        Prenom: '',
        NomDeFamille: '',
        NumeroDeContact: '',
        Email: '',
        ConditionsDePaiement: '',
    });

    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/addClient', {
                Prenom: clientData.Prenom,
                NomDeFamille: clientData.NomDeFamille,
                NumeroDeContact: clientData.NumeroDeContact,
                Email: clientData.Email,
                ConditionsDePaiement: clientData.ConditionsDePaiement,
            });
            setMessage(response.data.message);
            setClientData({
                Prenom: '',
                NomDeFamille: '',
                NumeroDeContact: '',
                Email: '',
                ConditionsDePaiement: '',
            });
        } catch (error) {
            console.log('Error adding product');
        }
        openAlert();
        closeAddClient()
        fetchClients();
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black/80 flex flex-col items-center justify-center z-50"
        >
            <div className='bg-white p-4 rounded-lg min-w-[500px] max-w-md'>
                <h2 className="text-xl font-bold mb-4">Add New Client</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Prenom">Prénom de client</label>
                        <input
                            required
                            type="text"
                            id="Prenom"
                            value={clientData.Prenom}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            onChange={(e) => setClientData({ ...clientData, Prenom: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="NomDeFamille">Nom De Client</label>
                        <input
                            required
                            type="text"
                            id="NomDeFamille"
                            value={clientData.NomDeFamille}
                            onChange={(e) => setClientData({ ...clientData, NomDeFamille: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="NumeroDeContact">Numero De Contact</label>
                        <input
                            required
                            type="text"
                            id="NumeroDeContact"
                            value={clientData.NumeroDeContact}
                            onChange={(e) => setClientData({ ...clientData, NumeroDeContact: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Email">Email</label>
                        <input
                            required
                            type="mail"
                            id="Email"
                            value={clientData.Email}
                            onChange={(e) => setClientData({ ...clientData, Email: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="ConditionsDePaiement">Conditions De Paiement</label>
                        <input
                            required
                            type="text"
                            id="ConditionsDePaiement"
                            value={clientData.ConditionsDePaiement}
                            onChange={(e) => setClientData({ ...clientData, ConditionsDePaiement: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddClient}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                        >
                            Annuler
                        </button>
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4" type="submit">
                            Sauvegarder
                        </button>
                    </div>
                </form>
                <p>{message}</p>
            </div>
        </motion.div>
    );
};

export default AddClientForm;
