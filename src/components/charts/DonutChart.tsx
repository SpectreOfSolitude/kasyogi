import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, options }: {data:any; options: any;}) => {

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;