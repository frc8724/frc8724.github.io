import React from "react";

export default function Match({
  competitionLevel,
  matchNumber,
  future,
  redScore,
  blueScore,
}) {
  const redWon = redScore > blueScore;
  const blueWon = blueScore > redScore;

  let classes = "bg-gray-900";

  return (
    <div className={`flex rounded-md overflow-clip ${classes}`}>
      <div className={`flex flex-col justify-center p-3`}>
        <div className="uppercase font-bold text-gray-400 text-xs">
          {competitionLevel}
        </div>
        <div className="text-lg">{matchNumber}</div>
      </div>

      <div className="flex flex-col items-stretch ml-1">
        <div
          className={`px-3 bg-red-600 flex-1 flex items-center justify-center ${
            redWon ? "font-bold" : ""
          }`}
        >
          {redScore}
        </div>
        <div
          className={`px-3 bg-blue-600 flex-1 flex items-center justify-center ${
            blueWon ? "font-bold" : ""
          }`}
        >
          {blueScore}
        </div>
      </div>
    </div>
  );
}
