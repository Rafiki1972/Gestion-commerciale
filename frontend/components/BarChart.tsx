import React, { useEffect } from "react";
import { Helmet } from "react-helmet"
import Chart from "chart.js";

export default function BarChart() {
    React.useEffect(() => {
        const dataPieBar = {
            labels: ["Atay", "N3na3", "Khtek", "Mamak", "Caffe", "Chofan"],
            datasets: [
                {
                    label: "Gestion Commercial",
                    data: [300, 500, 120, 300, 80, 250],
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
                    'red',    // color for data at index 0
                    'blue',   // color for data at index 1
                    'green',  // color for data at index 2
                    'black',  // color for data at index 3
                    'black',  // color for data at index 3
                    'black',  // color for data at index 3
                    //...
                ]
            }
        };

        var chartBar = new Chart(document.getElementById("chartBar"), configPieBar);
    }, []);

    return (
        <>
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            </Helmet>
            <div className="relative my-5 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-purple-100">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h1 className="text-purple-600  text-lg font-black	tracking-wide">
                                Products On Stock :
                            </h1>
                            <p className="text-purple-400  font-extrabold text-sm mt-2">
                                How much products left on stock
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative ">
                        <canvas className="my-5" id="chartBar"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}