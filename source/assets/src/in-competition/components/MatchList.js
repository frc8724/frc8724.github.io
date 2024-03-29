import React, { useMemo } from "react";
import Match from "./Match";
import _ from "lodash-es/collection";
import isEmpty from "lodash-es/isEmpty";
import { DateTime } from "luxon";

function MatchListSection({ title, matches }) {
  return (
    <div>
      <h3 className="uppercase font-bold text-gray-400 text-xs mb-3">
        {title} <i className="fas fa-arrow-right"></i>
      </h3>

      <div className="flex justify-start items-stretch space-x-3">
        {matches.map((match) => {
          let ourAlliance = "";

          if (match.alliances.red.team_keys.includes("frc8724")) {
            ourAlliance = "red";
          } else if (match.alliances.blue.team_keys.includes("frc8724")) {
            ourAlliance = "blue";
          }

          return (
            <Match
              key={match.key}
              competitionLevel={match.comp_level}
              matchNumber={match.match_number}
              setNumber={match.set_number}
              redScore={match.alliances.red.score}
              blueScore={match.alliances.blue.score}
              played={!!match.actual_time}
              scheduledTime={match.predicted_time || match.time}
              ourAlliance={ourAlliance}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function MatchList({ matches }) {
  const [playedMatches, days] = useMemo(() => {
    if (matches === undefined) return undefined;

    const sortedMatches = matches
      .sort((a, b) => a.time - b.time)
      .filter(
        (match) =>
          match.alliances.red.team_keys.includes("frc8724") ||
          match.alliances.blue.team_keys.includes("frc8724")
      );

    const upcomingMatches = _.reject(sortedMatches, "actual_time");

    // If the entire event has been played, just display all matches
    if (upcomingMatches.length == 0) return [sortedMatches, {}];

    const playedMatches = _.filter(sortedMatches, "actual_time");

    const now = DateTime.now();

    return [
      playedMatches.slice(-2),
      _.groupBy(upcomingMatches, (match) => {
        const matchTime = DateTime.fromSeconds(match.time);

        if (matchTime.hasSame(now, "day")) return "Upcoming Matches";

        return matchTime.weekdayLong;
      }),
    ];
  }, [matches]);

  if (isEmpty(playedMatches) && isEmpty(days)) {
    return (
      <div className="text-center uppercase font-bold text-gray-400 text-xs py-5">
        No match information yet.
      </div>
    );
  }

  return (
    <div className="flex space-x-3 shrink-0">
      {playedMatches.length > 0 && (
        <MatchListSection title="Recently Played" matches={playedMatches} />
      )}

      {Object.entries(days).map(([day, matches]) => (
        <MatchListSection key={day} title={day} matches={matches} />
      ))}
    </div>
  );
}
