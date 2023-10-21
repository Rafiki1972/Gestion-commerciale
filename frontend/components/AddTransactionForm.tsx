import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface AddTransactionPorps {
    closeAddTransaction: () => void;
    fetchTransaction: () => void;
    openAlert: () => void;
}

interface TransactionData {
    Date: string;
    Type: string; // Added to store the type of transaction
    Montant: string;
    Notes: string;
}

const AddTransactionForm = ({ openAlert, closeAddTransaction, fetchTransaction }: AddTransactionPorps) => {
    const [transactionData, setTransactionData] = useState<TransactionData>({
        Date: '',
        Type: '', // Initialize with an empty string
        Montant: '',
        Notes: '',
    });

    const [transactionTypes, setTransactionTypes] = useState<string[]>([]); // Define transaction types

    useEffect(() => {
        // Fetch the list of transaction types from the API or a predefined list
        // For now, I'll use a predefined list as an example
        const types = ['Purchase', 'Sale', 'Expense', 'Income'];
        setTransactionTypes(types);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/addTransaction', {
                Date: transactionData.Date,
                Type: transactionData.Type,
                Montant: transactionData.Montant,
                Notes: transactionData.Notes,
            });
            // Handle the response from the backend here
        } catch (error) {
            console.log('Error adding transaction');
        }
        openAlert();
        closeAddTransaction();
        fetchTransaction();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-black/80 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50"
        >
            <div className='bg-white p-4 rounded-lg min-w-[500px] max-w-md'>
                <h2 className="text-xl font-bold mb-4">Ajouter Une Nouvelle Transaction</h2>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Date">
                            Date
                        </label>
                        <input
                            type="date"
                            required
                            name="Date"
                            id="Date"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={transactionData.Date}
                            onChange={(e) => setTransactionData({ ...transactionData, Date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Type">
                            Type De Transaction
                        </label>
                        <select
                            required
                            name="Type"
                            id="Type"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={transactionData.Type}
                            onChange={(e) => setTransactionData({ ...transactionData, Type: e.target.value })}
                        >
                            <option value="">Select Type</option>
                            {transactionTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Montant">
                            Montant
                        </label>
                        <input
                            required
                            type="number"
                            name="Montant"
                            id="Montant"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={transactionData.Montant}
                            onChange={(e) => setTransactionData({ ...transactionData, Montant: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Notes">
                            Note
                        </label>
                        <textarea
                            id="Notes"
                            value={transactionData.Notes}
                            onChange={(e) => setTransactionData({ ...transactionData, Notes: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div className='mt-4'>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddTransaction}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                        >
                            Annuler
                        </button>
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 my-4" type="submit">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AddTransactionForm;
