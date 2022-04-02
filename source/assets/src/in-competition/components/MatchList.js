import React from "react";
import Match from "./Match";

export default function MatchList({ matches }) {
  return (
    <div className="mt-7">
      <h3 className="uppercase font-bold text-gray-400 text-xs mb-3">
        Our Matches <i className="fas fa-arrow-right"></i>
      </h3>

      <div className="flex justify-start items-stretch space-x-3 overflow-auto">
        {matches
          .filter((m) => m.comp_level == "qm")
          .sort((a, b) => a.time - b.time)
          .map((match) => (
            <Match
              key={match.key}
              competitionLevel="Qualification"
              matchNumber={match.match_number}
              redScore={match.alliances.red.score}
              blueScore={match.alliances.blue.score}
              played={!!match.actual_time}
              scheduledTime={match.time}
            />
          ))}
      </div>
    </div>
  );
}
