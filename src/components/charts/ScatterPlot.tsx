import React from 'react';
import { Scatter } from "react-chartjs-2"
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns"; // Pastikan adapter waktu digunakan
import "chartjs-adapter-luxon"
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale, TimeScale, CategoryScale } from 'chart.js';


// Register elemen Chart.js yang diperlukan
ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale, TimeScale, CategoryScale, zoomPlugin);

const ScatterPlot = ({ data, options }: {data:any; options: any;}) => {
  // Data scatterplot
// console.log(data)
  return <Scatter data={data} options={options} />;
};

export default ScatterPlot;