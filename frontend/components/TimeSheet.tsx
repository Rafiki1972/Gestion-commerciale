import React, { useState } from 'react';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from 'axios';
import { motion } from 'framer-motion';
import AddTimeSheetForm from './AddTimeSheetForm';
import Alert from './Alert'


interface TimeSheet {
    DarkMode: boolean;
}

export default function TimeSheet(props: TimeSheet) {

    let DarkMode = props.DarkMode;
    const [AlertState, setAlertState] = useState(null);
    const [TimeSheet, setTimeSheet] = useState([]);
    const [AddTimeSheet, setAddTimeSheet] = useState(false);


    function fetchTimeSheet() {
        fetch('http://localhost:3001/api/TimeSheet')
            .then((res) => res.json())
            .then((data) => setTimeSheet(data));
    }
    fetchTimeSheet();



    const handleAddTimeSheet = () => {
        setAddTimeSheet(!AddTimeSheet);
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


    //delete a TimeSheet....

    const handleDelete = (TimesheetID: any) => {
        let confirmSupprimer = confirm();
        if (confirmSupprimer) {

            try {
                axios.post('http://localhost:3001/api/deleteTimeSheet', {
                    TimesheetID: TimesheetID,
                });
                openAlert('TimeSheet Supprimerd Successfully');
                fetchTimeSheet();
            } catch (error) {
                console.log('Error deleting TimeSheet');
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
            {AddTimeSheet && (
                <AddTimeSheetForm openAlert={() => openAlert('TimeSheet added Successfully')} closeAddTimeSheet={handleAddTimeSheet} fetchTimeSheet={fetchTimeSheet} />
            )}
            {AlertState && (
                <Alert AlertText={AlertState} closeAlert={closeAlert} />
            )}
            <div className='fixed z-90 bottom-10 right-8 group'>
                <div className='flex items-end justify-center flex-col'>
                    <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>
                        Ajouter un emploi de temps
                    </p>
                    <button onClick={handleAddTimeSheet} title="Add TimeSheet"
                        className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                        <AiOutlineAppstoreAdd />
                    </button>
                </div>
            </div>

            <h1 className='py-4 font-black text-white whitespace-nowrap uppercase tracking-wider'>
                Emploi du temps
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
                            Employee
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Heures Travaillees
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {TimeSheet && TimeSheet.length > 0 ? (
                        TimeSheet.map((TimeSheet) => (
                            <tr
                                key={TimeSheet['TimeSheetID']}
                                className={`border-b hover:opacity-90 ${DarkMode ? 'odd:bg-gray-600 even:bg-gray-500 even:text-white odd:text-gray-200' : 'odd:bg-gray-200 even:bg-white even:text-gray-900 odd:text-gray-800'}`}
                            >
                                <td className="px-6 py-4 font-black whitespace-nowrap">
                                    {new Date(TimeSheet['Date']).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td className="px-6 py-4 ">
                                    {TimeSheet['Prenom']} {TimeSheet['NomDeFamille']}
                                </td>
                                <td className="px-6 py-4 ">
                                    {TimeSheet['HeuresTravaillees']} Hr
                                </td>
                                <td className="px-1 py-4 ">
                                    <button
                                        className='px-3 py-2 text-white bg-red-500 rounded transition hover:bg-red-500/50 border border-white hover:border-black'
                                        onClick={() => handleDelete(TimeSheet['TimesheetID'])}
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
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </motion.div>
    );
};