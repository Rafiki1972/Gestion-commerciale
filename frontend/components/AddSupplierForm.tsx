// components/AddProductForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
interface AddSupllierPorps {
    closeAddSupplier: () => void;
    fetchSupplier(): void;
    openAlert(): void;
}
const AddSupplierForm = ({ openAlert, closeAddSupplier, fetchSupplier }: AddSupllierPorps) => {
    const [supplierData, setSupplierData] = useState({
        NomDuFournisseur: '',
        NumeroDeContact: '',
        Email: '',
        ConditionsDePaiement: '',
    });

    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/addSupplier', {
                NomDuFournisseur: supplierData.NomDuFournisseur,
                NumeroDeContact: supplierData.NumeroDeContact,
                Email: supplierData.Email,
                ConditionsDePaiement: supplierData.ConditionsDePaiement,
            });
            setSupplierData({
                NomDuFournisseur: '',
                NumeroDeContact: '',
                Email: '',
                ConditionsDePaiement: '',
            });
        } catch (error) {
            console.log('Error adding supplier');
        }
        openAlert();
        closeAddSupplier()
        fetchSupplier();
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 bg-black/80"
        >
            <div className='bg-white p-4 rounded-lg min-w-[500px] max-w-md'>
                <h2 className="text-xl font-bold mb-4">Ajouter Nouveau</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Prenom">Nom</label>
                        <input
                            required
                            type="text"
                            id="Prenom"
                            value={supplierData.NomDuFournisseur}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            onChange={(e) => setSupplierData({ ...supplierData, NomDuFournisseur: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="NumeroDeContact">Numero De Contact</label>
                        <input
                            required
                            type="text"
                            id="NumeroDeContact"
                            value={supplierData.NumeroDeContact}
                            onChange={(e) => setSupplierData({ ...supplierData, NumeroDeContact: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Email">Email</label>
                        <input
                            required
                            type="mail"
                            id="Email"
                            value={supplierData.Email}
                            onChange={(e) => setSupplierData({ ...supplierData, Email: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="ConditionsDePaiement">Conditions De Paiement</label>
                        <input
                            required
                            type="text"
                            id="ConditionsDePaiement"
                            value={supplierData.ConditionsDePaiement}
                            onChange={(e) => setSupplierData({ ...supplierData, ConditionsDePaiement: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddSupplier}
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

export default AddSupplierForm;
