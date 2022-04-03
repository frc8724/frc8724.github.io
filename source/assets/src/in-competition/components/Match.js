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
  },
  ref
) {
  const redWon = useMemo(() => redScore > blueScore, [redScore, blueScore]);
  const blueWon = useMemo(() => blueScore > redScore, [redScore, blueScore]);

  return (
    <div className="flex rounded-md bg-gray-900" ref={ref}>
      <div className="flex flex-col justify-center p-3 min-w-[120px]">
        <div className="uppercase font-bold text-gray-400 text-xs whitespace-nowrap">
          {compLevelName(competitionLevel)}
        </div>
        <div className="text-lg">
          {competitionLevel === "qf" || competitionLevel === "sf"
            ? `${setNumber} - ${matchNumber}`
            : matchNumber}
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
        <div className="border-l border-l-gray-600 text-gray-400 px-5 flex items-center justify-center text-xs">
          <div
            className="[writing-mode:vertical-lr]"
            title="Scheduled match start time"
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
