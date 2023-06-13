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
    console.log(datas.data)

  const data = {
    // 
    labels: [monthFinder(datas.data[0].date), monthFinder(datas.data[1].date), monthFinder(datas.data[2].date), monthFinder(datas.data[3].date), monthFinder(datas.data[4].date), monthFinder(datas.data[5].date), monthFinder(datas.data[6].date), monthFinder(datas.data[7].date), monthFinder(datas.data[8].date), monthFinder(datas.data[9].date), monthFinder(datas.data[10].date), monthFinder(datas.data[11].date)],
    datasets: [
      {
        label: labels,
        //
        data: [datas.data[0].total, datas.data[1].total, datas.data[2].total, datas.data[3].total, datas.data[4].total, datas.data[5].total, datas.data[6].total, datas.data[7].total, datas.data[8].total, datas.data[9].total, datas.data[10].total, datas.data[11].total],
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
