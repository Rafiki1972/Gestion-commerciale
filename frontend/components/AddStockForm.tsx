// components/AddProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
interface AddStockPorps {
    closeAddStock: () => void;
    fetchStock(): void;
    openAlert(): void;
    productsToExclude: string[]
}
interface ProductData {
    ArticleID: number;
    NomDeLArticle: string
}
const AddStockForm = ({ openAlert, closeAddStock, fetchStock, productsToExclude }: AddStockPorps) => {
    const [StockData, setStockData] = useState({
        Supplier: '',
        Product: '',
        Total: '',
        Notes: '',
    });
    const [Supplier, setSupplier] = useState([]);
    const [Products, setProducts] = useState<ProductData[]>([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/Supplier')
            .then((res) => res.json())
            .then((data) => setSupplier(data));
    }, []);
    useEffect(() => {
        fetch('http://localhost:3001/api/Product')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);


    const filteredProducts = Products && Products.length > 0 ? (
        Products.filter(cl => {
            const nomDeLArticle = cl.NomDeLArticle ? cl.NomDeLArticle.toLowerCase() : '';
            return !productsToExclude.some(product => nomDeLArticle.includes(product.toLowerCase()));
        })
    ) : [];


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (StockData.Supplier === '') {
            alert('Veuillez sélectionner un fornisseur.');
            return; // This will exit the function if the condition is met
        }

        if (StockData.Product === '') {
            alert('Veuillez sélectionner au moins un produit.');
            return; // This will exit the function if the condition is met
        }
        try {
            const response = await axios.post('http://localhost:3001/api/addStock', {
                Supplier: StockData.Supplier,
                Product: StockData.Product,
                Total: StockData.Total, // Use the calculated Total
                Notes: StockData.Notes,
            });
            // Handle the response from the backend here
        } catch (error) {
            console.log('Error adding product');
        }
        openAlert();
        closeAddStock()
        fetchStock();
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
                <h2 className="text-xl font-bold mb-4">Add New Stock</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 w-full">
                        <select
                            onChange={(e) => setStockData({ ...StockData, Supplier: e.target.value })}
                            className="w-full bg-transparent text-gray-900 border border-gray-200 px-4 py-2"
                        >
                            <option
                                className="text-black"
                                value="">
                                Fornisseur
                            </option>
                            {Supplier && Supplier.length > 0 ? (
                                Supplier.map((SupplierInfo) => (
                                    <option
                                        key={SupplierInfo['SupplierID']}
                                        className="text-black"
                                        value={SupplierInfo['NomDuFournisseur']}>
                                        {SupplierInfo['NomDuFournisseur']}
                                    </option>
                                ))
                            ) : (
                                <option className="text-black">Aucune donnée disponible </option>
                            )}
                        </select>

                    </div>
                    <div className="mb-4 w-full">
                        <select
                            onChange={(e) => setStockData({ ...StockData, Product: e.target.value })}
                            className="w-full bg-transparent text-gray-900 border border-gray-200 px-4 py-2"
                        >
                            <option
                                className="text-black"
                                value="">
                                Produit
                            </option>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                filteredProducts.map((ProductsInfo) => (
                                    <option
                                        key={ProductsInfo.ArticleID}
                                        className="text-black"
                                        value={ProductsInfo.NomDeLArticle}>
                                        {ProductsInfo.NomDeLArticle}
                                    </option>
                                ))
                            ) : (
                                <option className="text-black">No Product found</option>
                            )}
                        </select>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="NomDeFamille">Quantité</label>
                        <input
                            required
                            type="number"
                            name="total"
                            id="total"
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                            value={StockData.Total}
                            onChange={(e) => setStockData({ ...StockData, Total: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="NomDeFamille">Note</label>
                        <textarea
                            id="NomDeFamille"
                            value={StockData.Notes}
                            onChange={(e) => setStockData({ ...StockData, Notes: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div className='mt-4'>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddStock}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                        >
                            Annuler
                        </button>
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4" type="submit">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AddStockForm;
