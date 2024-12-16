"use client"

import { useEffect, useState } from "react";
import DonutChart from "./charts/DonutChart";

export default function AttacksByPort({ Attacksdata }: { Attacksdata: any[] }) {

  // Menghitung jumlah serangan berdasarkan port
  const PortCounts = Attacksdata.reduce((acc: any, item: any) => {
    if (acc[item.destination_port]) {
      acc[item.destination_port] += 1;
    } else {
      acc[item.destination_port] = 1;
    }
    return acc;
  }, {});

  // Menyusun data berdasarkan port dan jumlah
  const Attacks = Object.entries(PortCounts).map(([port, Jumlah]) => ({
    port,
    Jumlah: Number(Jumlah),
  }));

  // Mengurutkan data berdasarkan Jumlah (serangan terbanyak di atas)
  const sortedAttacks = Attacks.sort((a, b) => b.Jumlah - a.Jumlah);

  // Mengambil 10 teratas
  const top10Attacks = sortedAttacks.slice(0, 10);

  // Menghitung jumlah unique ports
  const uniquePorts = new Set(Attacksdata.map((item: any) => item.destination_port));
  const uniquePortsCount = uniquePorts.size;
  

  // Palet warna yang telah disiapkan
  const colors = [
    'rgba(75, 192, 192, 0.2)',   // Warna utama
    'rgba(75, 192, 192, 1)',     // Lebih gelap
    'rgba(55, 150, 150, 1)',     // Lebih gelap
    'rgba(45, 120, 120, 1)',     // Sangat gelap
    'rgba(95, 215, 215, 0.4)',   // Lebih terang
    'rgba(100, 225, 225, 0.6)',  // Terang dengan transparansi lebih tinggi
    'rgba(135, 240, 240, 0.3)',  // Sangat terang dan transparan
    'rgba(192, 75, 192, 0.5)',   // Warna kontras ungu muda
    'rgba(192, 75, 75, 0.4)',    // Warna kontras merah muda
    'rgba(200, 100, 255, 0.5)'   // Warna kontras ungu terang
  ];

  // Fungsi untuk memilih warna berdasarkan urutan (index)
  const generateColor = (index: number) => {
    // Pilih warna dari palet berdasarkan index
    return colors[index % colors.length];  // Menggunakan modulus untuk siklus ulang warna
  };

  // Data untuk donut chart
  const data = {
    labels: top10Attacks.map((item) => item.port),
    datasets: [
      {
        label: "Number of Attacks",
        data: top10Attacks.map((item) => item.Jumlah),
        backgroundColor: top10Attacks.map((_, index) => generateColor(index)), // Generate warna berdasarkan urutan
        borderColor: top10Attacks.map((_, index) => generateColor(index)), // Sama untuk border
        borderWidth: 1,
      }
    ]
  };

  // Opsi chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
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
    <div>
      <div className="overflow-auto flex justify-center items-center max-h-64">
        <DonutChart data={data} options={options} />
      </div>
      <div className="pb-4 text-center"> Total Unique Ports: {uniquePortsCount}</div>
    </div>
  );
}
