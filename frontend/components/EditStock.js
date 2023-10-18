import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const ModifierArticle = ({ Stock, onClose, openAlert, fetchStock }) => {
    const [StockData, setStockData] = useState({
        StockID: Stock.StockID,
        QuantiteDisponible: Stock.QuantiteDisponible,
    });


    const handleSauvegarder = async () => {
        try {
            axios.post('http://localhost:3001/api/editStock',
                {
                    StockID: StockData.StockID,
                    QuantiteDisponible: StockData.QuantiteDisponible,
                }
            );
            // You can implement the logic here to Sauvegarder the Modifiered article.
            // For example, you can make an API call to update the article data.
            fetchStock();
            openAlert('Stock Modifiered Successfully');
            // Close the Modifier modal
            onClose();  
        } catch (error) {
            console.log('Error Modifiering client', error);
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
                <h2 className="text-xl font-bold mb-4">Modifier Stock</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor='QuantiteDisponible'>Quantite Disponible</label>
                    <input
                        type="number"
                        name="QuantiteDisponible"
                        value={StockData.QuantiteDisponible}
                        onChange={(e) => setStockData({ ...StockData, QuantiteDisponible: e.target.value })}
                        className="mt-1 p-2 w-full border-gray-300 rounded border"
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