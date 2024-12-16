import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';

// Nonaktifkan SSR untuk ScatterPlot
const ScatterPlot = dynamic(() => import("@/components/charts/ScatterPlot"), { ssr: false });
import { color } from "chart.js/helpers";

export default function AttacksTimeline({ Attacksdata }: { Attacksdata: any[] }) {

    const uniqueSourceIPs = [...new Set(Attacksdata.map((item) => item.source_ip))];
    const scatterData = Attacksdata.map((item) => {
        // Menggunakan Luxon untuk konversi waktu UTC
        const convertedTime = DateTime.fromISO(item.timestamp, { zone: 'utc' });
    
        // Mengurangi 7 jam
        const adjustedTime = convertedTime.minus({ hours: 7 });
    
        // Memastikan waktu valid
        const jsDate = adjustedTime.isValid ? adjustedTime.toISO() : null;
    
        console.log("Original Timestamp:", item.timestamp, "Adjusted UTC (minus 7 hours):", jsDate);
    
        return {
            x: jsDate ?? "Invalid Timestamp",  // Nilai fallback jika null
            y: item.source_ip,
        };
    });

    const data = {
        datasets: [
            {
                label: "Attacks Over Time",
                data: scatterData,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            }
        ]
    }

    const options = {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',  // Mengizinkan pan baik pada sumbu X dan Y
                    rangeMin: {
                        x: scatterData[0]?.x, // Batasi pan agar tidak keluar dari waktu pertama
                        y: 0,  // Tidak ada pembatasan pada Y
                    },
                    rangeMax: {
                        x: scatterData[scatterData.length - 1]?.x + 24 * 60 * 60 * 1000, // 24 jam dalam milidetik
                        y: 1,  // Batasi pan untuk y (sesuai data Anda)
                    },
                },
                zoom: {
                    wheel: {
                        enabled: true,  // Aktifkan zoom dengan roda mouse
                        speed: 0.1,  // Kecepatan zoom
                        onZoom: function ({ chart }: any) {
                            const xAxis = chart.scales['x']; // Akses sumbu X
                        }
                    },
                    pinch: {
                        enabled: true,  // Aktifkan zoom dengan pinch di perangkat mobile
                    },
                    mode: 'xy',  // Zoom baik pada sumbu X dan Y
                    rangeMin: {
                        x: scatterData[0]?.x, // Batasi zoom agar tidak keluar dari waktu pertama
                        y: 0,  // Batasi zoom pada sumbu Y
                    },
                    rangeMax: {
                        x: scatterData[scatterData.length - 1]?.x + 24 * 60 * 60 * 1000,  // Membatasi zoom hanya 24 jam (1 hari)
                        y: 1,  // Membatasi zoom pada sumbu Y
                    },
                },
            },
        },

        scales: {
            x: {
                type: 'time',
                adapters: {
                    date: {
                        zone: 'utc', // Mengonversi ke zona waktu UTC
                    },
                },
                time: {
                    unit: "hour",
                    tooltipFormat: 'dd MMM yyyy HH:mm', // Format tooltip
                    displayFormats: {
                        hour: 'HH:mm',  // Format untuk setiap jam
                    },
                    // Menentukan timezone
                    timezone: 'UTC',  // Pastikan zona waktu diatur ke UTC
                },
                title: {
                    display: true,
                    text: "Timestamp",
                    color: "white",
                },
                grid: {
                    color: "rgba(90, 90, 90, 0.5)",  // Warna grid X
                    zIndex: -1,  // Grid berada di belakang bar chart
                },
                ticks: {
                    color: "white",
                    zIndex: 1,  // Ticks tetap berada di depan grid
                },
            },
            y: {
                type: "category",
                labels: uniqueSourceIPs,
                offset: true,
                title: {
                    display: true,
                    text: "Source IP",
                    color: "white",
                },
                grid: {
                    color: "rgba(90, 90, 90, 0.5)",  // Warna grid Y
                    zIndex: -1,  // Grid berada di belakang bar chart
                },
                ticks: {
                    zIndex: 1,  // Ticks tetap berada di depan grid
                    color: "white",
                },
            },
        },
    };

    return (
        <div>
            <div>
                <ScatterPlot data={data} options={options} />
                {/* <h1>Data dari MongoDB</h1>
        <pre>{JSON.stringify(sourceIPCounts, null, 2)}</pre>
        <pre>{JSON.stringify(Attacks, null, 2)}</pre> */}
            </div>
        </div>
    );
}