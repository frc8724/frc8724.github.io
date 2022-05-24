import React, { forwardRef, useMemo } from "react";
import { DateTime } from "luxon";
import { compLevelName } from "../util";

function Match(
  {
    competitionLevel,
    matchNumber,
    setNumber,
    redScore,
    blueScore,
    played,
    scheduledTime,
    ourAlliance,
  },
  ref
) {
  const redWon = useMemo(() => redScore > blueScore, [redScore, blueScore]);
  const blueWon = useMemo(() => blueScore > redScore, [redScore, blueScore]);

  return (
    <div
      className={`flex rounded-md bg-gray-900 border-t-2 ${
        ourAlliance == "red" ? "border-t-red-600" : "border-t-blue-500"
      }`}
      ref={ref}
    >
      <div className="flex flex-col justify-center p-3 min-w-[120px]">
        <div className="uppercase font-bold text-gray-400 text-xs whitespace-nowrap">
          {compLevelName(competitionLevel)}
        </div>
        <div className="text-lg flex items-center justify-between whitespace-nowrap">
          {competitionLevel === "qf" || competitionLevel === "sf"
            ? `${setNumber} - ${matchNumber}`
            : matchNumber}

          {played &&
            ourAlliance &&
            ((ourAlliance == "red" && redWon) ||
            (ourAlliance == "blue" && blueWon) ? (
              <div className="text-sm uppercase bg-red-700 text-red-200 px-2 rounded-sm ml-2">
                Win
              </div>
            ) : (
              <div className="text-sm uppercase bg-blue-700 text-blue-200 px-2 rounded-sm ml-2">
                Loss
              </div>
            ))}
        </div>
      </div>

      {played ? (
        <div className="flex flex-col items-stretch ml-1">
          <div
            className={`px-3 bg-red-600 flex-1 flex items-center justify-center rounded-tr-md ${
              redWon ? "font-bold" : ""
            }`}
          >
            {redScore}
          </div>
          <div
            className={`px-3 bg-blue-600 flex-1 flex items-center justify-center rounded-br-md ${
              blueWon ? "font-bold" : ""
            }`}
          >
            {blueScore}
          </div>
        </div>
      ) : (
        <div className="border-l border-l-gray-600 text-gray-400 flex items-center justify-center text-xs">
          <div
            className="rotate-90 whitespace-nowrap"
            title="Predicted match start time"
          >
            {DateTime.fromSeconds(scheduledTime).toLocaleString(
              DateTime.TIME_SIMPLE
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default forwardRef(Match);
