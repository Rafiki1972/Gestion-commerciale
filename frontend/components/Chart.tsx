import React, { useEffect, useState } from "react";
import Chart from "chart.js";

interface ChartComponentProps {
    DarkMode: boolean;
}

interface SaleData {
    SaleID: number;
    DateDeVente: string;
    MontantTotal: number;
}

export default function CardLineChart(props: ChartComponentProps) {
    const [salesData, setSalesData] = useState<SaleData[]>([]);
    const DarkMode = props.DarkMode;

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:3001/api/Vente")
            .then((response) => response.json())
            .then((data: SaleData[]) => {
                setSalesData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        // Process the sales data to group by day and calculate the total amount sold for each day
        const groupedData: { [date: string]: number } = {};

        salesData.forEach((sale) => {
            const date = new Date(sale.DateDeVente).toDateString();
            if (groupedData[date]) {
                groupedData[date] += sale.MontantTotal;
            } else {
                groupedData[date] = sale.MontantTotal;
            }
        });

        // Extract the labels and data for the chart
        const labels = Object.keys(groupedData);
        const data = labels.map((date) => groupedData[date]);

        // Chart configuration
        const config = {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Montant des ventes",
                        data: data,
                        backgroundColor: "#58rg47", // Replace with a valid color code
                        borderColor: "#3182ce",
                        fill: false,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Sales Charts",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "white",
                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(255, 255, 255, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        // Create the chart
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    }, [salesData]);
    return (
        <>
            <div className={`border border-gray-500 shadow-2xl relative flex flex-col min-w-0 break-words w-full mb-6 rounded ${DarkMode ? 'bg-gray-700' : 'bg-purple-700'}`}>
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h1 className="text-white text-lg font-black	tracking-wide">Produits vendus par jour:</h1>
                        </div>
                        {/* Year */}
                        <div className="relative w-full max-w-full flex gap-5 flex-grow flex-1 justify-end">
                            <div>
                                <select
                                    name="HeadlineAct"
                                    id="HeadlineAct"
                                    className={`py-1.5 px-2 cursor-pointer rounded-lg border-gray-300 sm:text-sm ${DarkMode ? 'bg-transparent border text-white' : 'text-gray-700 '}`}
                                >
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative ">
                        <canvas id="line-chart" height={300}></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}