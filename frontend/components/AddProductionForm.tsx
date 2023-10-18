import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface AddProductionPorps {
    closeAddProduction: () => void;
    fetchProduction: () => void;
    openAlert: () => void;
}

interface ProductionData {
    Date: string;
    Product: string; // Added to store the type of Production
    Quantity: string;
    Cout: string;
}

const AddProductionForm = ({ openAlert, closeAddProduction, fetchProduction }: AddProductionPorps) => {
    const [ProductionData, setProductionData] = useState<ProductionData>({
        Date: '',
        Product: '', // Initialize with an empty string
        Quantity: '',
        Cout: '',
    });

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/Product')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/addProduction', {
                Date: ProductionData.Date,
                Product: ProductionData.Product,
                Quantity: ProductionData.Quantity,
                Cout: ProductionData.Cout,
            });
            // Handle the response from the backend here
        } catch (error) {
            console.log('Error adding Production');
        }
        openAlert();
        closeAddProduction();
        fetchProduction();
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
                <h2 className="text-xl font-bold mb-4">Ajoter Nouvelle Fabrication</h2>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Date">
                            Date
                        </label>
                        <input
                            type="date"
                            name="Date"
                            id="Date"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={ProductionData.Date}
                            onChange={(e) => setProductionData({ ...ProductionData, Date: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <select
                            onChange={(e) => setProductionData({ ...ProductionData, Product: e.target.value })}
                            className="w-full bg-transparent text-gray-900 border border-gray-200 px-4 py-2"
                        >
                            <option
                                className="text-black"
                                value="">
                                Produit
                            </option>
                            {Products && Products.length > 0 ? (
                                Products.map((ProductsInfo) => (
                                    <option
                                        key={ProductsInfo['ArticleID']}
                                        className="text-black"
                                        value={ProductsInfo['NomDeLArticle']}>
                                        {ProductsInfo['NomDeLArticle']}
                                    </option>
                                ))
                            ) : (
                                <option className="text-black">Aucune donnée disponible</option>
                            )}
                        </select>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Montant">
                            Quantité
                        </label>
                        <input
                            type="number"
                            name="Montant"
                            id="Montant"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={ProductionData.Quantity}
                            onChange={(e) => setProductionData({ ...ProductionData, Quantity: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="Montant">
                            Cout
                        </label>
                        <input
                            type="number"
                            name="Montant"
                            id="Montant"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={ProductionData.Cout}
                            onChange={(e) => setProductionData({ ...ProductionData, Cout: e.target.value })}
                        />
                    </div>
                    <div className='mt-4'>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddProduction}
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

export default AddProductionForm;
