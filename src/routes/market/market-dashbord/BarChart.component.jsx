import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 150, 200],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
