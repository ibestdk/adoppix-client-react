import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({datas,labels}) => {
  // Sample data for the chart
    const monthFinder = (month) => {
        switch (month) {
            case 1: return "January";
            case 2: return "February";
            case 3: return "March";
            case 4: return "April";
            case 5: return "May";
            case 6: return "June";
            case 7: return "July";
            case 8: return "August";
            case 9: return "September";
            case 10: return "October";
            case 11: return "November";
            case 12: return "December";
        }
    }
    console.log(datas.data.date1)

  const data = {
    // 
    labels: [monthFinder(datas.data.date1), monthFinder(datas.data.date2), monthFinder(datas.data.date3)],
    datasets: [
      {
        label: labels,
        //datas.Total1, datas.Total2, datas.Total3
        data: [datas.data.total1, datas.data.total2, datas.data.total3],
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
