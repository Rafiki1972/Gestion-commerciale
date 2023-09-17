import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const EditArticle = ({ Supplier, onClose, openAlert, fetchSupplier }) => {
    const [SupplierData, setSupplierData] = useState({
        SupplierID: Supplier.SupplierID,
        NomDuFournisseur: Supplier.NomDuFournisseur,
        NumeroDeContact: Supplier.NumeroDeContact,
        Email: Supplier.Email,
        ConditionsDePaiement: Supplier.ConditionsDePaiement,
    });


    const handleSave = async () => {
        try {
            axios.post('http://localhost:3001/api/editSupplier',
                {
                    SupplierID: SupplierData.SupplierID,
                    updateNomDuFournisseur: SupplierData.NomDuFournisseur,
                    updateNumeroDeContact: SupplierData.NumeroDeContact,
                    updateEmail: SupplierData.Email,
                    updateConditionsDePaiement: SupplierData.ConditionsDePaiement,
                }
            );
            // You can implement the logic here to save the edited article.
            // For example, you can make an API call to update the article data.
            fetchSupplier();
            openAlert('Supplier Edited Successfully');
            // Close the edit modal
            onClose();  
        } catch (error) {
            console.log('Error editing client', error);
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
                <h2 className="text-xl font-bold mb-4">Edit Client</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                    <input
                        type="text"
                        name="NomDeLArticle"
                        value={SupplierData.NomDuFournisseur}
                        onChange={(e) => setSupplierData({ ...SupplierData, NomDuFournisseur: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Numero De Contact</label>
                    <input
                        type="text"
                        name="Cout"
                        value={SupplierData.NumeroDeContact}
                        onChange={(e) => setSupplierData({ ...SupplierData, NumeroDeContact: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        name="PrixDeVente"
                        value={SupplierData.Email}
                        onChange={(e) => setSupplierData({ ...SupplierData, Email: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded  border"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Conditions De Paiement</label>
                    <textarea
                        name="description"
                        value={SupplierData.ConditionsDePaiement}
                        onChange={(e) => setSupplierData({ ...SupplierData, ConditionsDePaiement: e.target.value })}
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













// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚪⚪🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚪⚪⚪🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴
// 🔴🔴🔴⚪⚪⚪⚪⚪⚫⚫⚫⚪⚫⚫⚫⚫⚫⚪⚪⚪🔴🔴🔴
// 🔴🔴⚪⚪⚪⚫⚪⚪⚪⚫⚫⚫⚫⚫⚪⚫⚫⚫⚪⚪⚪🔴🔴
// 🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴
// 🔴🔴⚪⚪⚪⚫⚫⚫⚪⚫⚫⚫⚫⚫⚪⚪⚪⚫⚪⚪⚪🔴🔴
// 🔴🔴🔴⚪⚪⚪⚫⚫⚫⚫⚫⚪⚫⚫⚫⚪⚪⚪⚪⚪🔴🔴🔴
// 🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴⚪⚪⚪⚫⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴⚪⚪⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚫⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚫⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪⚪⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴⚪🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
// 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴