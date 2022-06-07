import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ boardInfo }) => {
  let listDate = [];
  let listInteraction = [];
  const { t, i18n } = useTranslation();
  const groups =
    boardInfo.message &&
    boardInfo.message.reduce((groups, game) => {
      const date = game.timestamp.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});

  const groupArrays =
    groups &&
    Object.keys(groups).map((date) => {
      return {
        date,
        games: groups[date],
      };
    });

  groupArrays &&
    groupArrays.reverse().map((item) => {
      listDate.push(item.date);
      listInteraction.push(item.games.length);
    });

  const chartjs = {
    labels: listDate,
    datasets: [
      {
        label: t("text.interactionProgressByDay"),
        data: listInteraction,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Line data={chartjs} />;
};
