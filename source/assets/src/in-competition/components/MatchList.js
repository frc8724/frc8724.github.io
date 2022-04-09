import React, { useMemo } from "react";
import { compLevelName } from "../util";
import Match from "./Match";
import _ from "lodash-es/collection";
import { DateTime } from "luxon";

function MatchListSection({ title, matches }) {
  return (
    <div>
      <h3 className="uppercase font-bold text-gray-400 text-xs mb-3">
        {title} <i className="fas fa-arrow-right"></i>
      </h3>

      <div className="flex justify-start items-stretch space-x-3">
        {matches.map((match) => (
          <Match
            key={match.key}
            competitionLevel={match.comp_level}
            matchNumber={match.match_number}
            setNumber={match.set_number}
            redScore={match.alliances.red.score}
            blueScore={match.alliances.blue.score}
            played={!!match.actual_time}
            scheduledTime={match.predicted_time || match.time}
          />
        ))}
      </div>
    </div>
  );
}

export default function MatchList({ matches }) {
  const [playedMatches, days] = useMemo(() => {
    if (matches === undefined) return undefined;

    const sortedMatches = matches.sort((a, b) => a.time - b.time);

    const upcomingMatches = _.reject(sortedMatches, "actual_time");

    // If the entire event has been played, just display all matches
    if (upcomingMatches.length == 0) return [sortedMatches, {}];

    const playedMatches = _.filter(sortedMatches, "actual_time");

    const now = DateTime.now();

    return [
      playedMatches.slice(-2),
      _.groupBy(upcomingMatches, (match) => {
        const matchTime = DateTime.fromSeconds(match.time);

        if (matchTime.hasSame(now, "day")) return "Upcoming";

        return matchTime.weekdayLong;
      }),
    ];
  }, [matches]);

  return (
    <div className="mt-7 flex space-x-3 overflow-auto">
      <MatchListSection title="Recently Played" matches={playedMatches} />
      {Object.entries(days).map(([day, matches]) => (
        <MatchListSection key={day} title={day} matches={matches} />
      ))}
    </div>
  );
}
