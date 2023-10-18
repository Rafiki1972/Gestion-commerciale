import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Chart from "chart.js";

interface ChartDarkMode {
    DarkMode: boolean;
}

interface StockData {
    StockID: number;
    Supplier: string;
    NomDuProduit: string;
    Description: string;
    QuantiteDisponible: number;
}

export default function BarChart(props: ChartDarkMode) {
    const [stockData, setStockData] = useState<StockData[]>([]); // Specify the type here
    const DarkMode = props.DarkMode;

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:3001/api/Stock")
            .then((response) => response.json())
            .then((data: StockData[]) => {
                // Preprocess the data to aggregate quantities for products with the same name
                const aggregatedData = data.reduce((acc: StockData[], item: StockData) => { // Specify the types here
                    const existingItem = acc.find((aggItem) => aggItem.NomDuProduit === item.NomDuProduit);
                    if (existingItem) {
                        existingItem.QuantiteDisponible += item.QuantiteDisponible;
                    } else {
                        acc.push({ ...item });
                    }
                    return acc;
                }, []);

                // Process the aggregated data and extract values for the chart
                const labels = aggregatedData.map((item) => item.NomDuProduit);
                const quantities = aggregatedData.map((item) => item.QuantiteDisponible);

                const dataPieBar = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Gestion Commercial",
                            data: quantities,
                            backgroundColor: [
                                "rgb(133, 105, 241)",
                                "rgb(164, 101, 241)",
                                "rgb(248, 143, 241)",
                                "rgb(101, 543, 240)",
                                "rgb(963, 143, 246)",
                                "rgb(101, 214, 241)",
                            ],
                            hoverOffset: 4,
                        },
                    ],
                };

                const configPieBar = {
                    type: "bar",
                    data: dataPieBar,
                    options: {
                        color: [
                            "red",
                            "blue",
                            "green",
                            "black",
                            "orange",
                            "yellow",
                            //...
                        ],
                    },
                };

                var chartBar = new Chart(document.getElementById("chartBar"), configPieBar);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            </Helmet>
            <div className={`border border-gray-500 relative my-5 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded transition ${DarkMode ? "bg-gray-700" : "bg-purple-100"}`}>
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h1 className={`text-lg font-black tracking-wide ${DarkMode ? "text-white" : "text-purple-600 "}`}>
                                Pourcentage de produits:
                            </h1>
                            <p className={`font-extrabold text-sm mt-2 ${DarkMode ? "text-gray-100" : "text-purple-400"}`}>
                                Percentage de chaqued produit
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative">
                        <canvas className="my-5" id="chartBar"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}
