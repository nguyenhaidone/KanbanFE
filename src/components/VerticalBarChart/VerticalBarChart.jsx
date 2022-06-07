import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [123, 4353, 6345, 3452, 4232, 234, 342],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const VerticalBarChart = ({ boardInfo }) => {
  let listColumns = [];
  const { t } = useTranslation();
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
        label: t("text.numberOfCardsPerStatus"),
        data: listNumberCardInColumn,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar data={chartData} />;
};
