"use client"

import { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import { color } from "chart.js/helpers";

type Attack = {
  IP: string;
  Jumlah: number;
}


export default function TopReport({ Attacksdata }: { Attacksdata: any[] }) {

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

  const Attacks: Attack[] = Object.entries(sourceIPCounts).map(([IP, Jumlah]) => ({
    IP,
    Jumlah: Jumlah as number
  }));

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-transparent dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Source IP
                </th>
                <th scope="col" className="px-6 py-3">
                    Count
                </th>
            </tr>
        </thead>
        <tbody>
          {Attacks.map((attack, index) => (
            <tr key={index} className="bg-transparent border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {attack.IP}
            </th>
      
            <td className="px-6 py-2">{attack.Jumlah}</td>
          </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
}