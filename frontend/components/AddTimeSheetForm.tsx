import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface AddTimeSheetPorps {
    closeAddTimeSheet: () => void;
    fetchTimeSheet: () => void;
    openAlert: () => void;
}

interface TimeSheetData {
    EmployeeID: string;
    Date: string; // Added to store the type of TimeSheet
    HeuresTravaillees: string;
}

const AddTimeSheetForm = ({ openAlert, closeAddTimeSheet, fetchTimeSheet }: AddTimeSheetPorps) => {
    const [TimeSheetData, setTimeSheetData] = useState<TimeSheetData>({
        EmployeeID: '',
        Date: '',
        HeuresTravaillees: '',
    });

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/Worker')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (TimeSheetData.EmployeeID === '') {
            alert('Veuillez sélectionner un employe.');
            return; // This will exit the function if the condition is met
        }

        if (TimeSheetData.Date === '') {
            alert('Veuillez sélectionner une date.');
            return; // This will exit the function if the condition is met
        }
        try {
            const response = await axios.post('http://localhost:3001/api/addTimeSheet', {
                EmployeeID: TimeSheetData.EmployeeID,
                Date: TimeSheetData.Date,
                HeuresTravaillees: TimeSheetData.HeuresTravaillees,
            });
            // Handle the response from the backend here
        } catch (error) {
            console.log('Error adding TimeSheet');
        }
        openAlert();
        closeAddTimeSheet();
        fetchTimeSheet();
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
                <h2 className="text-xl font-bold mb-4">Emploi du temps</h2>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Date">
                            Date
                        </label>
                        <input
                            required
                            type="date"
                            name="Date"
                            id="Date"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={TimeSheetData.Date}
                            onChange={(e) => setTimeSheetData({ ...TimeSheetData, Date: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <select
                            onChange={(e) => setTimeSheetData({ ...TimeSheetData, EmployeeID: e.target.value })}
                            className="w-full bg-transparent text-gray-900 border border-gray-200 px-4 py-2"
                        >
                            <option
                                className="text-black"
                                value="">
                                Employé
                            </option>
                            {Products && Products.length > 0 ? (
                                Products.map((ProductsInfo) => (
                                    <option
                                        key={ProductsInfo['EmployeeID']}
                                        className="text-black"
                                        value={ProductsInfo['EmployeeID']}>
                                        {ProductsInfo['Prenom']} {ProductsInfo['NomDeFamille']}
                                    </option>
                                ))
                            ) : (
                                <option className="text-black">No Worker Found</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Montant">
                            Heures Travaillees
                        </label>
                        <input
                            required
                            type="number"
                            name="Montant"
                            id="Montant"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={TimeSheetData.HeuresTravaillees}
                            onChange={(e) => setTimeSheetData({ ...TimeSheetData, HeuresTravaillees: e.target.value })}
                        />
                    </div>
                    <div className='mt-4'>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddTimeSheet}
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

export default AddTimeSheetForm;
