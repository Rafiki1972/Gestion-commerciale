import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const ModifierArticle = ({ client, onClose, openAlert, fetchClient }) => {
    const [clientData, setClientData] = useState({
        ClientID: client.ClientID,
        Prenom: client.Prenom,
        NomDeFamille: client.NomDeFamille,
        NumeroDeContact: client.NumeroDeContact,
        Email: client.Email,
        ConditionsDePaiement: client.ConditionsDePaiement,
    });


    const handleSauvegarder = async () => {
        try {
            axios.post('http://localhost:3001/api/editClient',
                {
                    ClientID: clientData.ClientID,
                    updatePrenom: clientData.Prenom,
                    updateNomDeFamille: clientData.NomDeFamille,
                    updateNumeroDeContact: clientData.NumeroDeContact,
                    updateEmail: clientData.Email,
                    updateConditionsDePaiement: clientData.ConditionsDePaiement,
                }
            );
            // You can implement the logic here to Sauvegarder the Modifiered article.
            // For example, you can make an API call to update the article data.
            fetchClient();
            openAlert('Client modifié avec succès');
            // Close the Modifier modal
            onClose();
        } catch (error) {
            console.log('Error edeting client', error);
        }

    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/80 z-50"
        >
            <div className="bg-white p-4 rounded-lg w-2/3">
                <h2 className="text-xl font-bold mb-4">Modifier Client</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Prenom</label>
                    <input
                        type="text"
                        name="NomDeLArticle"
                        value={clientData.Prenom}
                        onChange={(e) => setClientData({ ...clientData, Prenom: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        name="Code"
                        value={clientData.NomDeFamille}
                        onChange={(e) => setClientData({ ...clientData, NomDeFamille: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Numero De Contact</label>
                    <input
                        type="text"
                        name="Cout"
                        value={clientData.NumeroDeContact}
                        onChange={(e) => setClientData({ ...clientData, NumeroDeContact: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="PrixDeVente"
                        value={clientData.Email}
                        onChange={(e) => setClientData({ ...clientData, Email: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Conditions De Paiement</label>
                    <textarea
                        name="description"
                        value={clientData.ConditionsDePaiement}
                        onChange={(e) => setClientData({ ...clientData, ConditionsDePaiement: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
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