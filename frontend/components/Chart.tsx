import React from "react";
import Chart from "chart.js";

interface ChartComponentProps {
    DarkMode: boolean;
}
export default function CardLineChart(props: ChartComponentProps) {
    let DarkMode = props.DarkMode;
    React.useEffect(() => {
        const January = [
            {
                label: new Date().getFullYear(),
                backgroundColor: "#58rg47",
                borderColor: "#3182ce",
                data: [65, 78, 66, 44, 56, 45],
                fill: false,
            }
        ]
        var config = {
            type: "line",
            data: {
                labels: [
                    "Penicillin", 
                    "Minoxidil",
                     "Ampicilline", 
                     "Doxycycline", 
                     "Amikacine", 
                     "Ceftriaxone"
                ],
                datasets: January,
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
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    }, []);
    return (
        <>
            <div className={`shadow-2xl relative flex flex-col min-w-0 break-words w-full mb-6 rounded ${ DarkMode ? 'bg-gray-700' : 'bg-purple-700'}`}>
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h1 className="text-white text-lg font-black	tracking-wide">Products sold Per day:</h1>
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