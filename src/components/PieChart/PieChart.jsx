import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const PieChart = ({ boardInfo }) => {
  let listColumns = [];
  let listNumberCardInColumn = [];
  boardInfo.columns &&
    boardInfo.columns.map((column) => {
      listColumns.push(column.title);
      listNumberCardInColumn.push(column.cardOrder.length);
    });
  const chartData = {
    labels: listColumns,
    datasets: [
      {
        label: "%trạng thái công việc",
        data: listNumberCardInColumn,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(155, 159, 64, 0.2)",
          "rgba(55, 159, 64, 0.2)",
          "rgba(205, 159, 164, 0.2)",
          "rgba(125, 59, 64, 0.2)",
          "rgba(5, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(155, 159, 64, 1)",
          "rgba(55, 159, 64, 1)",
          "rgba(205, 159, 164, 1)",
          "rgba(125, 59, 64, 1)",
          "rgba(5, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={chartData} />;
};
