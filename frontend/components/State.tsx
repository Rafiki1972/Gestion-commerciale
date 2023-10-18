import React, { useState, useEffect } from 'react';

interface Sale {
    SaleID: number;
    DateDeVente: string;
    Prenom: string;
    NomDeFamille: string;
    MontantTotal: number;
    Products: string;
    Notes: string;
}

interface ChartComponentProps {
    DarkMode: boolean;
}

export const State = (props: ChartComponentProps) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const { DarkMode } = props;

    // Fetch data from the API using useEffect
    useEffect(() => {
        fetch('http://localhost:3001/api/Vente')
            .then((res) => res.json())
            .then((data) => setSales(data));
    }, []); // Empty dependency array to run the effect only once when the component mounts

    // Calculate sales for the day, week, and month
    const today = new Date();
    const oneWeekAgo = new Date();


    today.setDate(oneWeekAgo.getDate() - 1);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const salesToday = sales.filter((sale) => new Date(sale.DateDeVente) >= today);
    const salesThisWeek = sales.filter((sale) => new Date(sale.DateDeVente) >= oneWeekAgo);
    const salesThisMonth = sales.filter((sale) => new Date(sale.DateDeVente) >= oneMonthAgo);

    console.log('today : ', today)
    console.log('oneWeekAgo : ', oneWeekAgo)
    console.log('oneMonthAgo : ', oneMonthAgo)

    return (
        <div className="ap-5 my-5">
            <h1 className='text-lg font-black tracking-wide text-white'>
                Produits vendus :
            </h1>
            <div className="flex gap-5 my-5">
                <article
                    className={`transition shadow-xl flex items-end justify-between rounded-lg border border-gray-100 p-6 ${DarkMode ? 'bg-gray-200' : 'bg-white'}`}
                >
                    <div className="flex items-center gap-4">
                        <span
                            className="hidden rounded-full bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300 sm:block"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </span>

                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">CE JOUR</p>

                            <p className="text-2xl font-medium text-gray-900 dark:text-white">{calculateTotalSales(salesToday)} Dh</p>
                        </div>
                    </div>

                    <div
                        className=" mx-4 inline-flex gap-2 rounded bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>

                        {/* <span className="text-xs font-medium"> 67.81% </span> */}
                    </div>
                </article>
                <article
                    className={`transition shadow-xl flex items-end justify-between rounded-lg border border-gray-100 p-6 ${DarkMode ? 'bg-gray-200' : 'bg-white'}`}
                >
                    <div className="flex items-center gap-4">
                        <span
                            className="hidden rounded-full bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300 sm:block"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </span>

                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">CETTE SEMAINE</p>

                            <p className="text-2xl font-medium text-gray-900 dark:text-white">{calculateTotalSales(salesThisWeek)} Dh</p>
                        </div>
                    </div>

                    <div
                        className="mx-4 inline-flex gap-2 rounded bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>

                        {/* <span className="text-xs font-medium"> 67.81% </span> */}
                    </div>
                </article>

                <article
                    className={`transition shadow-xl flex items-end justify-between rounded-lg border border-gray-100 p-6 ${DarkMode ? 'bg-gray-200' : 'bg-white'}`}
                >
                    <div className="flex items-center gap-4">
                        <span
                            className="hidden rounded-full bg-gray-100 p-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300 sm:block"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </span>

                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">CE MOIS</p>

                            <p className="text-2xl font-medium text-gray-900 dark:text-white">{calculateTotalSales(salesThisMonth)} Dh</p>
                        </div>
                    </div>

                    <div
                        className="mx-4 inline-flex gap-2 rounded bg-red-100 p-1 text-red-600 dark:bg-red-700 dark:text-red-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            />
                        </svg>

                        {/* <span className="text-xs font-medium"> 67.81% </span> */}
                    </div>
                </article>
            </div>
        </div>
    )

    function calculateTotalSales(sales: Sale[]) {
        return sales.reduce((total, sale) => total + sale.MontantTotal, 0);
    }
}