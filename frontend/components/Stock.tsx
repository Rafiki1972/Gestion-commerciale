import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddStockForm from './AddStockForm';
import Alert from './Alert'


interface Stock {
    DarkMode: boolean;
}

export default function Stock(props: Stock) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [Stock, setStock] = useState([]);
    const [AddStock, setAddStock] = useState(false);


    function fetchStock() {
        fetch('http://localhost:3001/api/Stock')
            .then((res) => res.json())
            .then((data) => setStock(data));
    }
    fetchStock();



    const handleAddStock = () => {
        setAddStock(!AddStock);
    };


    // alert 
    const openAlert = (text: any) => {
        setAlertState(text);
        setTimeout(() => {
            setAlertState(null);
        }, 3000);
    };
    const closeAlert = () => {
        setAlertState(null);
    };


    //delete a Stock....

    const handleDelete = (StockID: any) => {
        let confirmDelete = confirm('Sure you want to delete??');
        if (confirmDelete) {

            try {
                axios.post('http://localhost:3001/api/deleteStock', {
                    StockID: StockID,
                });
                openAlert('Stock Deleted Successfully');
                fetchStock();
            } catch (error) {
                console.log('Error deleting Stock');
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
            {AddStock && (
                <AddStockForm openAlert={() => openAlert('Stock added Successfully')} closeAddStock={handleAddStock} fetchStock={fetchStock} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Stock</p>
                    <button onClick={handleAddStock} title="Add Stock"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>

            <h1 className='py-4 font-black text-white whitespace-nowrap uppercase tracking-wider'>
                LISTS DES Stock
            </h1>


            <table
                className="w-full text-sm text-left "
            >
                <thead className={`text-xs font-black whitespace-nowrap uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom Du Produit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Supplier
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantite Disponible
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th>

                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Stock && Stock.length > 0 ? (
                        Stock.map((Stock) => (
                            <tr
                                key={Stock['StockID']}
                                className={`border-b dark:bg-gray-900 even:bg-gray-10 even:text-black hover:opacity-90 ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {Stock['NomDuProduit']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {Stock['Supplier']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {Stock['QuantiteDisponible']} 
                                </td>
                                <td className="px-6 py-4 ">
                                    {Stock['Description']}
                                </td>

                                <td className="px-1 py-4 ">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(Stock['StockID'])}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                        >
                            <td className="px-6 py-4">
                                Add Data first
                            </td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                            <td className="px-1 py-4"></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </motion.div>
    );
};