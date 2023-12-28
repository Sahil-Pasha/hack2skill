import React, { useState } from "react";

const Dashboard = ({ users, highlightedUserId }) => {
  const [showAgesResults, setShowAgesResults] = useState(false);
  const [showScoresResults, setShowScoresResults] = useState(false);
  const [columnStats, setColumnStats] = useState({
    age: { mean: 0, median: 0, mode: 0 },
    score: { mean: 0, median: 0, mode: 0 },
  });

  const calculateMean = (data) => {
    const sum = data.reduce((acc, value) => acc + value, 0);
    const mean = sum / data.length;
    return mean;
  };

  const calculateMedian = (data) => {
    const sortedData = data.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      return sortedData[middle];
    }
  };

  const calculateMode = (data) => {
    const frequencyMap = {};
    let maxFrequency = 0;
    let modes = [];

    data.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;

      if (frequencyMap[value] > maxFrequency) {
        maxFrequency = frequencyMap[value];
        modes = [value];
      } else if (frequencyMap[value] === maxFrequency) {
        modes.push(value);
      }
    });

    return modes.length === Object.keys(frequencyMap).length ? [] : modes;
  };

  const calculateColumnStats = (columnName) => {
    if (columnName === "age") {
      const data = users.map((item) => item.age);
      const meanResult = calculateMean(data);
      const medianResult = calculateMedian(data);
      const modeResult = calculateMode(data);
      setColumnStats((prevStats) => ({
        ...prevStats,
        [columnName]: {
          mean: meanResult,
          median: medianResult,
          mode: modeResult,
        },
      }));
      setShowAgesResults(true);
    } else if (columnName === "score") {
      const data = users.map((item) => item.score);
      const meanResult = calculateMean(data);
      const medianResult = calculateMedian(data);
      const modeResult = calculateMode(data);
      setColumnStats((prevStats) => ({
        ...prevStats,
        [columnName]: {
          mean: meanResult,
          median: medianResult,
          mode: modeResult,
        },
      }));
      setShowScoresResults(true);
    }
  };

  return (
    <div>
      <div className="bg-cyan-900 flex justify-center items-center h-screen">
        <table className="shadow-2xl font-[poppins] border-2 border-cyan-200 w-8/12 overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className=" py-3 bg-cyan-800">Name</th>

              <th className=" py-3 bg-cyan-800">
                <button onClick={() => calculateColumnStats("age")}>Age</button>
              </th>

              <th className=" py-3 bg-cyan-800">
                <button onClick={() => calculateColumnStats("score")}>
                  Score
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="text-cyan-900 text-center">
            {users.map((user) => (
              <tr
                className={
                  user.id === highlightedUserId
                    ? "bg-green-900 cursor-pointer hover:bg-cyan-100 hover:scale-105 duration-300 text-white"
                    : "bg-cyan-600 cursor-pointer hover:bg-cyan-100 hover:scale-105 duration-300 text-white"
                }
                key={user.id}
              >
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.age}</td>
                <td className="py-3 px-6">{user.score}</td>
              </tr>
            ))}
          </tbody>
          <div>
            {showAgesResults ? (
              <p className="text-white">
                The Mean Median and Mode score for ages {columnStats.age.mean},{" "}
                {columnStats.age.median}, and {columnStats.age.mode}
              </p>
            ) : (
              ""
            )}
            {showScoresResults ? (
              <p className="text-white">
                The Mean Median and Mode score for Scores{" "}
                {columnStats.score.mean}, {columnStats.score.median}, and{" "}
                {columnStats.score.mode}
              </p>
            ) : (
              ""
            )}
          </div>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
