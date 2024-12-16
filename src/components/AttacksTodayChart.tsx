"use client"

import { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import { color } from "chart.js/helpers";


export default function AttacksChart({ Attacksdata }: { Attacksdata: any[] }) {

  // const uniqueSourceIPs = [...new Set(Attacksdata.map((item) => item.source_ip))];
  const sourceIPCounts = Attacksdata.reduce((acc: any, item: any) => {
    // Jika source_ip sudah ada di accumulator, tambahkan 1
    if (acc[item.source_ip]) {
      acc[item.source_ip] += 1;
    } else {
      // Jika belum ada, set menjadi 1
      acc[item.source_ip] = 1;
    }
    return acc;
  }, {});

  const Attacks = Object.entries(sourceIPCounts).map(([IP, Jumlah]) => ({
    IP,
    Jumlah
  }));

  const data = {
    labels: Attacks.map((item) => item.IP),
    datasets: [
      {
        label: "Number of Attacks",
        data: Attacks.map((item) => item.Jumlah),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        
      }
    ]
  }

  const options = {
    responsive: true,
    indexAxis:'y',
    plugins: {
      legend: {
        position: "top",
        color: "white",
        labels:{
          color:"white",
        }
      },
      // title: {
      //   display: true,
      //   text: "Attacks Bar Dynamic - Unique IP Sources",
      //   color: "white",
      // },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(90, 90, 90, 0.5)",  // Warna grid X
          zIndex: -1,  // Grid berada di belakang bar chart
        },
        ticks: {
          zIndex: 1,  // Ticks tetap berada di depan grid
        },
      },
      y: {
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
    elements: {
      bar: {
        zIndex: 2,  // Menyusun bar chart di atas grid
      }
    },
  };

  return (
    <div>
      <div>
        <BarChart data={data} options={options} />
        {/* <h1>Data dari MongoDB</h1>
        <pre>{JSON.stringify(sourceIPCounts, null, 2)}</pre>
        <pre>{JSON.stringify(Attacks, null, 2)}</pre> */}
      </div>
    </div>
  );
}