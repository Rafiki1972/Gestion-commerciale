import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const EditArticle = ({ Vente, onClose, openAlert, fetchVente }) => {
    const [VenteData, setVenteData] = useState({
        VenteID: Vente.VenteID,
        Prenom: Vente.Prenom,
        NomDeFamille: Vente.NomDeFamille,
        NumeroDeContact: Vente.NumeroDeContact,
        Email: Vente.Email,
        ConditionsDePaiement: Vente.ConditionsDePaiement,
    });


    const handleSave = async () => {
        try {
            axios.post('http://localhost:3001/api/editVente',
                {
                    VenteID: VenteData.VenteID,
                    updatePrenom: VenteData.Prenom,
                    updateNomDeFamille: VenteData.NomDeFamille,
                    updateNumeroDeContact: VenteData.NumeroDeContact,
                    updateEmail: VenteData.Email,
                    updateConditionsDePaiement: VenteData.ConditionsDePaiement,
                }
            );
            // You can implement the logic here to save the edited article.
            // For example, you can make an API call to update the article data.
            fetchVente();
            openAlert('Vente Edited Successfully');
            // Close the edit modal
            onClose();
        } catch (error) {
            console.log('Error editing Vente', error);
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
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 z-50"
        >
            <div className="bg-white p-4 rounded-lg w-2/3">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-black opacity-50 z-[-1] text-gray-600 hover:text-gray-800 w-[100%] h-[100%]"
                >
                </button>
                <h2 className="text-xl font-bold mb-4">Edit Vente</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Prenom</label>
                    <input
                        type="text"
                        name="NomDeLArticle"
                        value={VenteData.Prenom}
                        onChange={(e) => setVenteData({ ...VenteData, Prenom: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        name="Code"
                        value={VenteData.NomDeFamille}
                        onChange={(e) => setVenteData({ ...VenteData, NomDeFamille: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Numero De Contact</label>
                    <input
                        type="text"
                        name="Cout"
                        value={VenteData.NumeroDeContact}
                        onChange={(e) => setVenteData({ ...VenteData, NumeroDeContact: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="PrixDeVente"
                        value={VenteData.Email}
                        onChange={(e) => setVenteData({ ...VenteData, Email: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Conditions De Paiement</label>
                    <textarea
                        name="description"
                        value={VenteData.ConditionsDePaiement}
                        onChange={(e) => setVenteData({ ...VenteData, ConditionsDePaiement: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="flex g-5 justify-between">
                    <button
                        onClick={onClose}
                        className="w-[49%] bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="w-[49%] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EditArticle;