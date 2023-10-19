import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddStockForm from './AddStockForm';
import EditStock from './EditStock'
import Alert from './Alert'
import SearchBar from './SearchBar';


interface Stock {
    DarkMode: boolean;
}
interface Stock {
    DarkMode: boolean;
    StockID: number;
    NomDuProduit: string;
    Supplier: string;
    QuantiteDisponible: string;
    Description: string;
}
export default function Stock(props: Stock) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [Stock, setStock] = useState<Stock[]>([]);
    const [AddStock, setAddStock] = useState(false);
    const stockNomDuProduitArray = Stock.map(stock => stock['NomDuProduit']);
    const [selectedStock, setSelectedStock] = useState(null);
    const [searchTerm, setSearchTerm] = useState<string>('');


    const openEditStock = (Stock: any) => {
        setSelectedStock(Stock);
    };

    const closeopenEditStock = () => {
        setSelectedStock(null);
    };



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
        let confirmSupprimer = confirm('Sûr vous souhaitez supprimer ce produit ??');
        if (confirmSupprimer) {

            try {
                axios.post('http://localhost:3001/api/deleteStock', {
                    StockID: StockID,
                });
                openAlert('Stock Supprimerd Successfully');
                fetchStock();
            } catch (error) {
                console.log('Error deleting Stock');
            }
        }
    }

    const filteredStock =
        Stock && Stock.length > 0 ? (
            Stock.filter(cl => {
                const prenom = cl.NomDuProduit ? cl.NomDuProduit.toLowerCase() : '';
                const nomDeFamille = cl.Supplier ? cl.Supplier.toLowerCase() : '';
                return prenom.includes(searchTerm.toLowerCase()) || nomDeFamille.includes(searchTerm.toLowerCase());
            })
        ) : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">
            {AddStock && (
                <AddStockForm openAlert={() => openAlert('Stock added Successfully')} closeAddStock={handleAddStock} fetchStock={fetchStock} productsToExclude={stockNomDuProduitArray} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            {selectedStock && (
                <EditStock Stock={selectedStock} onClose={closeopenEditStock} openAlert={openAlert} fetchStock={fetchStock} />
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

            <SearchBar DarkMode={DarkMode} searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

            <table
                className="w-full text-sm text-left "
                style={{
                    transition: 'height 0.5s ease-in-out',
                    height: `${filteredStock.length * 50 + 40}px`
                }}
            >
                <thead className={`text-xs font-black whitespace-nowrap uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom Du Produit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fornisseur
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
                    {filteredStock && filteredStock.length > 0 ? (
                        filteredStock.map((Stock) => (
                            <tr
                                key={Stock['StockID']}
                                className={`border-b hover:opacity-90 ${DarkMode ? 'odd:bg-gray-600 even:bg-gray-500 even:text-white odd:text-gray-200' : 'odd:bg-gray-200 even:bg-white even:text-gray-900 odd:text-gray-800'}`}
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
                                <td className="px-1 py-4">
                                    <button className='px-3 py-2 text-white bg-cyan-500 rounded transition hover:bg-cyan-500/50 border border-white hover:border-black'
                                        onClick={() => openEditStock(Stock)}
                                    >
                                        Modifier
                                    </button>
                                </td>
                                <td className="px-1 py-4 ">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(Stock['StockID'])}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr
                            className={`border-b dark:bg-gray-900 even:bg-gray-50  ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                        >
                            <td className="px-6 py-4">
                                Aucun Donnees Desponibles
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