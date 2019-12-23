import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ realTime }) => {
  const realData = Object.values(realTime);
  realData.slice(-1);
  let total = 0;
  for (let i = 0; i < 4; i++) total += parseInt(realData[i]);
  console.log(total );
  console.log({ realData: realData });
  const data = {
    labels: ["Windows", "Linux", "Mac", "Others"],
    datasets: [
      {
        label: `Total Votes ${total}`,
        data: realData,
        backgroundColor: ["red", "blue", "green", "orange"]
      }
    ]
  };
  //1.

  //2.

  return (
    <div style={{ height: "100px", width: "1000px", margin: "auto" }}>
      <Bar data={data} options={{}} />
    </div>
  );
};

export default Chart;
