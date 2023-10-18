import React, { useState, useEffect } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddTransactionForm from './AddTransactionForm';
import Alert from './Alert'


interface Transaction {
    DarkMode: boolean;
}

export default function Transaction(props: Transaction) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [Transaction, setTransaction] = useState([]);
    const [AddTransaction, setAddTransaction] = useState(false);


    function fetchTransaction() {
        fetch('http://localhost:3001/api/Transaction')
            .then((res) => res.json())
            .then((data) => setTransaction(data));
    }
    fetchTransaction();



    const handleAddTransaction = () => {
        setAddTransaction(!AddTransaction);
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


    //delete a Transaction....

    const handleDelete = (TransactionID: any) => {
        let confirmSupprimer = confirm('Sûr vous souhaitez supprimer cette transaction ?');
        if (confirmSupprimer) {

            try {
                axios.post('http://localhost:3001/api/deleteTransaction', {
                    TransactionID: TransactionID,
                });
                openAlert('Transaction Supprimerd Successfully');
                fetchTransaction();
            } catch (error) {
                console.log('Error deleting Transaction');
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
            {AddTransaction && (
                <AddTransactionForm openAlert={() => openAlert('Transaction added Successfully')} closeAddTransaction={handleAddTransaction} fetchTransaction={fetchTransaction} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Transaction</p>
                    <button onClick={handleAddTransaction} title="Add Transaction"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>

            <h1 className='py-4 font-black text-white whitespace-nowrap uppercase tracking-wider'>
                LISTS DES Transactions
            </h1>


            <table
                className="w-full text-sm text-left "
            >
                <thead className={`text-xs font-black whitespace-nowrap uppercase ${DarkMode ? 'bg-gray-900 text-white' : ' bg-purple-900 text-white '}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Montant
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Transaction && Transaction.length > 0 ? (
                        Transaction.map((Transaction) => (
                            <tr
                                key={Transaction['TransactionID']}
                                className={`border-b dark:bg-gray-900 even:bg-gray-10 even:text-black hover:opacity-90 ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {new Date(Transaction['DateDeLaTransaction']).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td className="px-6 py-4 ">
                                    {Transaction['TypeDeTransaction']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {Transaction['Montant']} DH
                                </td>
                                <td className="px-6 py-4 ">
                                    {Transaction['Notes']}
                                </td>

                                <td className="px-1 py-4 ">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(Transaction['TransactionID'])}
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