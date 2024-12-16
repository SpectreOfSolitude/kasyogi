"use client"

import { useEffect, useState } from "react";
import DonutChart from "./charts/DonutChart";

export default function DionaeaProtocol({ Attacksdata }: { Attacksdata: any[] }) {
  const ProtocolCounts = Attacksdata.reduce((acc: any, item: any) => {
    if (acc[item.protocol]) {
      acc[item.protocol] += 1;
    } else {
      acc[item.protocol] = 1;
    }
    return acc;
  }, {});

  const Attacks = Object.entries(ProtocolCounts).map(([Protocol, Jumlah]) => ({
    Protocol,
    Jumlah
  }));

  const generateColor = (index: number) => {
    const hue = (index * 36) % 360; // 360 / 10 = 36, untuk mendapatkan warna yang bervariasi
    const saturation = 70; // Saturasi tetap
    const lightness = 50 + (index % 5); // Variasi ringan dalam lightness

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const data = {
    labels: Attacks.map((item) => item.Protocol),
    datasets: [
      {
        label: "Number of Attacks",
        data: Attacks.map((item) => item.Jumlah),
        backgroundColor: Attacks.map((_, index) => generateColor(index)),
        borderColor: Attacks.map((_, index) => generateColor(index)),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Letakkan legenda di atas
        align: 'center', // Pusatkan legenda
        labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return context.dataset.label + ': ' + context.raw;
          },
        },
      },
    },
  };

  return (
    <div className="w-full flex items-center justify-center align-center p-4">
    <div className="overflow-auto flex justify-center items-center max-h-48">
      <DonutChart data={data} options={options} />
    </div>
  </div>
  );
}